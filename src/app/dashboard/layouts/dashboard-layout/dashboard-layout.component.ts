import { Component, OnInit, computed, inject } from '@angular/core';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  // private authService = inject( AuthService );
  private router = inject(Router)
  // public user = computed(() => this.authService.currentUser() );
  // onLogout() {
  //   this.authService.logout();
  // }

  private user!: User | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser();
  }

  get getUser() {
    return this.user;
  }

  onLogout() {
    // this.authService.logout();
    this.router.navigateByUrl('/auth')
  }

}
