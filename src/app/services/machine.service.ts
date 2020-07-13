import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MachineModel} from '../models/machine.model';
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  host = 'http://105.235.30.236:888';

  constructor(private httpClient: HttpClient) {
  }

  getMachinePage(page, size): Observable<Array<MachineModel>> {
    return this.httpClient.get<Array<MachineModel>>(this.host + '/machines?page=' + page + '&size=' + size);
  }

  getMachine(url): Observable<MachineModel> {
    return this.httpClient.get<MachineModel>(url);
  }

  saveMachine(url, data): Observable<MachineModel> {
    return this.httpClient.post<MachineModel>(url, data);
  }

  updateMachine(url, data): Observable<MachineModel> {
    return this.httpClient.put<MachineModel>(url, data);
  }

  deleteMachine(url): Observable<MachineModel> {
    return this.httpClient.delete<MachineModel>(url);
  }
}
