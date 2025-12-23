import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://backend-oczg.onrender.com/api/auth/login';
  // private apiUrl = 'http://localhost:10000/api/auth/login';

  constructor(private http: HttpClient) {}

  login(loginId: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { loginId, password });
  }
}
