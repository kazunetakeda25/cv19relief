import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html' 
})
export class MonthlyComponent implements OnInit {
  public items = [
    { name: 'free', price: 0, desc: 'Simplest package to get you started', offers: '10', agentProfiles: '1', agencyProfiles: '0', featuredOffers: '0' },
    { name: 'basic', price: 49, desc: 'The most popular package we offer', offers: '100', agentProfiles: '3', agencyProfiles: '1', featuredOffers: '0' },
    { name: 'premium', price: 79, desc: 'The perfect package for your small business', offers: '250', agentProfiles: '10', agencyProfiles: '5', featuredOffers: '50' },
    { name: 'professional', price: 159, desc: 'Our most advanced & complete package', offers: 'Unlimited', agentProfiles: 'Unlimited', agencyProfiles: 'Unlimited', featuredOffers: 'Unlimited' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
