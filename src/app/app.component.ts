import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './layout/service/app.layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: string = 'Gestión de Transformadores'

  constructor(private primengConfig: PrimeNGConfig, private layoutService: LayoutService) { }

  private authService = inject( AuthService );
  private router = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {
    // console.log(this.authService.authStatus() )
    if ( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect(() => {

    switch( this.authService.authStatus() ) {

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        const currentUrl = localStorage.getItem('url')
        if(!currentUrl) {
          this.router.navigateByUrl('/')
        }else{
          this.router.navigateByUrl(currentUrl);
        }
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

    }

  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;       //enables core ripple functionality

    //optional configuration with the default configuration
    this.layoutService.config = {
        ripple: false,                      //toggles ripple on and off
        inputStyle: 'outlined',             //default style for input elements
        menuMode: 'static',                 //layout mode of the menu, valid values are "static" and "overlay"
        colorScheme: 'light',               //color scheme of the template, valid values are "light" and "dark"
        theme: 'lara-light-indigo',         //default component theme for PrimeNG
        scale: 14                           //size of the body font size to scale the whole application
    };
}


}
