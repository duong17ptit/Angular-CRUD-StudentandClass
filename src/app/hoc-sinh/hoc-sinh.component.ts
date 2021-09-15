import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StudentModel } from './hocsinh.model';
import { ApiService } from '../shared/api.service';
import { Validators } from '@angular/forms';
import { LopHoc } from '../lop-hoc/LopHoc.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-hoc-sinh',
  templateUrl: './hoc-sinh.component.html',
  styleUrls: ['./hoc-sinh.component.css']
})
export class HocSinhComponent implements OnInit {

  //--lastname for searching
  lastName : any;
  //--lastname for searching
  isDesc: Boolean = false;
  formValue!: FormGroup;
  studentObj: StudentModel = new StudentModel();
  studentData!: any;
  submitted = false;
  lopHocObj: LopHoc = new LopHoc();
  lopHocArr!: any;
  current_page: number = 1;
  limit: number = 7;
  datasend :any;
  page : number;
  pageList= new Array();
  // p : number = 1;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      LopHoc_id: [''],
      firstName: ['', Validators.required],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      email: [''],
      mobile: ['', Validators.required],
      address: [''],
    });
    this.getAllStudent(1);
    // this.lopHocArr;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formValue.controls;
  }
  addItem() {
    this.formValue.reset();
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.formValue.invalid) {
      return;
    }

    console.log(JSON.stringify(this.formValue.value, null, 2));
  }

  Search(){
    if(this.lastName == ""){
      this.getAllStudent(1);
    } else{
      this.studentData =  this.studentData.filter(res =>{
        return res.lastName.toLocaleLowerCase().match(this.lastName.toLocaleLowerCase());
      })
    }

  }
  sortName(property){
    this.isDesc = !this.isDesc;
    let direction = this.isDesc ? 1 : -1;
    this.studentData.sort(function(a,b){
      if(a[property] < b[property]){
        return -1 * direction;
      }
      else if(a[property] > b[property]){
        return 1 * direction; 
      }
      else {
        return 0;
      }
    });
  }
  postStudent() {
    this.studentObj.LopHoc_id = this.formValue.value.LopHoc_id;
    this.studentObj.firstName = this.formValue.value.firstName;
    this.studentObj.lastName = this.formValue.value.lastName;
    this.studentObj.email = this.formValue.value.email;
    this.studentObj.mobile = this.formValue.value.mobile;
    this.studentObj.address = this.formValue.value.address;
    this.api.postStudent(this.studentObj).subscribe(
      (res) => {
        console.log(res);

        alert('Student added successfully !');
        let ref = document.getElementById('cancel');
        ref?.click();

        this.formValue.reset();
        this.getAllStudent(1);
      },
      (err) => {
        alert('Something went wrong !');
      }
    );
  }

  getAllStudent(page) {
    let that = this;
    if (page) {
      that.current_page = page;
    }
    // this.datasend = {
    //     limit : that.limit,
    //     page: that.current_page,

    // }
   
    this.api.getStudent(that.current_page,that.limit).subscribe(
      (res) => {
        this.studentData = res['listStudent'];
        this.lopHocArr = res['listLopHoc'];
        var page_number = Math.ceil(res['total'] / that.limit);
        that.pageList = [];
        for (var i = 1; i <= page_number; i++) {
            that.pageList.push(i);
        }
        console.log(this.lopHocArr);
        console.log(res);
      },
      (err) => {
        alert('Something went wrong !');
      }
    );
  }
  deleteStudent(row: any) {
    this.api.deleteStudent(row.id).subscribe(
      (res) => {
        console.log(res);
        alert('Student has been deleted !');
        this.getAllStudent(this.current_page);
      },
      (err) => {
        alert('Something went wrong !');
      }
    );
  }
  onRow(row: any) {
    this.studentObj.id = row.id;
    this.formValue.controls['LopHoc_id'].setValue(row.LopHoc_id);
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['address'].setValue(row.address);
  }
  updateStudent() {
    this.studentObj.LopHoc_id = this.formValue.value.LopHoc_id;
    this.studentObj.firstName = this.formValue.value.firstName;
    this.studentObj.lastName = this.formValue.value.lastName;
    this.studentObj.email = this.formValue.value.email;
    this.studentObj.mobile = this.formValue.value.mobile;
    this.studentObj.address = this.formValue.value.address;
    this.api.updateStudent(this.studentObj, this.studentObj.id).subscribe(
      (res) => {
        console.log(res);
        alert('Student updated successfully !');
        let ref = document.getElementById('cancel1');
        ref?.click();
        this.formValue.reset();
        this.studentObj.id = null;
        this.getAllStudent(this.current_page);
      },
      (err) => {
        alert('Something went wrong !');
      }
    );
  }

}
