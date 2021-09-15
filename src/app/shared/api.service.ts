import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postStudent(data : any){
    
    return this.http.post<any>("http://localhost:80/API-Student-PHP/model/api/createStudent.php",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getStudent(page, limit){
    let params = new HttpParams()
    .set('page', page)
    .set('limit', limit);

    return this.http.get<any>("http://localhost:80/API-Student-PHP/model/api/read.php",{params})
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateStudent(data : any, id : number ){
    return this.http.put<any>("http://localhost:80/API-Student-PHP/model/api/updateStudent.php?id="+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteStudent( id : number ){
    return this.http.get<any>("http://localhost:80/API-Student-PHP/model/api/deleteStudent.php?id="+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postClass(data : any){
    
    return this.http.post<any>("http://localhost:80/API-Student-PHP/model/api/createClass.php",data,)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getClass(){
    return this.http.get<any>("http://localhost:80/API-Student-PHP/model/api/readClass.php")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateClass(data : any, id : number ){
    return this.http.put<any>("http://localhost:80/API-Student-PHP/model/api/updateClass.php?id="+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteClass( id : number ){
    return this.http.get<any>("http://localhost:80/API-Student-PHP/model/api/deleteClass.php?id="+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
