import { Component, OnInit, Input } from '@angular/core';
import { Settings, AppSettings } from '../../app.settings';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {
  @Input() step: number = 1;
  public settings: Settings;
  constructor(public appSettings:AppSettings) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.settings.loadMore.step = this.step;
  }

  public startLoad(){
    this.settings.loadMore.start = true;
    this.settings.loadMore.load = true;
  }

}
