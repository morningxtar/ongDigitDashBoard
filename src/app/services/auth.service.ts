import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MachineModel} from '../models/machine.model';
import {UserModel} from '../models/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;

  host = 'http://105.235.30.236:888';

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getAdmin(email, password, userType): Observable<Array<UserModel>> {
    console.log(this.host + '/users/search/byUserConnexionAdmin?email=' + email + '&password=' + password + '&userType=' + userType);
    return this.httpClient.get<Array<UserModel>>(
      this.host + '/users/search/byUserConnexionAdmin?email=' + email + '&password=' + password + '&userType=' + userType);
  }

  changeIsAuth(email){
    console.log(this.host + '/users/search/byUser?email=' + email);
    this.httpClient.get<Array<UserModel>>(
      this.host + '/users/search/byUser?email=' + email).subscribe(
        value => {
          // @ts-ignore
          if (value._embedded.users.length > 0 && value._embedded.users[0].userType === 'admin'){
            console.log(value);
            this.isAuth = true;
            this.router.navigate(['']);
          }
        },
      error => {
        console.log(error);
      }
    );
  }

  signOut(){
    this.isAuth = false;
    localStorage.removeItem('email');
    this.router.navigate(['authentification']);
  }

}
