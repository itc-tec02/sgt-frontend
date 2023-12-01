import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { HomeModule } from './home/home.module';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TreeSelectModule } from 'primeng/treeselect';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { TrafosModule } from '../trafos/trafos.module'
import { OttsModule } from '../otts/otts.module';
import { PuestosModule } from '../puestos/puestos.module';
import { PotenciasModule } from '../potencias/potencias.module';
import { CrModule } from '../crs/crs.module';
import { GrupoModule } from '../grupos/grupos.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

import { AddOrEditPotenciasComponent } from '../potencias/pages/add-or-edit-potencias/add-or-edit-potencias.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';

import { ConfirmationService } from 'primeng/api';



@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        MenuModule,
        TieredMenuModule,
        CascadeSelectModule,
        TreeSelectModule,
        SplitButtonModule,
        SpeedDialModule,
        DialogModule,
        ConfirmDialogModule,
        ConfirmPopupModule,

        //*Modulos Personalizados
        HomeModule,
        TrafosModule,
        OttsModule,
        PuestosModule,
        PotenciasModule,
        CrModule,
        GrupoModule,
        UsuariosModule,
    ],
    providers: [ConfirmationService],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
