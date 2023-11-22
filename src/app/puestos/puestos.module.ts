import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListPuestoComponent } from '../puestos/pages/list-puesto/list-puesto.component';

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
import { AddeditpuestoComponent } from './pages/addeditpuesto/addeditpuesto.component';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [
        ListPuestoComponent,
        AddeditpuestoComponent,
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
        CardModule,
        CalendarModule,
    ]
  })
  export class PuestosModule { }