import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataReaderService } from './data-reader.service';
// import { users } from './users';
import { EventEmitter } from 'events';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginprocessService {

  // public loginEvent = new EventEmitter()
  // isLoggedin:new BehaviorSubject<boolean>(false);
  users
  constructor(private http: HttpClient, private dataReader: DataReaderService) {


    this.dataReader.getJSON('users').subscribe(data => {
      console.log(data);
      this.users = data
    });

  }

  flag = false
  currentUser
  loggedin = false
 




  // users
  // this.http.get("/api/users").subscribe(data => {
  //   console.log(data);
  //   this.users = data
  // });
  update(){
    this.dataReader.getJSON('users').subscribe(data => {
      console.log(data);
      this.users = data
    });
  }
  authenticate(user) {
    this.flag = false;
    this.dataReader.getJSON('users').subscribe(data => {
      console.log(data);
      this.users = data
    });
    for (let i of this.users) {
      if (i.email === user.email && i.password === user.password && i.role === user.role) {
        console.log("Login success");
        this.flag = true;
        this.currentUser = i;
        console.log(this.currentUser)
        this.loggedin = true
        return true;
      }
    }
    if (!this.flag) {
      console.log("Login failed");
      this.loggedin = false;
      return false;
    }
  }
  getCurrentUser() {
    return this.currentUser;
  }
  logout() {
    this.flag = false
    this.currentUser = ''
    this.loggedin = false
  }
}
