import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserName } from 'src/app/models/user-name.model';
import { LoginService } from 'src/app/services/auth-sevices/login.service';
import { UserListBindingService } from 'src/app/services/binding-services/user-list-binding.service';

declare var $ : any;

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent<T> implements OnInit {

  private deleteEndPoint: string = "delete";
  
  private user: UserName={
    userName: ""
  };

  public userList: Array<UserName>= [];

  constructor(
    private formBilder: FormBuilder,
    private loginService: LoginService,
    private userListBindingService: UserListBindingService<Array<UserName>>,
  ) { }
  
  deleteForm = this.formBilder.group({
    userName: [null,
      [
        Validators.required
      ]
    ],
    repUserName: [null,
      [
        Validators.required
      ]
    ]
  },{validator: this.checkIfMatchingUserNames('userName', 'repUserName')}
  );
  checkIfMatchingUserNames(username: string, repuserName: string) {
    return (deleteForm: FormGroup) => {
      let luserName = deleteForm.controls[username],
          lrepUserName = deleteForm.controls[repuserName];
      if (luserName.value !== lrepUserName.value) {
        return lrepUserName.setErrors({notEquivalent: true})
      }
      else {
          return lrepUserName.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
    this.userListBindingService.dataEmitter.subscribe((data:Array<UserName>)=>{
      this.userList= data;
    })
  }

  delSubmit(event : Event): void{
    let goStop= true;
    event.preventDefault;
    if(this.deleteForm.value.userName == this.loginService.authenticatedUser.userName){
      window.alert("For security reasons, you cannot delete the current user");
      goStop= true;
      return
    }
    this.userList.forEach(elem => {
      if(elem.userName == this.deleteForm.value.userName){
        goStop= false;
        return
      }
    })
    if(goStop){
      window.alert("UserName mismatch");
    }else{
      this.userList = this.userList.filter(elem => elem.userName != this.deleteForm.value.userName);
      this.userListBinding<Array<UserName>>(this.userList);
      this.user.userName= this.deleteForm.value.userName;
      this.loginService.delUser(this.user, this.deleteEndPoint).subscribe(resp =>{
        console.log({resp});
        this.onClose();
      })
    }
  }
  

  onClose(){
    this.deleteForm.reset();
    $("#deleteUser").modal("hide");
  }

  userListBinding<T>(data: T){
    this.userListBindingService.setData<T>(data);
  }

}
