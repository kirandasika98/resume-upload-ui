import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatCheckboxModule,
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatCheckboxModule,
    ]
})

export class MaterialModule {}