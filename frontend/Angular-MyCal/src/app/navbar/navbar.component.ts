import {Component, OnInit} from '@angular/core';
import {LowerCasePipe} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  public userName: string | undefined;
  constructor() {
  }
  ngOnInit(): void {
    this.userName = 'username'
  } //this will be used to read from the database about logged user

}
