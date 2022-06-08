import { Component, OnInit } from '@angular/core';
import { BindingService } from 'src/app/services/binding.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public currentUser: string="";
  
  public logged: boolean= false;

  public mode: boolean= false;

  public buttonText: string="Go View Mode";
  
  constructor(
    private loginService: LoginService,
    private bindingService: BindingService<boolean>
  ) {
    if (sessionStorage.getItem('currentUser')){
      this.logged= true;
      this.currentUser= this.loginService.currentUserSubject.value.userName;
      this.mode=true;
    }
    this.binding<boolean>(this.mode);
  }
  
  ngOnInit(): void {
  }

  setMode(edit: boolean){
    if (edit){
      //sessionStorage.setItem("editMode", "true");
      this.mode=true;
      this.buttonText= "Go View Mode";
      this.binding<boolean>(this.mode);
    }else{
      this.mode=false;
      //sessionStorage.removeItem("editMode");
      this.buttonText= "Open Edit Mode"
      this.binding<boolean>(this.mode);
    }
  }

  ngLogout(){
    this.logged= this.loginService.logout();
    this.binding<boolean>(false);
    //this.ngOnInit();
  }

  binding<T>(data: T){
    this.bindingService.setData<T>(data);
  }

}
