import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
    Amplify.configure({
      Auth: environment.cognito
    })
  }

  signUp(user:User):Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        given_name: user.givenName,
        family_name: user.familyName
      }
    })
  }

  confirmSignUp(user: User):Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  signIn(user: any):Promise<any> {
    return Auth.signIn(user.email, user.password);
  }
}
