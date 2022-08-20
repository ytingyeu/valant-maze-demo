import { Component, OnInit } from '@angular/core';
import { IMaze } from '../_models/maze/maze';
import { MazeService } from '../_services/maze.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { callbackify } from 'util';

@Component({
  selector: 'valant-available-mazes',
  templateUrl: './available-mazes.component.html',
  styleUrls: ['./available-mazes.component.less'],
})
export class AvailableMazesComponent implements OnInit {
  listOfMazes: IMaze[] = [];
  isLoaded: boolean = false;
  uploadForm: FormGroup;
  jsonFile: string;

  constructor(private mazeService: MazeService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      mazeJson: [''],
    });

    this.mazeService.getListOfMazes().subscribe((mazes) => {
      this.listOfMazes = mazes;
      this.isLoaded = true;
    });
  }

  onFileSelect(event: { target: { files: string | any[] } }) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('mazeJson').setValue(file);
      this.jsonFile = file;
    }
  }

  onSubmit() {
    this.isLoaded = false;
    const file = this.uploadForm.get('mazeJson').value;

    const fileReader = new FileReader();

    fileReader.onload = (fileLoadedEvent) => {
      const textFromFileLoaded = fileLoadedEvent.target.result;
      const json = JSON.parse(textFromFileLoaded.toString());

      this.mazeService.postMaze(json).subscribe((mazes) => {
        this.listOfMazes = mazes;
        this.isLoaded = true;
      });
    };

    fileReader.readAsText(file, 'UTF-8');
  }
}
