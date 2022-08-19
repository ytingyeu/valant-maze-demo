import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableMazesComponent } from './available-mazes/available-mazes.component';
import { PlayMazeComponent } from './play-maze/play-maze.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'available-mazes', component: AvailableMazesComponent },
  { path: 'play-maze/:id', component: PlayMazeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
