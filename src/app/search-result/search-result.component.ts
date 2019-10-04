import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginprocessService } from '../loginprocess.service';
import { DataReaderService } from '../data-reader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchForm
  searchData
  loggedin
  public query = "Spring Boot"

  constructor(
    private loginProcess: LoginprocessService,
    private dataReader: DataReaderService,
    private route: Router
  ) {
    //todo
    this.searchForm = new FormGroup({

      course: new FormControl(''),

      time: new FormControl('')
    });
    this.dataReader.getJSON('results').subscribe(data => {
      console.log(data);
      this.searchData = data
    });

  }

  ngOnInit() {

    this.loggedin = this.loginProcess.loggedin;
  }
  propose() {
    if(!this.loggedin)
      this.route.navigate(['/login']);
  }



}
