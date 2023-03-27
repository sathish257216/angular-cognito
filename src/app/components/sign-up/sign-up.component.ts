import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isConfirm: boolean;
  registerForm: FormGroup;
  submitted = false;
  showPassword = false;

  constructor(private fb:FormBuilder, private cognitoService: CognitoService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      givenName: ['Priyanka', Validators.required],
      familyName: ['Ramasamy', Validators.required],
      email: ['tn78carcare@gmail.com', [Validators.required, Validators.email]],
      password: ['Mithiran#123', [Validators.required, Validators.minLength(6)]],
      code: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  onRegister() {
    console.log('register ------ ', this.registerForm.value);
    const user = this.registerForm.value;
    this.cognitoService.signUp(user).then(() => {
      this.isConfirm = true;
    }).catch(error => {
      alert(error);
    })
  }
  
  onReset() {
    
  }
  
  onVerify() {
    const user = this.registerForm.value;
    this.cognitoService.confirmSignUp(user).then(() => {
      this.isConfirm = true;
    }).catch(error => {
      alert(error);
    });
  }
  

}
