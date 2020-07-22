import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  typeUsers = ['inscription normale', 'admin'];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onAdd(data: any) {
    console.log(data);
    this.userService.saveUser(this.userService.host + '/users', data)
      .subscribe(value => {
          alert('Utilisateur ajouté avec succès');
          this.router.navigateByUrl('/users');
        },
        error => {
          console.log(error);
        });
  }

}
