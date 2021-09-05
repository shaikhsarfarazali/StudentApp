import { Component, OnInit } from '@angular/core';

// router for navigation
import { Router } from '@angular/router';

// importing api endpint
import { API_ENDPOINT } from 'src/services/config';

// Service used for calling getrequest method
import { GetData } from 'src/services/GetData';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  students:any=[];
  StudentName:any;
  offset:any=0;

  constructor(
    private getData:GetData,
    private router:Router) { }

  ngOnInit() {
    // on page load calling studentlist function
    this.studentList();
  }

  studentList(offset=null){

    /* 
    filter variable is used for filtering
     data based on user requirements
    */

    let filter = {};
    if(offset){
      filter['offset'] = offset;
    }

    /* calling get api method mention 
    in GetData service 
    */
    this.getData.getDataFromApi(API_ENDPOINT.studentList,filter).subscribe((data)=>{
      
      /* Checking if response coming 
      from api is empty or not
      */

      if(data){
        for (let i = 0; i < Object.keys(data).length; i++) {
          const elem = data[i];

          /* Pushing elements one by 
          one in students array */

          this.students.push(elem);
        }  
      }
    });
  }

  /* calling ionic method for 
  pull to refresh functionality
  */

  doRefresh(event) {
    setTimeout(() => {
      this.students = [];
      this.offset=0;
      if(this.students){
         this.studentList();
      }
      event.target.complete();
    }, 1000);
  }

  /* function for load data in chunks
  */

  loadData(event) {
    setTimeout(() => {
      event.target.complete();

      /* Incrementing offset by 10
      */
      this.offset = parseInt(this.offset)+parseInt('10');

      /* passing offset in our studentList 
      functiom in order to get next 10 responses
      */

      this.studentList(this.offset);

      /* App logic to determine if all data is loaded
       and disable the infinite scroll
      */
     
       if (this.students.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  /* studentDetail function calls on click 
  of single student that will redirect to student
  detail page with student_id
  */
  studentDetail(id){
    this.router.navigate(['student-detail',{id:JSON.stringify(id)}]);
  }
}
