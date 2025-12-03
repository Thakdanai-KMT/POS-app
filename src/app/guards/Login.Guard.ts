import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
console.log('LoginGuard token = ', localStorage.getItem('token') || sessionStorage.getItem('token'));

    // ถ้ามี token ไม่ให้เข้า login
    if (token) {
      this.router.navigate(['/home']);
      return false;
    }

    return true; // ไม่มี token → เข้า login ได้
  }
}
