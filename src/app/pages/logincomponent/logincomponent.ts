import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-logincomponent',
  standalone: false,
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.scss',
})

export class Logincomponent {
  loginForm!: FormGroup;
  showPassword = false;
  isSubmitting = false;
  successState = false;
  apiUrl = 'http://localhost:3000/api/auth/login'; // <-- Node.js API URL
constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required]], // สามารถใส่ email/username/phone
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });

    this.animateInputs();
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

    const body = {
      loginId: this.loginForm.value.loginId,
      password: this.loginForm.value.password
    };

    this.http.post<any>(`${this.apiUrl}/login`, body).subscribe({
      next: (res) => {
        console.log('Login success:', res);

        // เก็บ Token
        if (this.loginForm.value.remember) {
          localStorage.setItem('refresh_token', res.refresh_token);
        } else {
          sessionStorage.setItem('refresh_token', res.refresh_token);
        }
        localStorage.setItem('access_token', res.access_token);

        // แสดง UI success
        this.successState = true;
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/dashboard']); // redirect
        }, 1500);
      },
      error: (err) => {
        console.error('Login error', err);
        alert(err.error?.error || 'Login failed');
        this.isSubmitting = false;
        this.shakeForm();
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}