import { Component, OnInit } from '@angular/core';
import { LoginprocessService } from '../loginprocess.service';
import { DataReaderService } from '../data-reader.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  currentUser
  loggedin
  users
  mentors
  constructor(private loginProcess: LoginprocessService,
    // private navbar: NavbarComponent
    private dataReader: DataReaderService,
    private route: Router,
    private http: HttpClient) { 

      this.dataReader.getJSON('user/users').subscribe(data => {
        console.log(data);
        this.users = data
      });
      this.dataReader.getJSON('mentor/mentors').subscribe(data => {
        console.log(data);
        this.mentors = data
      });

    }

  ngOnInit() {
    this.currentUser = this.loginProcess.getCurrentUser();
    this.loggedin = this.loginProcess.loggedin;
    if (!this.loggedin)
      this.route.navigate(['/admin']);
  }

  blockUser(user) {
    console.log(user);
    this.http.get("/api/"+"admin/blockuser/"+user).subscribe();
  }

}
