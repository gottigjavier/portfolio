import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'portfolio';

  public loaded: boolean= false;
  constructor() { 
    window.onload= () =>{
      this.loaded= true;
      console.log("Home component listener ", window.addEventListener )
    }
  }
}
