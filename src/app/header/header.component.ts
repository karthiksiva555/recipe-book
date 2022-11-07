import { Component, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {

  @Output() headerClicked = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onHeaderClicked(optionSelected: string){
    this.headerClicked.emit(optionSelected);
  }

}
