import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getFoodItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/foodItems`);
  }

  createUserInput(foodItemId: string, grams: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/userInputs`, { foodItemId, grams });
  }
}
