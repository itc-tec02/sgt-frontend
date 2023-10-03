import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Administración Transformadores',
        items: [
          { label: 'Transformador', icon: 'pi pi-fw pi-home', routerLink: ['/']},
          { label: 'Puesto', icon: 'pi pi-fw pi-home' },
        ]
      },
      {
        label: 'Órdenes de Trabajo',
        items: [
          { label: 'Orden', icon: 'pi pi-fw pi-id-card' },
        ]
      },
      {
        label: 'Mantenimiento',
        items: [
          { label: 'Grupos', icon: 'pi pi-fw pi-eye' },
          { label: 'Centro de Responsabilidad', icon: 'pi pi-fw pi-eye' },
          { label: 'Potencia Nominal ', icon: 'pi pi-fw pi-eye' },
          { label: 'Actualizar Datos ', icon: 'pi pi-fw pi-eye' },
        ]
      },
      {
        label: 'Seguridad',
        items: [
          { label: 'Usuarios', icon: 'pi pi-fw pi-prime' },
          { label: 'Perfiles', icon: 'pi pi-fw pi-desktop' },
          { label: 'Cambiar Clavev', icon: 'pi pi-fw pi-desktop' },
        ]
      },
    ];
  }
}
