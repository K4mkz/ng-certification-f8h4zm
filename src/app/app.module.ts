import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ForecastDetailComponent } from './components/forecast-detail/forecast-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  declarations: [AppComponent, HomeComponent, ForecastDetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
