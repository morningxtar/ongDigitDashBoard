import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaceModel} from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  devHost = 'http://localhost:888';
  prodHost = 'http://105.235.30.236:888';
  host = this.prodHost;

  constructor(private httpClient: HttpClient) {
  }

  getNumberHourMonth(mois, presence): Observable<number> {
    return this.httpClient.get<number>(this.host + '/listPlaces/search/nbHourMonth?dateReservation='
    + mois + '&presence=' + presence);
  }

  getNumberHourMonthUser(user, mois, presence): Observable<number> {
    return this.httpClient.get<number>(this.host + '/listPlaces/search/nbHourUserMonth?' +
      'userEmail=' + user
      + '&presence=' + presence
      + '&dateReservation=' + mois );
  }

  getUserNumberHour(email, presence): Observable<number> {
    return this.httpClient.get<number>(this.host + '/listPlaces/search/nbHourUser?'
      + '&presence=' + presence + '&userEmail=' + email);
  }

  getUsersInSalle(access, presence): Observable<Array<PlaceModel>> {
    return this.httpClient.get<Array<PlaceModel>>(this.host + '/places/search/byPresenceAccess?' +
      'access=' + access + '&presence=' + presence);
  }

  getUsersPresence(jour, access, presence): Observable<Array<PlaceModel>> {
    return this.httpClient.get<Array<PlaceModel>>(this.host + '/places/search/byPresenceAccessDate?' +
      'access=' + access + '&presence=' + presence + '&dateReservation=' + jour);
  }

  getPlacesAccessByEmail(email): Observable<Array<PlaceModel>> {
    return this.httpClient.get<Array<PlaceModel>>(this.host + '/listPlaces/search/byAccessUser?' +
      'email=' + email);
  }

  getPlacesNoAccessByEmail(email): Observable<Array<PlaceModel>> {
    return this.httpClient.get<Array<PlaceModel>>(this.host + '/listPlaces/search/byNoAccessUser?' +
      'email=' + email);
  }

  getPlacesCompletedByEmail(email): Observable<Array<PlaceModel>> {
    return this.httpClient.get<Array<PlaceModel>>(this.host + '/listPlaces/search/completedUser?' +
      'email=' + email);
  }
}
