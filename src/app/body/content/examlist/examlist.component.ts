import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ExamlistService } from "./examlist.service";
import { ClassManageService } from '../class-manage/class-manage.service';
import { ExamTypeService } from '../exam-type/exam-type.service';
import { SubjectService } from '../subject/subject.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-examlist',
  templateUrl: './examlist.component.html',
  styleUrls: ['./examlist.component.css']
})
export class ExamlistComponent implements OnInit {
  //to display the loader animation
  load: boolean = false;
  //message to display
  noData: boolean = false;
  // flag to set the selected class button to active
  selectedIndex: any;
  //set the default selected class
  selectedClass: any;
  //references the form 
  //see form opening tag
  @ViewChild('f') form: any;
  //exam arraylist 
  examTypes: any = [];
  exams: any = [];
  subjects: any = [];
  //to set the exam type {first term,seconde term ,etc}
  selectedExamType: any = {};
  //to set the subject in the modal pop up 
  selectedSubject: any = {};
  //define form title
  formTitle: String = "";
  //flag to check if form in the modal is new or not
  isNewForm: boolean;
  //this is binded to the form input fields
  model: any = {
    subjectId: '',
    examDate: '',
    fullMark: '',
    passMark: '',
    classId: '',
    examTypeId: ''
  }
  //array to load all the classes
  classes: any = [];
  limit: number = 10;
  pageNo: number = 1;


  //import exam service and inject in constructor
  //it is a simple class that extends httpService class 
  //which is inside the helper folder please check
  constructor(private examListService: ExamlistService, private classService: ClassManageService, private examService: ExamTypeService, private subjectService: SubjectService) { }

  ngOnInit() {
    this.load = true;
    this.classService.getAll(this.pageNo, this.limit).subscribe(res => { this.classes = res.json().data; this.selectedClass = res.json().data[0] });
    this.examService._getAll(1,100).subscribe(res => { this.examTypes = res.json().data; this.selectedExamType.examTypeId = res.json().data[0].examTypeId; });
    //this.selectedExamType.examTypeId = -1;

    setTimeout(() => {
      this.getExams(); // <-- wait a bit to load all the above calls
    }, 2000);
    this.subjectService.getAll().subscribe(res => { this.subjects = res.json().data });
    this.selectedIndex = 0; //<-- set default class button index to set as active
  }
  getExams() {
    this.noData = false;
    //get the exam data depending upon the exam type and class
    this.examListService.get('exams/' + this.selectedExamType.examTypeId + '/class/' + this.selectedClass.classId)
      .subscribe(res => { this.exams = res.json(), this.load = false; if (res.json().length === 0) { this.noData = true } });
  }
  //delete the exam
  deleteExam(exam) {

    this.examListService.deleteExamList(exam.examId).subscribe(data => {  // <-- preform delete http action
      //find the exam by exam id in the above exam array and remove it.
      this.exams.splice(this.exams.indexOf(exam), 1);
      this.reset();
    });
  }

  //triggers by either pressing add button or edit button
  showEditForm(exam) {
    if (!exam) {
      return;
    }
    console.log(exam);
    this.isNewForm = false;
    this.model = exam;
    this.formTitle = "Edit exam." // <-- set form title
    $(".bs-modal-sm").modal("show"); // <-- display the modal form
  }

  showAddForm() {
    //reset the form if there is data in the array
    if (this.exams.length) {
      //this.model = {};
      this.reset();
    }
    this.model.subjectId = -1; // <-- set subject default value
    this.isNewForm = true;
    this.formTitle = "Add exam"; // <-- set form title

    $(".bs-modal-sm").modal("show"); // <-- display the modal form

  }

  /**
   * this is called when user presses the submit button on the form
   * same logic of trigger modal can be applied for inserting or  
   * updating the data  
   */
  onSubmit() {
    if (this.form.valid) { // <-- check if the form is valid or not
      if (this.isNewForm) { // <-- check if the form flag is new  or not and perform post or put http calls
        // console.log(this.model);
        // this.exams.unshift(this.model);        
        this.model.classId = this.selectedClass.classId; // <-- set required dto attributes
        this.model.subjectId = this.selectedSubject.subjectId; // <-- set required dto attributes
        this.model.examTypeId = this.selectedExamType.examTypeId; // <-- set required dto attributes
        console.log('model :', this.model);
        this.examListService.post('exams', this.model).subscribe(res => { // <-- perform the post http action
          let response = res.json(); // <-- create model to push to array
          response.subject = this.selectedSubject.subjectName; // <-- set the required attributes to push into the array
          this.exams.unshift(response);
        });
      } else {
        this.model.subjectId = this.selectedSubject.subjectId;
        console.log("Update method : " , this.model);
        this.examListService.put('exams/', this.model.examId, this.model).subscribe(); // <-- perform the update http calls
      }

      $(".bs-modal-sm").modal("hide"); // <-- dispose the modal
    }
  }
  //reset the form data and form validations
  reset() {
    this.model = {
      subjectId: '',
      examDate: '',
      fullMark: '',
      passMark: '',
      classId: '',
      examTypeId: ''
    }
    this.form.reset({ "subjectId": -1 }); // <- set the default field value like this
  }

  //triggers on the subject drop down change event and sets the selected subject for post method
  onSubChange(val) {
    this.selectedSubject = val;    
    this.selectedSubject.subjectName = val.subjectName;    
    console.log(this.selectedSubject);
  }
  //triggers on the exam drop down change event and fetches the appropriate data
  onChange(val) {
    this.load = true;
    this.selectedExamType.examTypeId = val;
    this.getExams(); // <-- get the data on change detection    
  }

  //triggers on the class button click events
  getExamListByClass(c, i) {
    this.load = true;
    // console.log(e);
    // $(this).siblings().removeClass('active'); // if you want to remove class from all sibling buttons
    // $(this).toggleClass('active');
    console.log(this.selectedExamType);
    this.selectedClass = c; // <-- set the selected class for post method 
    this.selectedIndex = i; // <-- set the selected index to mark the clicked button active
    this.getExams(); // <-- get the data on click detection    
  }
}
