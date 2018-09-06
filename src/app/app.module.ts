import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from "@angular/common/http";
import { FileDropModule } from 'ngx-file-drop';
import { ResumeService } from './services/resume.service';
import { RouterModule } from '../../node_modules/@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FileDropModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    ResumeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
