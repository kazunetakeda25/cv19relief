import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-offers-toolbar',
  templateUrl: './offers-toolbar.component.html',
  styleUrls: ['./offers-toolbar.component.scss']
})
export class OffersToolbarComponent implements OnInit {
  @Input() isHomePage:boolean = false;
  @Input() showSidenavToggle:boolean = false;
  @Output() onSidenavToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeCount: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeSorting: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeViewType: EventEmitter<any> = new EventEmitter<any>();

  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [8, 12, 16, 24, 36];
  public count:any;
  public sortings = ['Sort by Default', 'Newest', 'Oldest', 'Popular', 'Price (Low to High)', 'Price (High to Low)'];
  public sort:any;

  constructor() { }

  ngOnInit() {
    this.count = (this.isHomePage) ? this.counts[0] : this.counts[1];
    this.sort = this.sortings[0];
  }

  ngOnChanges(){
    // console.log(' show toggle - ' ,this.showSidenavToggle)
  }

  public changeCount(count){
    this.count = count;
    this.onChangeCount.emit(count);
    // this.getAllProducts(); 
  }

  public changeSorting(sort){
    this.sort = sort;
    this.onChangeSorting.emit(sort);
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
    this.onChangeViewType.emit({viewType:viewType, viewCol:viewCol});
  }

  public sidenavToggle(){
    this.onSidenavToggle.emit();
  }

}
