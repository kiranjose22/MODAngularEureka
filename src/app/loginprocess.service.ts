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
  mentors
  admins
  constructor(private http: HttpClient, private dataReader: DataReaderService) {


    this.dataReader.getJSON('user/users').subscribe(data => {
      console.log(data);
      // console.log(typeof(data))
      this.users = data
    });
    this.dataReader.getJSON('mentor/mentors').subscribe(data => {
      console.log(data);
      this.mentors = data
    });
    this.dataReader.getJSON('admin/admins').subscribe(data => {
      console.log(data);
      this.admins = data
    });
    // this.users.push(this.trainees)
    // this.users = this.users + this.mentors
    // console.log(this.users)
    // console.log(typeof(this.users))
    // console.log(this.users)

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
    this.dataReader.getJSON('user/users').subscribe(data => {
      console.log(data);
      this.users = data
    });
    this.dataReader.getJSON('mentor/mentors').subscribe(data => {
      console.log(data);
      this.mentors = data
    });
    this.dataReader.getJSON('admin/admins').subscribe(data => {
      console.log(data);
      this.admins = data
    });
    // this.users = this.users + this.mentors
    // console.log(this.users)
  }
  authenticate(user) {
    this.flag = false;
    this.dataReader.getJSON('user/users').subscribe(data => {
      console.log(data);
      this.users = data
    });
    this.dataReader.getJSON('mentor/mentors').subscribe(data => {
      console.log(data);
      this.mentors = data
    });
    this.dataReader.getJSON('admin/admins').subscribe(data => {
      console.log(data);
      this.admins = data
    });
    // this.users = this.users + this.mentors
    // console.log(this.users)
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
    for (let i of this.mentors) {
      if (i.email === user.email && i.password === user.password && i.role === user.role) {
        console.log("Login success");
        this.flag = true;
        this.currentUser = i;
        console.log(this.currentUser)
        this.loggedin = true
        return true;
      }
    }
    for (let i of this.admins) {
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
