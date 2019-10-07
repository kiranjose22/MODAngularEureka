import { Injectable } from '@angular/core';
import {users} from './users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdduserService {

  constructor(private http: HttpClient) { }

  //users = [];

  addNew(user) {
    console.log(user);
    users.push(user);
    this.http.post("/api/user/users",user).subscribe();
    console.log(users);
  }
  addNewMentor(user) {
    console.log(user);
    users.push(user);
    this.http.post("/api/mentor/mentors",user).subscribe();
    console.log(users);
  }

  getItems() {
    users;
  }
}
