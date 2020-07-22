import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/user.model";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  currentUser: UserModel;
  url: string;
  typeUsers = ['inscription normale', 'admin'];

  constructor(private router: Router, private activedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {

    this.url = atob(this.activedRoute.snapshot.params.id);
    this.userService.getUser(this.url)
      .subscribe(value => {
          this.currentUser = value;
        },
        error => {
          console.log(error);
        });
  }

  onEdit(value: any) {
    this.userService.updateUser(this.url, value)
      .subscribe(data => {
          alert('Mise à jour effectuée avec succès');
          this.router.navigateByUrl('/users');
        },
        error => {
          console.log(error);
        });
  }

}
