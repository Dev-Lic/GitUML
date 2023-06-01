import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
@Input() control = new FormControl();

constructor(private _auth:UserService, private formBuilder: FormBuilder
  ) {  }




formGroup = new FormGroup({
  email: new FormControl('',[Validators.required,Validators.email]) ,
  password: new FormControl('',[Validators.required])

})


errorMessages: Record<string, string> ={
  email: 'The email is invalid',
  required:'The field is required' ,
 
}


  ngOnInit() {
    
    ;}

  loginUser(){
    const data = {
    
      email: this.formGroup.controls.email.value,
      password:this.formGroup.controls.password.value
      
    };
    console.log(data)  
    this._auth.postLogin(data);
   
  }
  }
