import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';


@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router )


  public myForm: FormGroup = this.fb.group({
    usuario:    ['EEA', [ Validators.required ]],
    password: ['EEA', [ Validators.required ]],
  });


  login() {
    const { usuario, password } = this.myForm.value;

    this.authService.login(usuario, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          console.log({message});
          Swal.fire('Error', message, 'info' )
        }
      })

  }

}
