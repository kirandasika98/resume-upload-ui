import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatCheckboxModule, MatGridListModule, MatSidenavModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatGridListModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatGridListModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
    ]
})

export class MaterialModule {}