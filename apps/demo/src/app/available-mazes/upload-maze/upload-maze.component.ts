import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMaze, INewMaze } from '../../_models/maze/maze';
import { MazeService } from '../../_services/maze.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggingService } from '../../logging/logging.service';
import { Utils } from '../../_Utils/utils';

@Component({
  selector: 'valant-upload-maze',
  templateUrl: './upload-maze.component.html',
  styleUrls: ['./upload-maze.component.less'],
})
export class UploadMazeComponent implements OnInit {
  uploadForm: FormGroup;
  mazeFile: Blob;
  isSubmitted: boolean = false;

  @Output() updateIsLoaded = new EventEmitter<boolean>();
  @Output() updateListOfMazes = new EventEmitter<IMaze[]>();

  constructor(private logger: LoggingService, private mazeService: MazeService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      inputFile: ['', Validators.required],
    });
  }

  get fc() {
    return this.uploadForm.controls;
  }

  onFileSelect(event: { target: { files: string | any[] } }) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type === 'text/plain') {
        this.mazeFile = file;
      } else {
        this.uploadForm.reset();
        this.uploadForm.controls['inputFile'].setValidators([Validators.required]);
        this.uploadForm.get('inputFile').updateValueAndValidity();
      }

      this.mazeFile = file;
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.uploadForm.invalid) {
      return;
    }

    this.isLoadedEmitter(false);

    if (this.mazeFile !== null && this.mazeFile !== undefined) {
      const fileReader = new FileReader();

      fileReader.onload = (fileLoadedEvent) => {
        try {
          const textFromFileLoaded = fileLoadedEvent.target.result.toString();
          const cleanstring = this.cleanGraphString(textFromFileLoaded);
          const [start, exit] = Utils.getStartAndExit(cleanstring);

          if (start === undefined || exit === undefined) {
            const errorMsg = 'Error adding new maze: could not find start or exit point.';
            this.logger.error(errorMsg);
            return;
          }

          let json = {
            graphString: cleanstring,
            start: start,
            exit: exit,
          };

          this.postNewMazes(json);
        } catch (err) {
          this.logger.error('Error reading new maze file: ', err);
        }
      };

      fileReader.readAsText(this.mazeFile, 'UTF-8');
    } else {
      this.uploadForm.reset();
      this.uploadForm.controls['inputFile'].setValidators([Validators.required]);
      this.uploadForm.get('inputFile').updateValueAndValidity();
    }
  }

  private postNewMazes(json: INewMaze): void {
    this.mazeService.postNewMaze(json).subscribe({
      next: (mazes: IMaze[]) => {
        this.mazeListEmitter(mazes);
        this.isSubmitted = false;
        this.uploadForm.reset();
      },
      error: (error) => {
        this.logger.error('Error uploading new maze: ', error);
      },
    });
  }

  private cleanGraphString(input: string): string {
    let cleanstring = input.replace(/(\r\n|\n|\r)/gm, '#');

    // add an end-of-row symbol if the last line is not breaked in the original text
    if (cleanstring.charAt(cleanstring.length - 1) !== '#') {
      cleanstring += '#';
    }

    return cleanstring;
  }

  mazeListEmitter(newMazes: IMaze[]) {
    this.updateListOfMazes.emit(newMazes);
  }

  isLoadedEmitter(newIsLoaded: boolean) {
    this.updateIsLoaded.emit(newIsLoaded);
  }
}
