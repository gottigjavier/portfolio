import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MyProject } from 'src/app/models/my-project.model';
import { Technology } from 'src/app/models/technology.model';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { ProjBindingService } from 'src/app/services/binding-services/proj-binding.service';
import { TechListBindingService } from 'src/app/services/binding-services/tech-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $: any;

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css'],
})
export class ProjectsEditComponent<T> {
  proj: MyProject;

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

  private projEndPoint: string = 'my-project/update';
  private techEndPoint: string = 'technology/list';

  popupForm: FormGroup;
  techFormArray: FormArray;

  onCheckboxChange(e: any) {
    this.techSetChanged.add(e.target.value);
    this.tech = this.techListShown.find((elem) => elem.techId == e.target.value) || this.tech;
    if (this.techListTrue.includes(this.tech)) {
      this.techListTrue = this.techListTrue.filter(elem => elem.techId!=this.tech.techId);
      this.techListFalse.push(this.tech);
    } 
    if (this.techListFalse.includes(this.tech)){
      this.techListFalse= this.techListFalse.filter(elem => elem.techId!=this.tech.techId);
      this.techListTrue.push(this.tech);
    }

    // REVISAR qué pasa con los que están en proj.techList
    // Tal vez solo marcarlos
    console.log('techSetChanged ', this.techSetChanged);
  }

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private projBindingService: ProjBindingService<MyProject>,
    private popupBindingService: PopupBindingService<MyProject>,
    private techListBindingService: TechListBindingService<T>
  ) {
    this.proj = {
      projId: 0,
      projName: '',
      projDescription: '',
      projUrl: '',
      techList: [],
      projIndex: 0,
    };

    this.popupForm = this.fb.group({ techFormArray: this.fb.array([]) });
    this.techFormArray = this.popupForm.get('setFormArray') as FormArray;

    this.popupForm = this.fb.group({
      techList: this.fb.array([]),
    });

    this.popupForm = this.fb.group({
      projName: '',
      projDescription: '',
      projUrl: '',
      techList: this.fb.array([]),
    });

    this.popupBindingService.dataEmitter.subscribe((data: MyProject) => {
      this.proj = data;
    });

    this.techListBindingService.dataEmitter.subscribe((data: Array<Technology>) => {
      this.techListShown = data;
      this.techListTrue = this.proj.techList.filter(elem => elem.techShow);
      this.techListFalse= this.techListShown;
      for(let techFalse of this.techListFalse){
        for(let techTrue of this.techListTrue){
          if(techFalse.techId==techTrue.techId){
            this.techListFalse.pop();
            break;
          }
        }
      }
      console.log("techList true proj edit ", this.techListTrue);
      console.log("techList false proj edit ", this.techListFalse);
    })
    /* this.dataService
      .getAll<Array<Technology>>(this.techEndPoint)
      .subscribe((response) => {
        this.proj.techList.length = 0;
        this.projBindingService.dataEmitter.subscribe((data: MyProject) => {
          this.proj = data;
          this.techListAll = response;
        });
      }); */
  } //end constructor
/* 
  insideSubmit(): Array<Technology> {
    this.proj.techList.length = 0;
    this.techFormArray.value.forEach((element: number) => {
      if (element != null) {
        this.proj.techList.push(
          this.techListAll.filter((el) => el.techId == element)[0]
        );
      }
    });
    return this.proj.techList;
  }
 */
  onSubmit() {
    //this.proj.techList = this.insideSubmit();
    this.proj.projName = this.popupForm.value.projName || this.proj.projName;
    this.proj.projDescription =
      this.popupForm.value.projDescription || this.proj.projDescription;
    this.proj.projUrl = this.popupForm.value.projUrl || this.proj.projUrl;
    this.proj.projIndex = this.popupForm.value.projIndex || this.proj.projIndex;
    this.dataService.update(this.projEndPoint, this.proj).subscribe((resp) => {
      if (!resp) {
        alert('Error: Not saved');
      }
    });

    this.closePopup();
  }

  closePopup() {
    //this.projBinding<MyProject>(this.proj);
    /* this.techListFalse.length=0;
    this.techListTrue.length=0;
    this.techListTrueStr.length=0;
    */
    this.popupForm.reset();
    //this.insideForm.reset();
    $('#editProj').modal('hide');
  }
}
