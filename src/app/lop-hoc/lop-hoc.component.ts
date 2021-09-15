import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Validators } from '@angular/forms';
import { LopHoc } from './LopHoc.model';
@Component({
  selector: 'app-lop-hoc',
  templateUrl: './lop-hoc.component.html',
  styleUrls: ['./lop-hoc.component.css']
})
export class LopHocComponent implements OnInit {

  formValue !: FormGroup;
  classObj : LopHoc  = new LopHoc();
  classData !:any;
  submitted = false;
  // lopHocObj : LopHoc  = new LopHoc();
  // lopHocArr !:any;
  constructor(private formbuilder : FormBuilder, private api : ApiService, )  { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      // LopHoc_id :[''],
      tenlop : ['', Validators.required],
      // lastName : ['',   [
      //   Validators.required,
      //   Validators.minLength(6),
      //   Validators.maxLength(20)
      // ]],
      // email : [''],
      // mobile : ['',Validators.required],
      descrip : [''],
   
    })
    this.getAllClass();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formValue.controls;
  }
  addItem(){
    this.formValue.reset();
  }
  onSubmit(): void{
    this.submitted = true;
   
    if (this.formValue.invalid) {

      return ;
    }
  
    console.log(JSON.stringify(this.formValue.value, null, 2));
     
  }
  postClass(){
    this.classObj.tenlop = this.formValue.value.tenlop;
    this.classObj.descrip =  this.formValue.value.descrip;
    this.api.postClass(this.classObj)
      .subscribe(res=>{
        console.log(res);
        
        alert("Class added successfully !");
        let ref= document.getElementById("cancel");
        ref?.click();
        
        this.formValue.reset();
        this.getAllClass();
      },
      err=>{
        alert("Something went wrong !")
      }
      
      )
    ;

  
  }
 
  getAllClass(){
    this.api.getClass()
    .subscribe(res=>{
      this.classData = res['listClass'];
      // this.lopHocArr = res['listLopHoc'];
      // console.log(this.lopHocArr);
      console.log(res);
    },
    err=>{
      alert("Something went wrong !")
    }
    
    )
  }
  onRow(row : any){
    this.classObj.id = row.id;
    this.formValue.controls['tenlop'].setValue(row.tenlop);
    this.formValue.controls['descrip'].setValue(row.descrip);
}
  updateClass(){
    // this.classObj.LopHoc_id =  this.formValue.value.LopHoc_id;
    this.classObj.tenlop = this.formValue.value.tenlop;
    this.classObj.descrip =  this.formValue.value.descrip;
    this.api.updateClass(this.classObj,this.classObj.id)
      .subscribe(res=>{
        console.log(res);
        alert("Class updated successfully !");
        let ref= document.getElementById("cancel1");
        ref?.click();
        this.formValue.reset();
        this.classObj.id = null;
        this.getAllClass();
      },
      err=>{
        alert("Something went wrong !")
      }
      
      )
    ;
  }

  deleteClass(row : any){
    this.api.deleteClass(row.id)
    .subscribe(res=>{
      console.log(res);
      alert("Class has been deleted !");
      this.getAllClass();
    },
    err=>{
      alert("Something went wrong !")
    }
    
    )
  }


}
