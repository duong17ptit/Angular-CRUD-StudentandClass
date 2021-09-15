// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
// import { EmployeeModel } from './employee.model';
// import { ApiService } from '../shared/api.service';
// import { Validators } from '@angular/forms';
// import { LopHoc } from '../lop-hoc/LopHoc.model';
// import { analyzeAndValidateNgModules } from '@angular/compiler';
// import { newArray } from '@angular/compiler/src/util';
// @Component({
//   selector: 'app-employee-dashboard',
//   templateUrl: './employee-dashboard.component.html',
//   styleUrls: ['./employee-dashboard.component.css'],
// })
// export class EmployeeDashboardComponent implements OnInit {
//   //--lastname for searching
//   lastName : any;
//   //--lastname for searching
//   isDesc: Boolean = false;
//   formValue!: FormGroup;
//   employeeObj: EmployeeModel = new EmployeeModel();
//   employeeData!: any;
//   submitted = false;
//   lopHocObj: LopHoc = new LopHoc();
//   lopHocArr!: any;
//   current_page: number = 1;
//   limit: number = 7;
//   datasend :any;
//   page : number;
//   pageList= new Array();
//   // p : number = 1;
//   constructor(private formbuilder: FormBuilder, private api: ApiService) {}

//   ngOnInit(): void {
//     this.formValue = this.formbuilder.group({
//       LopHoc_id: [''],
//       firstName: ['', Validators.required],
//       lastName: [
//         '',
//         [
//           Validators.required,
//           Validators.minLength(6),
//           Validators.maxLength(20),
//         ],
//       ],
//       email: [''],
//       mobile: ['', Validators.required],
//       salary: [''],
//     });
//     this.getAllEmployee(1);
//     // this.lopHocArr;
//   }
//   get f(): { [key: string]: AbstractControl } {
//     return this.formValue.controls;
//   }
//   addItem() {
//     this.formValue.reset();
//   }
//   onSubmit(): void {
//     this.submitted = true;

//     if (this.formValue.invalid) {
//       return;
//     }

//     console.log(JSON.stringify(this.formValue.value, null, 2));
//   }

//   Search(){
//     if(this.lastName == ""){
//       this.getAllEmployee(1);
//     } else{
//       this.employeeData =  this.employeeData.filter(res =>{
//         return res.lastName.toLocaleLowerCase().match(this.lastName.toLocaleLowerCase());
//       })
//     }

//   }
//   sortName(property){
//     this.isDesc = !this.isDesc;
//     let direction = this.isDesc ? 1 : -1;
//     this.employeeData.sort(function(a,b){
//       if(a[property] < b[property]){
//         return -1 * direction;
//       }
//       else if(a[property] > b[property]){
//         return 1 * direction; 
//       }
//       else {
//         return 0;
//       }
//     });
//   }
//   postEmployee() {
//     this.employeeObj.LopHoc_id = this.formValue.value.LopHoc_id;
//     this.employeeObj.firstName = this.formValue.value.firstName;
//     this.employeeObj.lastName = this.formValue.value.lastName;
//     this.employeeObj.email = this.formValue.value.email;
//     this.employeeObj.mobile = this.formValue.value.mobile;
//     this.employeeObj.salary = this.formValue.value.salary;
//     this.api.postEmployee(this.employeeObj).subscribe(
//       (res) => {
//         console.log(res);

//         alert('Employee added successfully !');
//         let ref = document.getElementById('cancel');
//         ref?.click();

//         this.formValue.reset();
//         this.getAllEmployee(1);
//       },
//       (err) => {
//         alert('Something went wrong !');
//       }
//     );
//   }

//   getAllEmployee(page) {
//     let that = this;
//     if (page) {
//       that.current_page = page;
//     }
//     // this.datasend = {
//     //     limit : that.limit,
//     //     page: that.current_page,

//     // }
   
//     this.api.getEmployee(that.current_page,that.limit).subscribe(
//       (res) => {
//         this.employeeData = res['listEmployee'];
//         this.lopHocArr = res['listLopHoc'];
//         var page_number = Math.ceil(res['total'] / that.limit);
//         that.pageList = [];
//         for (var i = 1; i <= page_number; i++) {
//             that.pageList.push(i);
//         }
//         console.log(this.lopHocArr);
//         console.log(res);
//       },
//       (err) => {
//         alert('Something went wrong !');
//       }
//     );
//   }
//   deleteEmployee(row: any) {
//     this.api.deleteEmployee(row.id).subscribe(
//       (res) => {
//         console.log(res);
//         alert('Employee has been deleted !');
//         this.getAllEmployee(this.current_page);
//       },
//       (err) => {
//         alert('Something went wrong !');
//       }
//     );
//   }
//   onRow(row: any) {
//     this.employeeObj.id = row.id;
//     this.formValue.controls['LopHoc_id'].setValue(row.LopHoc_id);
//     this.formValue.controls['firstName'].setValue(row.firstName);
//     this.formValue.controls['lastName'].setValue(row.lastName);
//     this.formValue.controls['email'].setValue(row.email);
//     this.formValue.controls['mobile'].setValue(row.mobile);
//     this.formValue.controls['salary'].setValue(row.salary);
//   }
//   updateEmployee() {
//     this.employeeObj.LopHoc_id = this.formValue.value.LopHoc_id;
//     this.employeeObj.firstName = this.formValue.value.firstName;
//     this.employeeObj.lastName = this.formValue.value.lastName;
//     this.employeeObj.email = this.formValue.value.email;
//     this.employeeObj.mobile = this.formValue.value.mobile;
//     this.employeeObj.salary = this.formValue.value.salary;
//     this.api.updateEmployee(this.employeeObj, this.employeeObj.id).subscribe(
//       (res) => {
//         console.log(res);
//         alert('Employee updated successfully !');
//         let ref = document.getElementById('cancel1');
//         ref?.click();
//         this.formValue.reset();
//         this.employeeObj.id = null;
//         this.getAllEmployee(this.current_page);
//       },
//       (err) => {
//         alert('Something went wrong !');
//       }
//     );
//   }
// }
