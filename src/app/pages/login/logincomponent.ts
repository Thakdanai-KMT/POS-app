import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.scss',
})
export class Logincomponent {
get email() {
  return this.loginForm.get('email');
}

get password() {
  return this.loginForm.get('password');
}

  loginForm!: FormGroup;
  showPassword = false;
  isSubmitting = false;
  successState = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });

    this.animateInputs();
  }

  // ======================= UI ANIMATIONS =======================

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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  animateCheckbox() {
    const box = document.querySelector('.checkmark') as HTMLElement;
    if (box) {
      box.style.transform = 'scale(0.8)';
      setTimeout(() => (box.style.transform = 'scale(1)'), 150);
    }
  }

  // ======================= SOCIAL LOGIN =======================

  socialLogin(provider: string) {
    alert(`Connecting to ${provider}...`);
  }

  // ======================= FORM LOGIC ========================

  submitForm() {
    if (this.isSubmitting) return;

    if (this.loginForm.invalid) {
      this.shakeForm();
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      this.successState = true;
      this.isSubmitting = false;

      setTimeout(() => {
        // redirect or next steps
        console.log('Redirecting...');
      }, 2500);

    }, 1500);
  }

  shakeForm() {
    const card: any = document.querySelector('.login-card');
    card.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => card.style.animation = '', 500);
  }

  // ======================== Helpers ========================

  get f() {
    return this.loginForm.controls;
  }
}