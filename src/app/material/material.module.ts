import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatCheckboxModule, MatGridListModule, MatSidenavModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatGridListModule,
        MatSidenavModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatGridListModule,
        MatSidenavModule
    ]
})

export class MaterialModule {}