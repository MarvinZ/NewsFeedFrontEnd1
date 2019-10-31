import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatExpansionModule, MatButtonModule, MatFormFieldModule } from '@angular/material';

import { FeedService } from './services/feed.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { ThumbnailPipe } from './pipes/thumbnail.pipe';
import { FilterPipe } from './pipes/simpleFilter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ThumbnailPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule, MatFormFieldModule,
    FormsModule
  ],
  providers: [
    FeedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
