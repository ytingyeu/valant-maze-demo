import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICell, IMaze, INewMaze, mazeSymbols } from '../../_models/maze/maze';
import { MazeService } from '../../_services/maze.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggingService } from '../../logging/logging.service';

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
  @Output() insertCreatedMaze = new EventEmitter<IMaze>();

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
    // console.log(event);

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type === 'text/plain') {
        this.mazeFile = file;
      } else {
        this.uploadForm.reset();
        this.uploadForm.controls['inputFile'].setValidators([Validators.required]);
        this.uploadForm.get('inputFile').updateValueAndValidity();
      }
    }
  }

  async onSubmit() {
    this.isSubmitted = true;

    if (this.uploadForm.invalid) {
      return;
    }

    this.isLoadedEmitter(false);

    if (this.mazeFile !== null && this.mazeFile !== undefined) {
      const newMaze = await this.readMazeFileAsMazeObject(this.mazeFile);
      this.addNewMaze(newMaze);
    } else {
      this.uploadForm.reset();
      this.uploadForm.controls['inputFile'].setValidators([Validators.required]);
      this.uploadForm.get('inputFile').updateValueAndValidity();
    }
  }

  private addNewMaze(json: INewMaze): void {
    this.mazeService.postNewMaze(json).subscribe({
      next: (createdMaze: IMaze) => {
        this.insertCreatedMazeEmitter(createdMaze);
        this.isSubmitted = false;
        this.uploadForm.reset();
      },
      error: (error) => {
        this.logger.error('Error uploading new maze: ', error);
      },
    });
  }

  insertCreatedMazeEmitter(createdMaze: IMaze) {
    this.insertCreatedMaze.emit(createdMaze);
  }

  isLoadedEmitter(newIsLoaded: boolean) {
    this.updateIsLoaded.emit(newIsLoaded);
  }

  readMazeFileAsMazeObject(file: Blob): Promise<INewMaze> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt) => {
        try {
          const textFromFileLoaded = evt.target.result.toString();
          const cleanstring = this.cleanGraphString(textFromFileLoaded);
          const [start, exit] = this.getStartAndExit(cleanstring);

          if (start === undefined || exit === undefined) {
            const errorMsg = 'Error adding new maze: could not find start or exit point.';
            this.logger.error(errorMsg);
            return;
          }

          let maze: INewMaze = {
            graphString: cleanstring,
            start: start,
            exit: exit,
          };

          resolve(maze as INewMaze);
        } catch (err) {
          this.logger.error('Error reading new maze file: ', err);
        }
      });
      reader.readAsText(file, 'UTF-8');
    });
  }

  private getStartAndExit(graphString: string): [ICell, ICell] {
    let start: ICell;
    let exit: ICell;

    graphString.split('#').forEach((row: string, rowIdx: number) => {
      row.split('').forEach((symbol: string, colIdx: number) => {
        if (symbol == mazeSymbols.start) {
          start = {
            row: rowIdx,
            col: colIdx,
          };
        }

        if (symbol == mazeSymbols.exit) {
          exit = {
            row: rowIdx,
            col: colIdx,
          };
        }

        if (start !== undefined && exit !== undefined) {
          return;
        }
      });
    });

    return [start, exit];
  }

  private cleanGraphString(input: string): string {
    let cleanstring = input.replace(/(\r\n|\n|\r)/gm, '#');

    // add an end-of-row symbol if the last line is not breaked in the original text
    if (cleanstring.charAt(cleanstring.length - 1) !== '#') {
      cleanstring += '#';
    }

    return cleanstring;
  }
}
