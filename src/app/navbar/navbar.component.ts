import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  status: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSignOut() {
    this.status = false;
    this.authService.signOut();
  }
}
