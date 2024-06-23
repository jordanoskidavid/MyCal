import {Component} from '@angular/core';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent {
  inputValue: number = 0;
  onButtonClick(): void {
    console.log(this.inputValue);
  }//vadi vo konzola uste da se zacuvuva vo baza preku API
}
