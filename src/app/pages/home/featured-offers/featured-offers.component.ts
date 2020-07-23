import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featured-offers',
  templateUrl: './featured-offers.component.html',
  styleUrls: ['./featured-offers.component.scss']
})
export class FeaturedOffersComponent implements OnInit {
  @Input('offers') featuredOffers;
  constructor() { }

  ngOnInit() {
  }

}
