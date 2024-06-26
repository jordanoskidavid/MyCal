import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent implements OnInit{
  inputValue: number;

  constructor(private http: HttpClient) {
    this.inputValue = 0; // Initialize the input value
  }

  async onButtonClick() {
    const caloriesPer100g = 247;
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
