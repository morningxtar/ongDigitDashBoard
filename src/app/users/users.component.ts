import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {UserModel} from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<UserModel>;
  currentPage = 0;
  totalPages: number;
  pages: Array<number>;
  currentKeyword: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.onGetUsers();
  }

  // tslint:disable-next-line:typedef
  onGetUsers() {
    this.userService.getUsersPage(this.currentPage, 10)
      .subscribe(value => {
        //console.log(value);
        // @ts-ignore
        this.totalPages = value.page.totalPages;
        this.pages = new Array<number>(this.totalPages);
        // @ts-ignore
        this.users = value._embedded.users;
      }, error => {
        console.log(error);
      });
  }

  onEdit(user: UserModel) {
// @ts-ignore
    const url = user._links.self.href;
    this.router.navigateByUrl('users/edit-user/' + btoa(url));
  }

  onAdd() {
    this.router.navigateByUrl('users/new-user');
  }

  onDelete(user: UserModel) {

    const confirm1 = confirm('Etes vous sûre ?');
    if (confirm1) {
      // @ts-ignore
      this.userService.deleteUser(user._links.self.href).subscribe(
        value => {
          this.onGetUsers();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  onSearch(form: any) {
    this.currentPage = 0;
    this.currentKeyword = form.keyword;
    this.userService.getUsersSearchPage(this.currentKeyword, this.currentPage, 5).subscribe(
      value => {
        console.log(value);
        // @ts-ignore
        this.totalPages = value.page.totalPages;
        this.pages = new Array<number>(this.totalPages);
        // @ts-ignore
        this.users = [];
        //this.users = value._embedded.users;
      }, error => {
        console.log(error);
      }
    );

  }

  onLoadProduits(i: number) {
    this.currentPage = i;
    if (this.currentKeyword !== undefined) {
      console.log('yes');
      this.onSearch(this.currentKeyword);
    } else {
      this.onGetUsers();
    }
    console.log(this.currentKeyword);
  }

  search() {
    console.log(this.currentKeyword);
    this.userService.getUsersSearchPage(this.currentKeyword, this.currentPage, 5).subscribe(
      value => {
        console.log(value);
        // @ts-ignore
        this.totalPages = value.page.totalPages;
        this.pages = new Array<number>(this.totalPages);
        // @ts-ignore
        this.users = value._embedded.users;
      }, error => {
        console.log(error);
      }
    );
  }
}
