import { Component, OnInit } from '@angular/core';
import { IMaze } from '../_models/maze/maze';
import { MazeService } from '../_services/maze.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoggingService } from '../logging/logging.service';

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

      if (file.type === 'application/json') {
        this.jsonFile = file;
      } else {
        this.uploadForm.reset();
        this.uploadForm.controls['inputFile'].setValidators([Validators.required]);
        this.uploadForm.get('inputFile').updateValueAndValidity();
      }
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
        const textFromFileLoaded = fileLoadedEvent.target.result;
        const json = JSON.parse(textFromFileLoaded.toString());
        this.postMazes(json);
        this.isSubmitted = false;
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
      },
    });
  }

  private postMazes(json: string): void {
    this.mazeService.postMaze(json).subscribe({
      next: (mazes: IMaze[]) => {
        this.listOfMazes = mazes;
        this.isLoaded = true;
      },
      error: (error) => {
        this.logger.error('Error uploading new maze: ', error);
      },
    });
  }
}
