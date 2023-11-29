import { Component, computed, inject } from '@angular/core';
import { HomeCards } from './home.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private router = inject(Router)

  public testCards: HomeCards[] =  [
    { img:'assets/images/trafo_card.png', title:'Transformador', ruta: ['/trafo']},
    { img:'assets/images/puesto.png', title:'Puesto', ruta: ['/puesto'] },
    { img:'assets/images/Orden_OTT.png', title:'Orden', ruta: ['/ott'] },
    { img:'assets/images/grupo.png', title:'Grupos', ruta: ['/grupos/path'] },
    { img:'assets/images/cr.png', title:'Centro de Responsabilidad', ruta: ['/cr/alm'] },
    { img:'assets/images/Potn.png', title:'Potencia Nominal', ruta: ['/potn'] },
    { img:'assets/images/users.png', title:'Usuarios', ruta: ['/users'] },
  ]

  public isHome= computed<boolean> ( () => {
    // console.log(this.router.url === '/');
    return this.router.url === '/'
  })

}
