import { Component, OnInit,ViewChild ,Pipe, PipeTransform ,Input ,ElementRef,Sanitizer } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import { Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { SafeResourceUrl, SafeUrl,DomSanitizer} from '@angular/platform-browser';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';

import {Station} from '../models/station'
import {Stof} from '../models/stof'
import{DataTablesResponse} from'../models/dataTablesResponse'
import { Data } from '../models/data';

import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import { MatTableDataSource,MatFormField,MatInput, MatSelect,MatDatepicker} from '@angular/material';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})

export class StationComponent  implements OnInit  {
  results: Data[];
  //@ViewChild('chartTarget') chartTarget: ElementRef;
  chart= new Chart;
  //download as json
  downloadJsonHref :any;
  //download as csv
   optionsCSV = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    useBom: true,
    noDownload: true,
    headers: ["maalested", "stof", "date","result","unit"]
  };

  startDate = new Date(2010, 0, 1);
  selectedStation: Station;
  stofs:any;
   frekvs=[
    {value: 'hour', viewValue: 'Hver time'},
    {value: 'day', viewValue: 'Daglig'},
    {value: 'week', viewValue: 'Ugentlig'},
    {value: 'month', viewValue: 'Hver måned'},
    {value: 'quarter', viewValue: 'Hvert kvartal'},
    {value: 'year', viewValue: 'Årlig'}, ];

  options: FormGroup;
  stofid = new FormControl('', [Validators.required]);
  dato = new FormControl('', [Validators.required]);
  frekv = new FormControl('', [Validators.required]);
  
par1;par2;par3;stationId:any;
constructor(private http : HttpService,private route: ActivatedRoute,private fb: FormBuilder,
  private sanitizer: DomSanitizer ) { 

  this.options = fb.group({
    stofid: this.stofid,
    dato: this.dato,
    frekv:this.frekv
  });
}
  ngOnInit() {
    this.stationId = this.route.snapshot.params['id'];
   
     this.http.getStationById(this.stationId)
      .subscribe(
        (data: Station) => this.selectedStation = data,
      );

     this.http.GetCompoundsByStation(this.stationId)
      .subscribe(
        (data: Stof[]) => this.stofs = data,
        (err: any) => console.log("no data")
      );      
    

      }
    async getdata(){
     this.par3= this.options.value.dato.getFullYear();
     this.par1=this.options.value.stofid;
     this.par2=this.options.value.frekv;
    this.http.GetDataByStation(this.stationId,this.par3,this.par2)
    .subscribe( 
    (data: Data[]) => this.results = data,
    (err: any) => console.log("no data"));  
  
  }

   
}
/* export class DataDataSource extends  DataSource<Data> {

  constructor(private http: HttpService) {
        super();
  }

  connect(): Observable<Data[]> {
      console.log("Connecting data source");
      return this.http.getStof();
  }

  disconnect(): void {
     
  }

}


 */