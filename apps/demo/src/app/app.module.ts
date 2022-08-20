import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoggingService } from './logging/logging.service';
import { StuffService } from './stuff/stuff.service';
import { environment } from '../environments/environment';
import { ValantDemoApiClient } from './api-client/api-client';
import { AvailableMazesComponent } from './available-mazes/available-mazes.component';
import { AppRoutingModule } from './app-routing.module';
import { CharToMazePipe } from './_pipes/char-to-maze.pipe';
import { PlayMazeComponent } from './play-maze/play-maze.component';
import { DisplayMazeComponent } from './display-maze/display-maze.component';
import { GamepadComponent } from './play-maze/gamepad/gamepad.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NowLoadingComponent } from './now-loading/now-loading.component';

export function getBaseUrl(): string {
  return environment.baseUrl;
}

@NgModule({
  declarations: [
    AppComponent,
    AvailableMazesComponent,
    CharToMazePipe,
    PlayMazeComponent,
    DisplayMazeComponent,
    GamepadComponent,
    NavbarComponent,
    HomeComponent,
    NowLoadingComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    LoggingService,
    StuffService,
    ValantDemoApiClient.Client,
    { provide: ValantDemoApiClient.API_BASE_URL, useFactory: getBaseUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
