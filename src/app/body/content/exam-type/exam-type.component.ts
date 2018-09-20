import { Component, ViewChild, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { ExamTypeService } from './exam-type.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-exam-type',
  templateUrl: './exam-type.component.html',
  styleUrls: ['./exam-type.component.css']
})
export class ExamTypeComponent implements OnInit {

  //references the form 
  //see form opening tag
  @ViewChild('f') form: any;
  //teacher arraylist 
  examTypes: any = [];
  //define form title
  formTitle: String = "";

  isNewForm: boolean;
  //this is binded to the form input fields
  model: any = {
    examType: '',
    status: '',
  }

  scrollContainer: any;
  limit: number = 10;
  pageNo: number = 1;

  constructor(private service: ExamTypeService) { }

  ngOnInit() {
    this.scrollContainer = $('.scrollable').perfectScrollbar({
      wheelPropagation: true,
      suppressScrollX: true,
      includePadding: true
    });
    this.getExamtypes();
  }

  getExamtypes() {
    this.service._getAll(this.pageNo, this.limit).subscribe(data => { this.examTypes = data.json().data });
  }
  //delete the teacher
  deleteExamtypes(examType) {

    this.service._delete(examType.examTypeId).subscribe(data => {
      //find the teacher by teacher id in the above teacher array and remove it.
      this.examTypes.splice(this.examTypes.indexOf(examType), 1);
      this.reset();
    });
  }

  showEditForm(examType) {
    if (!examType) {
      return;
    }
    this.isNewForm = false;
    this.model.status = examType.status;
    this.model = examType;
    this.formTitle = "Edit Exam type."
    $(".bs-modal-sm").modal("show");
  }


  showAddForm() {

    // $('.scrollable').perfectScrollbar({
    //   wheelPropagation: true,
    //   suppressScrollX: true,
    //   includePadding: true
    // }).perfectScrollbar('update');    
    //reset the form if there is data in the array
    if (this.examTypes.length) {
      this.reset();
    }
    this.model.status = 'true';
    this.isNewForm = true;
    this.formTitle = "Add Exam type.";

    $(".bs-modal-sm").modal("show");

  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isNewForm) {
        //form values are available here        
        this.service.post('examtypes', this.model).subscribe(res => {
          //res.json().gender = "asdadf";          
          this.examTypes.unshift(res.json());
          this.reset();
        });
      } else {
        console.log("Update method : " + this.model);
        this.service.put('examtypes/', this.model.examTypeId, this.model).subscribe();
      }

      $(".bs-modal-sm").modal("hide");
    }
  }

  reset() {
    this.model = {
      examType: '',
      status: '',
    }
    this.form.reset();
  }
}
