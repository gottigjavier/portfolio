import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent<T> implements OnInit {
  
    
    public user: User;
    private endPoint: string= "user/list";
    
  
    constructor(
      private dataService: DataService<T>,
      private bindingService: BindingService<User>
    ) {
      this.user={
        userId: 0,
        userName: "",
        userMail: "",
        userPassword: ""
      }
    }
  
    ngOnInit(): void {
      // Atention -> security
      /* this.dataService.getAll<Array<User>>(this.endPoint).subscribe(response => {
        this.user= response[response.length-1]; // Last created
      }) */
    }
  
    openEdit(){
      this.binding<User>(this.user);
      $("#editUser").modal("show");
    }
    
    binding<T>(data: T){
      this.bindingService.setData<T>(data);
    }
  
  
  }
  