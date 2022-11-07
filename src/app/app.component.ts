import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isShopping: boolean = false;
  title = 'recipe-book';

  onHeaderClicked(eventData: string){
    this.isShopping = eventData==='shop';
  }
}
