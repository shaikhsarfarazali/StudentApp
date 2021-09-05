import { Component, OnInit } from '@angular/core';

/*
Using ActivatedRoute for accessing data 
that is coming from student.page 
and Using Router for navigation purpose
*/
import { ActivatedRoute, Router } from '@angular/router';

// importing api endpint
import { API_ENDPOINT } from 'src/services/config';

// Service used for calling getrequest method
import { GetData } from 'src/services/GetData';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],

})
export class StudentDetailPage implements OnInit {

  studentDetail: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private getData: GetData) { }

  ngOnInit() {

    /* using snapshort to get student id 
    that is coming from student.page
    */

    let id = JSON.parse(this.route.snapshot.paramMap.get('id'));

    /* Passing that id in our function that 
    will fetch single student data
    */
    if (id) {
      this.getSingleStudent(id);
    }

    /* if there is no student id redirect 
    user to student listing page
    */
    else {
      this.router.navigate(['student']);
    }

  }

  getSingleStudent(id) {

    /* fetching student data as per id
    */
    this.getData.getDataFromApi(API_ENDPOINT.studentList, { id: id }).subscribe((data) => {

      /* if data is not empty
      store it in studentDetail object
      */
      if (data) {
        this.studentDetail = data[0];
      }

      /* if data is empty redirect
      user to student listing page
      */
      else{
        this.router.navigate(['student']);
      }
    }, 
    /* if there is some error occur while 
    calling api show proper error message
    */
    (error) => {
      console.log('error', error);
    });
  }
}
