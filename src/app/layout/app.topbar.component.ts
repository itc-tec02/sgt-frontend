import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../auth/services/auth.service';
import { ConfirmationService } from 'primeng/api';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  // private authService = inject( AuthService );
  // private confirmationService = inject( ConfirmationService );

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private confirmationService: ConfirmationService
  ) { }

  showLogoutConfirmation() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas cerrar sesión?',
      acceptLabel: 'Sí',
      rejectLabel: 'No',

      acceptButtonStyleClass: 'p-button-danger', // Cambia el estilo del botón "Sí"
      rejectButtonStyleClass: 'p-button-success', // Cambia el estilo del botón "Sí"
      accept: () => {
        console.log('Accept callback triggered'); // Add this line
        this.logout();
      }
    });
  }

  logout() {
    this.authService.logout()
  }

  // Añade estos métodos
  confirmLogout() {
    // Este método puede ser vacío, ya que la lógica de confirmación está en el método 'logout'
  }

  hideLogoutConfirmation() {
  // Este método puede ser vacío, ya que el componente de confirmación de PrimeNG manejará el cierre del modal
  }
}
