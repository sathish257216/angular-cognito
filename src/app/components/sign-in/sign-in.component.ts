import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  showPassword:boolean;

  constructor(private fb:FormBuilder, private cognitoService: CognitoService,
    private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['tn78carcare@gmail.com', [Validators.required, Validators.email]],
      password: ['Mithiran#123', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  // convenience getter for easy access to form fields
  get f() { return this.signInForm.controls; }


  onSignIn() {
    console.log('register ------ ', this.signInForm.value);
    const user = this.signInForm.value;
    this.cognitoService.signIn(user).then(data => {
      console.log(' Sign In ---- ', data);
      this.router.navigateByUrl('/home');
    }).catch(error => {
      alert(error);
    })
  }

}
