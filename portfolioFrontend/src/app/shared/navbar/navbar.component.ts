import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth-sevices/login.service';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public currentUser: string="";

  public roleUser: string="";
  
  public logged: boolean= false;

  public mode: boolean= false;

  public buttonText: string="Go View Mode";
  
  constructor(
    private loginService: LoginService,
    private modeBindingService: ModeBindingService<boolean>
  ) {
    if (sessionStorage.getItem('currentUser')){
      this.logged= true;
      this.currentUser= this.loginService.currentUserSubject.value.userName;
      if(this.loginService.currentUserSubject.value.authorities.length>1){
        this.roleUser= this.loginService.authenticatedUser.authorities[1].authority;
      }else{
        this.roleUser= "ROLE_USER"
      }
      console.log("role admin in navbar ", this.roleUser);
      this.mode=true;
    }
    this.modeBinding<boolean>(this.mode);
  }
  
  ngOnInit(): void {
  }

  setMode(edit: boolean){
    if (edit){
      //sessionStorage.setItem("editMode", "true");
      this.mode=true;
      this.buttonText= "Go View Mode";
      this.modeBinding<boolean>(this.mode);
    }else{
      this.mode=false;
      //sessionStorage.removeItem("editMode");
      this.buttonText= "Open Edit Mode"
      this.modeBinding<boolean>(this.mode);
    }
  }

  ngLogout(){
    this.logged= this.loginService.logout();
    this.modeBinding<boolean>(false);
    //this.ngOnInit();
  }

  modeBinding<T>(data: T){
    this.modeBindingService.setData<T>(data);
  }

}
