import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CrsComponent } from './pages/crs/crs.component';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AddeditCrComponent } from './pages/addedit-cr/addedit-cr.component';

@NgModule({
    declarations: [
        CrsComponent,
        AddeditCrComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        DialogModule,
        DropdownModule,
        FileUploadModule,
        FormsModule,
        InputNumberModule,
        InputTextareaModule,
        InputTextModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        CascadeSelectModule,
    ]
  })
  export class CrModule { }