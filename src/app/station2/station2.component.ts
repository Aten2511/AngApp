import { Component, OnInit,ViewChild ,Pipe, PipeTransform,Sanitizer   } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import {Station} from '../models/station'
import {Stof} from '../models/stof'
import {MatPaginator,MatTab, MatTableDataSource,MatFormField,MatInput, MatSelect,MatSort,MatDatepicker} from '@angular/material';
import { Data } from '../models/data';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,NativeDateAdapter} from '@angular/material/core';
import {PageEvent} from '@angular/material';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { SafeResourceUrl, SafeUrl,DomSanitizer} from '@angular/platform-browser';


//https://momentjs.com/docs/#/displaying/format/

/* export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}; */

@Component({
  selector: 'app-station2',
  templateUrl: './station2.component.html',
  styleUrls: ['./station2.component.css']

})

export class Station2Component implements OnInit {

  isExpanded:any;

  startDate = new Date(2018, 0, 1);
  endDate = new Date(2018, 0, 1);

  selectedStation: Station;
  stofs:any;
  results:Data[];
  stofResults:Data[];

  //download as json
  downloadJsonHref :any;
  theJSON:any;
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
 //table 
  displayedColumns = ['date', 'result', 'unit'];
  dataSource : any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //stof selector
   frekvs=[
    {value: 'hour', viewValue: 'Hver time'},
    {value: 'day', viewValue: 'Daglig'},
    {value: 'week', viewValue: 'Ugentlig'},
    {value: 'month', viewValue: 'Hver måned'},
    {value: 'quarter', viewValue: 'Hvert kvartal'},
    {value: 'year', viewValue: 'Årlig'},


  ];
  options: FormGroup;
  stofid = new FormControl('', [Validators.required]);
  datefrom = new FormControl('', [Validators.required]);
  dateto = new FormControl('', [Validators.required]);
  frekv = new FormControl('', [Validators.required]);
  
par1;fre;stationId:any;
from;to:any;
constructor(private http : HttpService,private route: ActivatedRoute,private fb: FormBuilder,
  private router: Router,private sanitizer: DomSanitizer) { 

  this.options = fb.group({
    //stofid: this.stofid,
    datefrom: this.datefrom,
    dateto:this.dateto,
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
      //let datas = new MatTableDataSource<Data>(this.selectedData);
    
    }
    
    async getdata(){
      
     this.from= this.convert(this.options.value.datefrom);
     this.to= this.convert(this.options.value.dateto);
     this.fre=this.options.value.frekv;
     this.http.GetDataByStationBydate(this.stationId,this.from,this.to,this.fre)
     .subscribe(
       (data: Data[]) => this.results = data,
       (err: any) => console.log("no data")
     );    
        
    this.stofResults.length=0;
     console.log(this.results);
    }
//convert date format to YYYY-MM-DD
     convert(str) {
      var date = new Date(str),
          mnth = ("0" + (date.getMonth()+1)).slice(-2),
          day  = ("0" + date.getDate()).slice(-2);
      return [ date.getFullYear(), mnth, day ].join("-");
  }
  
    
    async tabChanged($event) {
    this.isExpanded = $event.tab.textLabel;
    this.stofResults=this.results.filter(obj=>  obj.compound===this.isExpanded);
    
    this.dataSource = new MatTableDataSource<Data>(this.stofResults);
    this.dataSource.paginator = this.paginator;
    var theJSON = JSON.stringify(this.results);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
       /* this.http.GetDataByStationBydateBystof(this.stationId,this.isExpanded,this.from,this.to,this.fre)
     .subscribe(
       (data: Data[]) => this.stofResults = data,
       (err: any) => console.log("no data")
     );  */ 

    }
  
    public async downloadCSV(){
      new Angular5Csv(this.results, 'csv');     
  
     }
      public async downloadJSON() {
        var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(this.theJSON));
        this.downloadJsonHref = uri;
        console.log(this.downloadJsonHref);
        
      }
}



