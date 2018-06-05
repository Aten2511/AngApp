import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
 import {MatButtonModule,MatPaginatorModule,MatTableModule,MatNativeDateModule,
   MatFormFieldModule,MatInputModule,MatTabsModule, MatSelectModule,MatCheckboxModule,
   MatCardModule,MatSortModule ,MatGridListModule,MatDialogModule} from '@angular/material';
import { ChartModule,HIGHCHARTS_MODULES } from 'angular-highcharts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { StationComponent } from './station/station.component';
import { Station2Component } from './station2/station2.component';
import { HomeComponent } from './home/home.component';
import { ComponentsComponent } from './components/components.component';
//import services

import { HttpClientModule } from '@angular/common/http'
import { DateAdapter } from '@angular/material';
import { NativeDateAdapter } from '@angular/material';

import { HttpService} from './services/http.service';
import {DataService} from "./services/data.service";

import { StationsComponent } from './stations/stations.component';
import { CompoundsComponent } from './compounds/compounds.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Station3Component } from './station3/station3.component';
import { CompoundComponent } from './compound/compound.component';
import { DialogOverviewDialog } from './station3/station3.component';
import { DialogOverviewDialog2 } from './station3/station3.component';



@NgModule({
  declarations: [
    AppComponent,
    StationComponent,
    HomeComponent,
    ComponentsComponent,
    StationsComponent,
    CompoundsComponent,
    Station2Component,
    Station3Component,
    CompoundComponent,DialogOverviewDialog
    ,DialogOverviewDialog2

  ],
  entryComponents: [Station3Component, DialogOverviewDialog
    ,DialogOverviewDialog2],
  imports: [
    BrowserModule,AppRoutingModule, BrowserAnimationsModule,
    MatButtonModule,MatFormFieldModule, MatInputModule,
    MatCheckboxModule,MatCardModule,MatGridListModule,ChartModule,MatTableModule,
    MatPaginatorModule,MatDatepickerModule,MatSortModule,MatSelectModule,
    HttpClientModule,MatNativeDateModule,MatExpansionModule,ReactiveFormsModule,MatTabsModule,MatDialogModule
    
  ],
  providers: [HttpService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
