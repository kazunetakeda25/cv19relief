import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  public agents;
  constructor(public appService:AppService) { }

  ngOnInit() {
    this.agents = this.appService.getAgents();
  }

}
