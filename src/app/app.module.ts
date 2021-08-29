import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ForecastDetailComponent } from './components/forecast-detail/forecast-detail.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [AppComponent, HomeComponent, ForecastDetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
