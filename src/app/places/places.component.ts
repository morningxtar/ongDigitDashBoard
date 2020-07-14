import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {UserModel} from "../models/user.model";
import {PlaceModel} from "../models/place.model";
import {PlaceService} from "../services/place.service";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  places: Array<PlaceModel>;
  currentPage = 0;
  totalPages: number;
  pages: Array<number>;

  constructor(private placeService: PlaceService, private router: Router) { }

  ngOnInit(): void {
    this.onGetPlaces();
  }

  // tslint:disable-next-line:typedef
  onGetPlaces() {
    this.placeService.getPlacesPage(this.currentPage, 10)
      .subscribe(value => {
        //console.log(value);
        // @ts-ignore
        this.totalPages = value.page.totalPages;
        this.pages = new Array<number>(this.totalPages);
        // @ts-ignore
        this.places = value._embedded.places;
      }, error => {
        console.log(error);
      });
  }

  onLoadProduits(i: number) {
    this.currentPage = i;
    this.onGetPlaces();
  }
}
