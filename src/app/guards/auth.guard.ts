import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const isLoggedIn = localStorage.getItem('token'); // สมมติว่าคุณเก็บ tokenไว้

    if (isLoggedIn) {
      return true; // อนุญาตให้เข้า
    }

    // ถ้าไม่ login ให้กลับไปหน้า login
    this.router.navigate(['/login']);
    return false;
  }
}
