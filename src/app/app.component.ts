import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ONG Digit Dashboard';
  status: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.status = true;
    this.authService.changeIsAuth(localStorage.getItem('email'));
    console.log('app ' + this.authService.isAuth);
    this.status = !!localStorage.getItem('email');
  }

}
