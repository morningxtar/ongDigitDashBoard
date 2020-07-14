import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServiceModel} from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  devHost = 'http://localhost:888';
  prodHost = 'http://105.235.30.236:888';
  host = this.prodHost;

  constructor(private httpClient: HttpClient) {
  }

  getServicePage(page, size): Observable<Array<ServiceModel>> {
    return this.httpClient.get<Array<ServiceModel>>(this.host + '/services?page=' + page + '&size=' + size);
  }

  getService(url): Observable<ServiceModel> {
    return this.httpClient.get<ServiceModel>(url);
  }

  saveService(url, data): Observable<ServiceModel> {
    return this.httpClient.post<ServiceModel>(url, data);
  }

  updateService(url, data): Observable<ServiceModel> {
    return this.httpClient.put<ServiceModel>(url, data);
  }

  deleteService(url): Observable<ServiceModel> {
    return this.httpClient.delete<ServiceModel>(url);
  }
}
