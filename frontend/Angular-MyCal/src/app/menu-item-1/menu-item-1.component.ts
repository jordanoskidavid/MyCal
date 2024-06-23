import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-item-1',
  templateUrl: './menu-item-1.component.html',
  styleUrl: './menu-item-1.component.css'
})
export class MenuItem1Component {
  inputValue: number = 0;
  onButtonClick(): void {
    console.log(this.inputValue);
  }//vadi vo konzola uste da se zacuvuva vo baza preku API
}
