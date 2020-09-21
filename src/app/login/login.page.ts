import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginObj: object = {
    email:'',
    pass: ''
  };

  constructor() {
  }

  ngOnInit() {
  }

  logForm(){
    console.log(this.loginObj);
  }

}
