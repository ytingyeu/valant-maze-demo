import { Component, OnInit } from '@angular/core';
import { IMaze, INewMaze } from '../_models/maze/maze';
import { MazeService } from '../_services/maze.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggingService } from '../logging/logging.service';
import { Utils } from '../_Utils/utils';

@Component({
  selector: 'valant-available-mazes',
  templateUrl: './available-mazes.component.html',
  styleUrls: ['./available-mazes.component.less'],
})
export class AvailableMazesComponent implements OnInit {
  listOfMazes: IMaze[] = [];
  isLoaded: boolean = false;
  uploadForm: FormGroup;
  jsonFile: Blob;
  isSubmitted: boolean = false;

  constructor(private logger: LoggingService, private mazeService: MazeService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      inputFile: ['', Validators.required],
    });

    this.getMazes();
  }

  get fc() {
    return this.uploadForm.controls;
  }

  onFileSelect(event: { target: { files: string | any[] } }) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type === 'text/plain') {
        this.jsonFile = file;
      } else {
        this.uploadForm.reset();
        this.uploadForm.controls['inputFile'].setValidators([Validators.required]);
        this.uploadForm.get('inputFile').updateValueAndValidity();
      }

      this.jsonFile = file;
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.uploadForm.invalid) {
      return;
    }

    this.isLoaded = false;

    if (this.jsonFile !== null && this.jsonFile !== undefined) {
      const fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent) => {
        const textFromFileLoaded = fileLoadedEvent.target.result.toString();
        const cleanstring = this.cleanGraphString(textFromFileLoaded);
        const [start, exit] = Utils.getStartAndExit(cleanstring);

        if (start === undefined || exit === undefined) {
          const errorMsg = 'Error adding new maze: could not find start or exit point.';
          this.logger.error(errorMsg);
          console.error(errorMsg);
          return;
        }

        let json = {
          graphString: cleanstring,
          start: start,
          exit: exit,
        };

        this.postNewMazes(json);
      };
      fileReader.readAsText(this.jsonFile, 'UTF-8');
    } else {
      this.uploadForm.reset();
      this.uploadForm.controls['inputFile'].setValidators([Validators.required]);
      this.uploadForm.get('inputFile').updateValueAndValidity();
    }
  }

  private getMazes(): void {
    this.mazeService.getListOfMazes().subscribe({
      next: (mazes: IMaze[]) => {
        this.listOfMazes = mazes;
        this.isLoaded = true;
      },
      error: (error) => {
        this.logger.error('Error getting mazes: ', error);
        console.error(error);
      },
    });
  }

  private postNewMazes(json: INewMaze): void {
    this.mazeService.postNewMaze(json).subscribe({
      next: (mazes: IMaze[]) => {
        this.listOfMazes = mazes;
        this.isLoaded = true;
      },
      error: (error) => {
        this.logger.error('Error uploading new maze: ', error);
        console.error(error);
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
}
