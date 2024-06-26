import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-menu-item-1',
  templateUrl: './menu-item-1.component.html',
  styleUrl: './menu-item-1.component.css'
})
export class MenuItem1Component {
  inputValue: number;

  constructor(private http: HttpClient) {
    this.inputValue = 0; // Initialize the input value
  }

  async onButtonClick() {
    const caloriesPer100g = 312;
    const totalCalories = (this.inputValue / 100) * caloriesPer100g;

    const data = {
      grams: this.inputValue,
      totalCalories: totalCalories
    };

    try {
      const response = await firstValueFrom(this.http.post('http://localhost:3000/api/saveCalories', data));
      console.log('Calories saved', response);
    } catch (error) {
      console.error('Error saving calories', error);
    }
  }

  ngOnInit(): void {
  }
}
