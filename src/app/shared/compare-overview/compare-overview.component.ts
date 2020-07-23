import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'; 
import { Offer } from '../../app.models';
import { Settings, AppSettings } from '../../app.settings';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-compare-overview',
  templateUrl: './compare-overview.component.html',
  styleUrls: ['./compare-overview.component.scss'] 
})
export class CompareOverviewComponent implements OnInit {

  public offers: Offer[];
  public settings: Settings;
  constructor(public appService:AppService, 
              public appSettings:AppSettings,
              private bottomSheetRef: MatBottomSheetRef<CompareOverviewComponent>) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.offers = this.appService.Data.compareList;
  }

  public hideSheet(isRedirect:boolean){
    this.bottomSheetRef.dismiss(isRedirect);
  }

  public remove(offer, event:any) {
    const index: number = this.appService.Data.compareList.indexOf(offer);
    if (index !== -1) {
      this.appService.Data.compareList.splice(index, 1); 
    } 
    if(this.appService.Data.compareList.length == 0){
      this.hideSheet(false);
    }
    event.preventDefault();           
  }  

} 