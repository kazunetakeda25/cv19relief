import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-hot-offer-today',
  templateUrl: './hot-offer-today.component.html',
  styleUrls: ['./hot-offer-today.component.scss']
})
export class HotOfferTodayComponent implements OnInit {
  @Input('offerId') offerId;
  public offer;
  constructor(public appService:AppService) { }

  ngOnInit() {
    this.appService.getOfferById(this.offerId).subscribe(offer=>{
      this.offer = offer;
    }) 
  }

}
