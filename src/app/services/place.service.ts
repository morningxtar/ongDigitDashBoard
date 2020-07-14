import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  devHost = 'http://localhost:888';
  prodHost = 'http://105.235.30.236:888';
  host = this.prodHost;

  constructor(private httpClient: HttpClient) {
  }

  getPlaces(): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>(this.host + '/listPlaces');
  }

  getPlacesPage(page, size): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>(this.host + '/places?page=' + page + '&size=' + size);
  }
}
