import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host = 'http://105.235.30.236:888';

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>(this.host + '/listUsers');
  }

  getUsersByType(userTpe): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>(this.host + '/users/search/byUserType?userType=' + userTpe);
  }

  getUsersPage(page, size): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>(this.host + '/users?page=' + page + '&size=' + size);
  }

  getUsersSearchPage(req, page, size): Observable<Array<UserModel>> {
    console.log(this.host + '/users/search/byCordPage?cord=' + req + '&page=' + page + '&size=' + size);
    return this.httpClient.get<Array<UserModel>>(this.host + '/users/byCordPage?cord=' + req + '&page=' + page + '&size=' + size);
  }

  getUser(url): Observable<UserModel> {
    return this.httpClient.get<UserModel>(url);
  }

  saveUser(url, data): Observable<UserModel> {
    return this.httpClient.post<UserModel>(url, data);
  }

  updateUser(url, data): Observable<UserModel> {
    return this.httpClient.put<UserModel>(url, data);
  }

  deleteUser(url): Observable<UserModel> {
    return this.httpClient.delete<UserModel>(url);
  }
}
