import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';

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

@NgModule({
  declarations: [
    ListUsuariosComponent
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
    UsuariosRoutingModule,

  ]
})
export class UsuariosModule { }