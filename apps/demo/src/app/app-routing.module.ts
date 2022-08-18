import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableMazesComponent } from './available-mazes/available-mazes.component';

const routes: Routes = [
  { path: 'available-mazes', component: AvailableMazesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }