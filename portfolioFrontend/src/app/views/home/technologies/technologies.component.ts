import { Component, OnInit } from '@angular/core';
import { Technology } from 'src/app/models/technology.model';
import { DataService } from 'src/app/services/data.service';
import { HostListener } from "@angular/core";
import { BindingService } from 'src/app/services/binding.service';
import { MyProject } from 'src/app/models/my-project.model';

declare var $ : any;

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent<T> implements OnInit {


  public techList: Array<Technology>=[];
  private tech: Technology;
  private projList: Array<MyProject>=[];
  private projGetAllEndPoint: string= "my-project/list";
  private projUpdateEndPoint: string= "my-project/update";
  private endPoint: string= "technology/list";
  private delEndPoint: string= "technology/delete";

  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?:any) {
        this.scrWidth = window.innerWidth;
        console.log(this.scrWidth);
  }
  
  constructor(
    private dataService: DataService<T>,
    private bindingService: BindingService<T>) {

      this.tech={
        techId: 0,
        techName: "",
        techType: "",
        techDescription: "",
        techIconUrl: "",
        techLevel: 0,
        techIndex: 0
      }
  }
  
  ngOnInit(): void {
    this.dataService.getAll<Array<Technology>>(this.endPoint).subscribe(response => {
      console.log("tech -> ", response);
      response.sort((a,b) => a.techIndex - b.techIndex);
      console.log("width  ", window.innerWidth)
      this.techList = response;
      this.getScreenSize();
      // to link image size with level
      /* this.techList.map(tech =>{
        tech.techLevel= tech.techLevel*this.scrWidth/400;
      }) */
    }) 
};

deleteTech(id:number){
  // Traigo todos los projects
  this.dataService.getAll<Array<MyProject>>(this.projGetAllEndPoint).subscribe(response => {
    this.projList = response;
    //por cada proyecto filtro a ver si tira un tech con el id del que quiero borrar
    this.projList.forEach(proj =>{
    this.tech= proj.techList.filter(elem => elem.techId==id)[0];
      // Si encuentra in tech hago que me tire el resto de techs menos ese
      if(this.tech!=undefined){
        proj.techList= proj.techList.filter(el => el.techId!=this.tech.techId);
        // Actualizo el project pero sin ese tech
          this.dataService.update(this.projUpdateEndPoint, proj).subscribe(resp =>{
            if(!resp){
              alert("Error: Not saved")
            };
            this.binding<MyProject>(proj);
          })
      }
    })
    // Lo anterior es porque si no actualizo la lista de tech en los proyectos, la base de datos
    // no me permite borrar un tech asociado a un proyecto (ManyToMany)
    // En realidad debería ser responsabilidad del backend. Trasladar.
    this.dataService.delete(`${this.delEndPoint}/${id}`).subscribe(resp =>{
      if(!resp){
        alert("Error. Not Deleted");
      }
      window.location.reload(); // mala practica ya que recarga toda la pagina 
      // Hay que encontrar la forma de que los componentes "Project" se actualicen también
      // Si llevo la funcion de borrar a la ventana emergente edit (con un boton) se 
      // creo que actualizarían los proyectos
      //this.ngOnInit(); // Acualiza solo este componente
    })
  }); 

}

  
openNewTech(){
  $("#newTech").modal("show");
}

openEdit(i: number){
  this.binding<Technology>(this.techList[i]);
  $("#editTech").modal("show");
}

binding<T>(data: T){
  this.bindingService.setData<T>(data);
}

}
