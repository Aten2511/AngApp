import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

 
  displayedColumns = ['Målt', 'CO', 'NOx','SO2'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Element {
  Maalt: string;
  SO2: number;
  CO: number;
  NOx: number;
}

const ELEMENT_DATA: Element[] = [
  { Maalt: '12-05-2018 12:30', CO: 1.0079, NOx: 1.4,SO2: 1.56},
  { Maalt:  '12-05-2018 12:00', CO: 4.0026, NOx: 3.4,SO2: 1.87},
  { Maalt:  '12-05-2018 11:30', CO: 4.0026, NOx: 3.4,SO2: 1.32},
  { Maalt:  '12-05-2018 11:00', CO: 4.0026, NOx: 3.4,SO2: 2.06},
  { Maalt:  '12-05-2018 10:30', CO: 4.0026, NOx: 3.4,SO2: 2.01},
  { Maalt:  '12-05-2018 10:00', CO: 4.0026, NOx: 3.4,SO2: 2.04},
  { Maalt:  '12-05-2018 9:30', CO: 4.0026, NOx: 3.4,SO2: 1.2},
  { Maalt:  '12-05-2018 9:00', CO: 4.0026, NOx: 3.4,SO2: 0.4},
  { Maalt:  '12-05-2018 8:30', CO: 4.0026, NOx: 3.4,SO2: 1.3},
  { Maalt:  '12-05-2018 8:00', CO: 4.0026, NOx: 3.4,SO2: 0.77},
  { Maalt:  '12-05-2018 7:30', CO: 4.0026, NOx: 3.4,SO2: 1.4},
  { Maalt:  '12-05-2018 7:00', CO: 4.0026, NOx: 3.4,SO2: 0.99},
  { Maalt:  '12-05-2018 6:30', CO: 4.0026, NOx: 3.4,SO2: 0.43},  
  { Maalt:  '12-05-2018 6:00', CO: 4.0026, NOx: 3.4,SO2: 0.79}


];