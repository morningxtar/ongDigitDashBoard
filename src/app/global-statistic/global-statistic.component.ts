import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {StatisticService} from '../services/statistic.service';
import {UserModel} from '../models/user.model';
import {UserService} from '../services/user.service';
import {PlaceModel} from "../models/place.model";


@Component({
  selector: 'app-global-statistic',
  templateUrl: './global-statistic.component.html',
  styleUrls: ['./global-statistic.component.css']
})
export class GlobalStatisticComponent implements OnInit {

  donnees = [];
  donnees1 = [];
  donnees2 = [];
  emails = [];
  date = ['-1-', '-2-', '-3-', '-4-', '-5-', '-6-', '-7-', '-8-', '-9-', '-10-', '-11-', '-12-'];
  users: Array<UserModel>;
  placesActives: Array<PlaceModel>;
  placesPresents: Array<PlaceModel>;
  placesNonPresents: Array<PlaceModel>;

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

  barChartLabels1: Label[];

  barChartData1: ChartDataSets[] = [
    {data: this.donnees1, label: 'Nombre d\'heures total'},
  ];

  barChartData2: ChartDataSets[] = [
    {data: this.donnees2, label: 'Nombre d\'heures total'},
  ];
  private dat: string;

  constructor(private statisticService: StatisticService, private userService: UserService) {
  }

  ngOnInit(): void {
    const date: Date = new Date();
    const mois = Number(date.getMonth()) + 1;
    this.dat = date.getDate() + '-' + mois + '-' + date.getFullYear();
    this.userService.getUsersByType('inscription normale').subscribe(
      value => {
        // @ts-ignore
        this.users = value._embedded.users;
        this.getUserNumberHourByMonth(this.users);
        this.getNoUserNumberHourByMonth(this.users);
      }, error => {
        console.log(error);
      }
    );
    this.getNumberHourByMonth();
    this.getUsersInSalle();
    this.getPresencesUsers(this.dat);
    this.getNonPresencesUsers(this.dat);
  }

  getNumberHourByMonth() {
    for (let i = 0; i < this.date.length; i++) {
      this.statisticService.getNumberHourMonth(this.date[i], false, true).subscribe(
        nombre => {
          const index = Number(this.date[i].split('-')[1]);
          this.donnees[index - 1] = nombre;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  getNoUserNumberHourByMonth(users: Array<UserModel>) {
    for (let i = 0; i < this.users.length; i++) {
      this.emails[i] = users[i].email;
      this.statisticService.getUserNumberHourMonth(users[i].email, false, false).subscribe(
        nombre => {
          this.donnees2[i] = nombre;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  getUserNumberHourByMonth(users: Array<UserModel>) {
    for (let i = 0; i < this.users.length; i++) {
      this.emails[i] = users[i].email;
      this.statisticService.getUserNumberHourMonth(users[i].email, false, true).subscribe(
        nombre => {
          this.donnees1[i] = nombre;
        }, error => {
          console.log(error);
        }
      );
    }
    this.barChartLabels1 = this.emails;
  }

  getUsersInSalle() {
    this.statisticService.getUsersInSalle(true, true).subscribe(
      value => {
        // @ts-ignore
        this.placesActives = value._embedded.places;
      }, error => {
        console.log(error);
      }
    );
  }

  getPresencesUsers(day) {
    this.statisticService.getUsersPresence(day, false, true).subscribe(
      value => {
        // @ts-ignore
        this.placesPresents = value._embedded.places;
      }
    );
  }


  getNonPresencesUsers(day) {
    this.statisticService.getUsersPresence(day, false, false).subscribe(
      value => {
        // @ts-ignore
        this.placesNonPresents = value._embedded.places;
      }
    );
  }

  convertStringToNumber(string) {
    return Number(string);
  }

  test(event) {
    console.log(event);
  }
}
