import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offers-search-results-filters',
  templateUrl: './offers-search-results-filters.component.html',
  styleUrls: ['./offers-search-results-filters.component.scss']
})
export class OffersSearchResultsFiltersComponent implements OnInit {
  @Input() searchFields: any;
  @Output() onRemoveSearchField: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() { }

  public remove(field){
    this.onRemoveSearchField.emit(field);
  }

}