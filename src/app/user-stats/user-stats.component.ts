import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {StatisticService} from '../services/statistic.service';
import {UserModel} from '../models/user.model';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {PlaceModel} from "../models/place.model";

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  currentUser: UserModel;
  email: string;
  placesEnCours: Array<PlaceModel>;
  placesNonCompleted: Array<PlaceModel>;
  placesCompleted: Array<PlaceModel>;

  date = ['-1-', '-2-', '-3-', '-4-', '-5-', '-6-', '-7-', '-8-', '-9-', '-10-', '-11-', '-12-'];
  donnees = [];
  donnees1 = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {data: this.donnees, label: 'Nombre d\'heures total'},
  ];

  barChartData1: ChartDataSets[] = [
    {data: this.donnees1, label: 'Nombre d\'heures total'},
  ];

  constructor(private router: Router, private activedRoute: ActivatedRoute,
              private userService: UserService, private statisticService: StatisticService) {
  }

  ngOnInit(): void {

    this.email = atob(this.activedRoute.snapshot.params.id);
    this.getNumberHourByMonth(this.email);
    this.getNoNumberHourByMonth(this.email);
    this.getPlacesEnCours(this.email);
    this.getPlacesNonCompleted(this.email);
    this.getPlacesCompleted(this.email);
  }

  getNumberHourByMonth(email){
    console.log(email);
    for (let i = 0; i < this.date.length; i++) {
      this.statisticService.getNumberHourMonthUser(email, this.date[i], true).subscribe(
        nombre => {
          const index = Number(this.date[i].split('-')[1]);
          this.donnees[index - 1] = nombre;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  getNoNumberHourByMonth(email){
    for (let i = 0; i < this.date.length; i++) {
      this.statisticService.getNumberHourMonthUser(email, this.date[i], false).subscribe(
        nombre => {
          const index = Number(this.date[i].split('-')[1]);
          this.donnees1[index - 1] = nombre;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  getPlacesEnCours(email){
    this.statisticService.getPlacesAccessByEmail(email).subscribe(
      value => {
        this.placesEnCours = value;
      }, error => {
        console.log(error);
      }
    );
  }

  getPlacesNonCompleted(email){
    this.statisticService.getPlacesNoAccessByEmail(email).subscribe(
      value => {
        this.placesNonCompleted = value;
      }, error => {
        console.log(error);
      }
    );
  }

  getPlacesCompleted(email){
    this.statisticService.getPlacesCompletedByEmail(email).subscribe(
      value => {
        this.placesCompleted = value;
      }, error => {
        console.log(error);
      }
    );
  }
}
