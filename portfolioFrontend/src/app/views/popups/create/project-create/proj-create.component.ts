import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MyProject } from 'src/app/models/my-project.model';
import { Technology } from 'src/app/models/technology.model';
import { ProjBindingService } from 'src/app/services/binding-services/proj-binding.service';
import { ProjListBindingService } from 'src/app/services/binding-services/proj-list-binding-service';
import { ProjTechListBindingService } from 'src/app/services/binding-services/proj-tech-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $: any;

@Component({
  selector: 'app-proj-create',
  templateUrl: './proj-create.component.html',
  styleUrls: ['./proj-create.component.css']
})
export class ProjCreateComponent<T> implements OnInit{

  public proj: MyProject;
  private projList: Array<MyProject>=[];
  
  private techSetChanged: Set<number> = new Set();
  public techListAll: Array<Technology> = [];
  public techListTrue: Array<Technology> = [];
  public techListShown: Array<Technology> = [];
  public techListFalse: Array<Technology> = [];
  private tech: Technology = {
    techId: 0,
    techName: '',
    techDescription: '',
    techType: '',
    techIconUrl: '',
    techIndex: 0,
    techLevel: 0,
    techShow: false,
  };

  private projCreateEndPoint: string = 'my-project';
  
  popupForm: FormGroup;
  setFormArray: FormArray;

  onCheckboxChange(e: any) {
    this.techSetChanged.add(e.target.value);
    this.tech = this.techListShown.find((elem) => elem.techId == e.target.value) || this.tech;
    if (e.target.checked){
      this.techListFalse= this.techListFalse.filter(elem => elem.techId!=this.tech.techId) || [];
      this.techListTrue.push(this.tech);
    }
    if (!e.target.checked) {
      this.techListTrue = this.techListTrue.filter(elem => elem.techId!=this.tech.techId) || [];
      this.techListFalse.push(this.tech);
    } 
  }

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private projBindingService: ProjBindingService<MyProject>,
    private projListBindingService: ProjListBindingService<Array<MyProject>>,
    private projTechListBindingService: ProjTechListBindingService<Array<Technology>>
  ) {
    this.proj = {
      projId: 0,
      projName: '',
      projDescription: '',
      projUrl: '',
      techList: [],
      projShow: true,
      projIndex: 99,
    };

    this.popupForm = this.fb.group({ setFormArray: this.fb.array([]) });
    this.setFormArray = this.popupForm.get('setFormArray') as FormArray;

    /* this.popupForm = this.fb.group({
      setList: this.fb.array([]),
    });
 */
    this.popupForm = this.fb.group({
      projName: '',
      projDescription: '',
      projUrl: '',
      projIndex: 99,
      techList: this.fb.array([]),
    });
    
  } //end constructor
  
  ngOnInit(): void {
    // to create the grid with used and unused techs for the project
    this.projTechListBindingService.dataEmitter.subscribe((data: Array<Technology>) => {
      this.techListShown = data;
      this.techListFalse= this.techListShown;
    })
  }
  
  onSubmit() {
    if(!this.popupForm.value.projUrl || !this.popupForm.value.projUrl.startsWith("http")){
      window.alert(`"${this.popupForm.value.projUrl}" is not valid url. Default url will be used.`);
      this.proj.projUrl= "#";
    }else{
      this.proj.projUrl= this.popupForm.value.projUrl || this.proj.projUrl;
    }
    this.proj.projName= this.popupForm.value.projName || this.proj.projName;
    this.proj.projDescription= this.popupForm.value.projDescription || this.proj.projDescription;
    this.proj.projIndex= this.popupForm.value.projIndex || this.proj.projIndex;
    this.proj.techList = this.techListTrue;
    this.projList.push(this.proj);
    this.projListBinding<Array<MyProject>>(this.projList); // optimistic
    this.closePopup();
    this.dataService.create(this.projCreateEndPoint, this.proj).subscribe((resp) => {
      if(resp){
        this.projList= Object.values(resp);
        this.projListBinding<Array<MyProject>>(this.projList); // from db
        this.projBinding<MyProject>(this.proj);
        this.techListTrue.length=0;
        this.popupForm.reset();
      }else{
        window.alert(`Create Project says: ${resp}`);
      }
    });
  }
  
  closePopup() {
    $('#newProj').modal('hide');
  }

  projBinding<T>(data: T) {
    this.projBindingService.setData<T>(data);
  }

  projListBinding<T>(data: T) {
    this.projListBindingService.setData<T>(data);
  }
}
