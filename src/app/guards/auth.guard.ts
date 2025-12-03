import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // ตรวจสอบทั้ง localStorage และ sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token) {
      return true; // อนุญาตให้เข้า
    }
  console.log('AuthGuard token = ', localStorage.getItem('token') || sessionStorage.getItem('token'));

    // ถ้าไม่มี token ให้กลับไปหน้า login
    this.router.navigate(['/login']);
    return false;
  }
}
