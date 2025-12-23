import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.component.service';

@Component({
  selector: 'app-login',
    standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  showPassword = false;
  isSubmitting = false;
  successState = false;
  returnUrl = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });

    document.body.classList.add('login-bg');

    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    this.animateInputs();
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login-bg');
  }

  // ===== FORM =====
  get f() {
    return this.loginForm.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submitForm(): void {
    if (this.isSubmitting) return;

    if (this.loginForm.invalid) {
      this.shakeForm();
      this.markTouched();
      return;
    }

    this.isSubmitting = true;

    const { loginId, password, remember } = this.loginForm.value;

    this.loginService.login(loginId, password).subscribe({
      next: (res) => {
        const token = res.access_token;
console.log('Sending login request:', { loginId, password });
        if (remember) {
          localStorage.setItem('authToken', token);
        } else {
          sessionStorage.setItem('authToken', token);
        }

        this.successState = true;
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 800);
      },

      error: (err) => {
        this.isSubmitting = false;
        this.shakeForm();
        alert(err.error?.message || 'Login failed');
      },
    });
  }

  // ===== UI EFFECT =====
  private markTouched() {
    Object.values(this.loginForm.controls).forEach((c) =>
      c.markAsTouched()
    );
  }

  animateInputs(): void {
    setTimeout(() => {
      document.querySelectorAll('.input-wrapper').forEach((el, i) => {
        setTimeout(() => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
        }, i * 120);
      });
    }, 50);
  }

  shakeForm(): void {
    const card = document.querySelector('.login-card') as HTMLElement;
    if (!card) return;

    card.style.animation = 'shake 0.4s';
    setTimeout(() => (card.style.animation = ''), 400);
  }
}

