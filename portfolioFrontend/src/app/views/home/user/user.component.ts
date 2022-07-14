import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserName } from 'src/app/models/user-name.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/auth-sevices/login.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { UserBindingService } from 'src/app/services/binding-services/user-binging.service';
import { UserListBindingService } from 'src/app/services/binding-services/user-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent<T> implements OnInit {
  
    
    public user: User;
    private userName: UserName= {
      userName: ""
    };
    public userList: Array<UserName>=[];
    private endPoint: string= "userlist";
    public userRoleUser: boolean=false;
    public userRoleAdmin: boolean=false;
    
  
    constructor(
      private loginService: LoginService,
      private userBindingService: UserBindingService<User>,
      private userListBindingService: UserListBindingService<Array<UserName>>,
      private routes: Router
    ) {
      this.user={
        userId: 0,
        userName: "",
        email: "",
        password: "",
        authorities: [
          {"authority": ""},
          {"authority": ""}
        ]
      }
    }
  
    ngOnInit(): void {
      if (sessionStorage.getItem('currentUser')){
        this.user= this.loginService.authenticatedUser;
        console.log("user on user component ", this.user);
        if(this.loginService.authenticatedUser.authorities.length>0){
          this.userRoleUser= true;
        }
        if(this.loginService.authenticatedUser.authorities.length>1){
          this.userRoleAdmin= true;
        }
      }
      this.loginService.getAll(this.endPoint).subscribe(resp =>{
        this.userList= resp;
        
      })
      this.userListBindingService.dataEmitter.subscribe((data:Array<UserName>)=>{
        this.userList= data;
      })

      console.log("user component ", this.user);
      console.log("roleuser on user component ", this.userRoleUser);
      console.log("roleadmin on user component ", this.userRoleAdmin);
    }

    changePass(){
      this.userBinding<User>(this.user);
      $("#changePass").modal("show");
    }

    createUser(){
      $("#newUser").modal("show");
    }

    deleteUser(){
      this.userListBinding<Array<UserName>>(this.userList);
      $("#deleteUser").modal("show");
    }

    onClose(){
      this.routes.navigate(['/']);
    }
  
    openEdit(){
      this.userBinding<User>(this.user);
      $("#editUser").modal("show");
    }
    
    userBinding<T>(data: T){
      this.userBindingService.setData<T>(data);
    }

    userListBinding<T>(data: T){
      this.userListBindingService.setData<T>(data);
    }
  
  
  }
  