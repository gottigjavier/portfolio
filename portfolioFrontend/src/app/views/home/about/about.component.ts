import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/models/about.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';

declare var $ : any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent<T> implements OnInit {

  public about: About;
  private endPoint: string= "about/list";


  public editMode: boolean= false;
  
  costructor(
    
  ) {
    
  }
  
  constructor(
    private dataService: DataService<T>,
    private bindingService: BindingService<About>
    ) {
      this.about={
        aboutId: 0,
        firstName: "",
        lastName: "",
        shortExplanation: "",
        photoUrl: ""
        }
        /* if (sessionStorage.getItem('editMode')){
          this.editMode= true;
          this.ngOnInit();
        } */
        // Con sessionStorage no se actualiza el componente, con dataEmoter sí
        this.bindingService.dataEmitter.subscribe((data: boolean) =>{
          this.editMode= data;
        })
    }
    
    
  ngOnInit(): void {
    this.dataService.getAll<Array<About>>(this.endPoint).subscribe(response => {
      this.about= response[response.length-1]; // Last created
      console.log("about -> ", this.about);
    }) 
  };
  
  openEdit(){
    this.binding<About>(this.about);
    $("#editAbout").modal("show");
  }
  
  binding<T>(data: T){
    this.bindingService.setData<T>(data);
  }

}

