import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './logincomponent.service';

@Component({
  selector: 'app-logincomponent',
  standalone: false,
  templateUrl: './logincomponent.html',
  styleUrls: ['./logincomponent.scss'], // แก้จาก styleUrl เป็น styleUrls
})
export class Logincomponent implements OnInit {
  // เพิ่ม implements OnInit
  loginForm!: FormGroup;
  showPassword = false;
  isSubmitting = false;
  successState = false;
  apiUrl = 'http://localhost:3000/api/auth/login'; // Node.js API URL

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required]], // สามารถใส่ email/username/phone
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
    document.body.classList.add('login-bg');

    this.animateInputs();
  }

  ngOnDestroy() {
    document.body.classList.remove('login-bg');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  animateInputs() {
    setTimeout(() => {
      const items = document.querySelectorAll('.input-wrapper');
      items.forEach((el: any, index: number) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 150 * index);
      });
    }, 50);
  }

  animateCheckbox() {
    const box = document.querySelector('.checkmark') as HTMLElement;
    if (box) {
      box.style.transform = 'scale(0.8)';
      setTimeout(() => (box.style.transform = 'scale(1)'), 150);
    }
  }

  shakeForm() {
    const card: any = document.querySelector('.login-card');
    card.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => (card.style.animation = ''), 500);
  }

  // ======================= FORM LOGIC ========================
  submitForm() {
    if (this.isSubmitting) return;
    if (this.loginForm.invalid) {
      this.shakeForm();
      return;
    }

    this.isSubmitting = true;

    const { loginId, password, remember } = this.loginForm.value;

    this.loginService.login(loginId, password).subscribe({
      next: (res) => {
        console.log('Login success:', res);

        // เก็บ Token
        const token = res.access_token; // ใช้ access_token ที่ได้จาก API
        if (remember) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }

        this.successState = true;
        this.isSubmitting = false;

        // Navigate ไปหน้า home ทันที
        this.router.navigate(['/home']);
      },

      error: (err) => {
        console.error('Login error', err);
        alert(err.error?.message || 'Login failed');
        this.isSubmitting = false;
        this.shakeForm();
      },
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
