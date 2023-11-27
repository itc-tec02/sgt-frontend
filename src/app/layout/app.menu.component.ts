import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: MenuItem[] = [];
  // model: any[] = [];

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Administración Transformadores',
        items: [
          { label: 'Transformador', icon: 'pi pi-fw pi-wrench', routerLink: ['/trafo']},
          { label: 'Puesto', icon: 'pi pi-fw pi-building', routerLink: ['/puesto'] },
        ]
      },
      {
        label: 'Órdenes de Trabajo',
        items: [
          { label: 'Orden', icon: 'pi pi-fw pi-book', routerLink: ['/ott'] },
        ]
      },
      {
        label: 'Mantenimiento',
        items: [
          { label: 'Grupos', icon: 'pi pi-fw pi-server', routerLink: ['/grupos/path']},
          { label: 'Centro de Responsabilidad', icon: 'pi pi-fw pi-sitemap', routerLink: ['/cr/alm']},
          { label: 'Potencia Nominal ', icon: 'pi pi-fw pi-bolt', routerLink: ['/potn'] },
        ]
      },
      {
        label: 'Seguridad',
        items: [
          { label: 'Usuarios', icon: 'pi pi-fw pi-list', routerLink: ['/users'] }
          //{ label: 'Perfiles', icon: 'pi pi-fw pi-users', routerLink: ['/prfl'] },
          //{ label: 'Cambiar Clave', icon: 'pi pi-fw pi-user-edit', routerLink: ['/user/pass'] },
        ]
      },
    ];
  }
}
