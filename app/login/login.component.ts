import { Router } from '@angular/router';
import { User } from "../models/user";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  isLoggingIn = true;

  constructor(private router: Router, private page: Page) {
    this.user = new User();
    this.user.email = "jose@brein.pe";
    this.user.password = "password";
   }

  ngOnInit() { 
    this.page.actionBarHidden = true;
    this.page.backgroundColor = "#0079C2";
  }

  submit() {
    this.router.navigate(["/list"]);
  }

}
