import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaceModel} from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  host = 'http://105.235.30.236:888';

  constructor(private httpClient: HttpClient) {
  }

  getNumberHourMonth(mois, access, presence): Observable<number> {
    return this.httpClient.get<number>(this.host + '/places/search/nbHourMonth?dateReservation='
    + mois + '&access=' + access + '&presence=' + presence);
  }

  getUserNumberHourMonth(email, access, presence): Observable<number> {
    return this.httpClient.get<number>(this.host + '/places/search/nbHourMonthUser?' +
      'access=' + access + '&presence=' + presence + '&userEmail=' + email);
  }

  getUsersInSalle(access, presence): Observable<Array<PlaceModel>> {
    return this.httpClient.get<Array<PlaceModel>>(this.host + '/places/search/byPresenceAccess?' +
      'access=' + access + '&presence=' + presence);
  }

  getUsersPresence(jour, access, presence): Observable<Array<PlaceModel>> {
    return this.httpClient.get<Array<PlaceModel>>(this.host + '/places/search/byPresenceAccessDate?' +
      'access=' + access + '&presence=' + presence + '&dateReservation=' + jour);
  }

  getUsersPresenceByEmail(email, access, presence): Observable<Array<PlaceModel>> {
    return this.httpClient.get<Array<PlaceModel>>(this.host + '/places/search/byPresenceAccessUser?' +
      'access=' + access + '&presence=' + presence + '&userEmail=' + email);
  }
}
