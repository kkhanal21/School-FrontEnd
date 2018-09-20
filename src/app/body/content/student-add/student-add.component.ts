import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { StudentAddService } from "./student-add.service";
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  @ViewChild('f') form: any;

  // students: any = [];

  // formTitle: String = "";

  // isNewForm: boolean;

  model: any = {
    // studentId:"",
    // firstName: '',
    // lastName: '',
    // address:'',
    // email:'',
    // parent:{
    //   parentId:'',
    //   fatherName:'',
    //   motherName:'',
    //   guardianName:'',
    //   fatherContactNo:'',
    //   motherContactNo:'',
    //   guardianContactNo:'',
    //   address:''
    // }

  }


  constructor(private studentService: StudentAddService) { }
  ngOnInit() {
    // this.getStudents();
  }
  // getStudents() {
  //   this.studentService.get('students').subscribe(data => { this.students = data.json() });
  // }

}
