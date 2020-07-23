import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from '../../../app.settings';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency:any; 
  public settings: Settings;
  constructor(public appSettings:AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.currency = this.settings.currency;
  }
  
  public changeCurrency(currency){
    this.currency = currency;
    this.settings.currency = currency;
  } 

}
