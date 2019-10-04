import { Component, OnInit } from '@angular/core';
import { LoginprocessService } from '../loginprocess.service';
import { DataReaderService } from '../data-reader.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AdduserService } from '../adduser.service';

@Component({
  selector: 'app-trainermenu',
  templateUrl: './trainermenu.component.html',
  styleUrls: ['./trainermenu.component.css']
})
export class TrainermenuComponent implements OnInit {

  currentUser
  currentUserData
  completedUserData
  loggedin
  registrationForm
  public dpname 
  constructor(
    private loginProcess: LoginprocessService,
    // private navbar: NavbarComponent
    private dataReader: DataReaderService,
    private route: Router,
    private addUserService: AdduserService
  ) {

    this.dataReader.getJSON('completed-trainings.json').subscribe(data => {
      console.log(data);
      this.completedUserData = data
    });
    this.dataReader.getJSON('current-trainings.json').subscribe(data => {
      console.log(data);
      this.currentUserData = data
    });
    this.currentUser = this.loginProcess.getCurrentUser();
    this.dpname = this.currentUser.userName;
    this.registrationForm = new FormGroup({
      userName: new FormControl(this.currentUser.userName),
      email: new FormControl(this.currentUser.email),
      phone: new FormControl(this.currentUser.phone),
      password: new FormControl(this.currentUser.password),
      // newpassword: new FormControl(''),
      experience: new FormControl(this.currentUser.experience),
      timezone: new FormControl(this.currentUser.timezone),
      timeslot: new FormControl(this.currentUser.timeslot),

      linkedin: new FormControl(this.currentUser.linkedin),
      skills: new FormControl(this.currentUser.skills),
      videos: new FormControl(this.currentUser.videos),
      blogs: new FormControl(this.currentUser.blogs),
      ppts: new FormControl(this.currentUser.ppts),
      demos: new FormControl(this.currentUser.demos),
      startdate: new FormControl(this.currentUser.startdate),
      enddate: new FormControl(this.currentUser.enddate),

      role: new FormControl('mentor'),
      status: new FormControl(this.currentUser.status)
    });




  }

  ngOnInit() {


    this.currentUser = this.loginProcess.getCurrentUser();
    this.loggedin = this.loginProcess.loggedin;
    if (!this.loggedin)
      this.route.navigate(['/login']);
    // this.registrationForm.patchValue(this.currentUser);

  }
  addNew(user) {
    console.log(user);
    // window.alert('User added');
    this.addUserService.addNew(user);
    this.currentUser = this.loginProcess.getCurrentUser();
    // this.submitted = true;
  }


}
