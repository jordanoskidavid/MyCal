import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-item-2',
  templateUrl: './menu-item-2.component.html',
  styleUrl: './menu-item-2.component.css'
})
export class MenuItem2Component {
  inputValue: number = 0;
  onButtonClick(): void {
    console.log(this.inputValue);
  }//vadi vo konzola uste da se zacuvuva vo baza preku API
}
