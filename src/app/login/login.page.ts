import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  fields: any;
  formGroup: FormGroup;

  constructor(
    private loginService: LoginService
  ) { 

    
  }

  ngOnInit() {
    this.formGroup = new FormGroup({});

    this.fields = {
      username: {formgroup: new FormControl('', [Validators.required]), placeholder: 'username'},
      password: {formgroup: new FormControl('', [Validators.required]), placeholder: 'password'},
    }

    Object.keys(this.fields).forEach(element => {
      this.formGroup.addControl(element, this.fields[element].formgroup);
    });
  }

  login(user){
    this.loginService.login(user);
  }

}
