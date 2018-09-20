import { Component, ViewChild, OnInit } from '@angular/core';
import { ClassManageService } from './class-manage.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-class-manage',
  templateUrl: './class-manage.component.html',
  styleUrls: ['./class-manage.component.css']
})
export class ClassManageComponent implements OnInit {
  //to display the loader animation
  load: boolean = false;
  //message to display
  noData: boolean = false;
  //references the form 
  //see form opening tag
  @ViewChild('f') form: any;
  //classes arraylist 
  classes: any = [];
  //define form title
  formTitle: String = "";

  isNewForm: boolean;
  //this is binded to the form input fields
  model: any = {
    className: '',   
  }
  limit: number = 10;
  pageNo: number = 1;
  totalItems: number;

  constructor(private service: ClassManageService) { }

  ngOnInit() {
    this.getClasses();
  }

  getClasses() {
    this.service.getAll(this.pageNo, this.limit).subscribe(data => { this.classes = data.json().data; this.load = false; if (data.json().data.length === 0) { this.noData = true }; this.totalItems = data.json().totalItems; });
  }
  //delete the class
  deleteClass(_class) {

    this.service.deleteClass(_class.classId).subscribe(data => {
      //find the class by class id in the above class array and remove it.
      this.classes.splice(this.classes.indexOf(_class), 1);
      this.reset();
    });
  }

  showEditForm(_class) {
    if (!_class) {
      return;
    }
    this.isNewForm = false;
    this.model = _class;
    this.formTitle = "Edit Class."
    $(".bs-modal-sm").modal("show");
  }


  showAddForm() {
    if (this.classes.length) {
      this.reset();
    }
    this.model.genderId = "1";
    this.isNewForm = true;
    this.formTitle = "Add class";

    $(".bs-modal-sm").modal("show");

  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isNewForm) {
        //form values are available here        
        this.service.saveClass(this.model).subscribe(res => {

          this.classes.unshift(res.json());
        });
      } else {
        console.log("Update method : " + this.model);
        this.service.updateClass(this.model.classId, this.model).subscribe();
      }

      $(".bs-modal-sm").modal("hide");
    }
  }

  reset() {
    this.model = {
      className: ''   
    }
    this.form.reset();
  }

  //triggers on pagination button clicked
  pageChange(e) {
    this.load = true;
    this.pageNo = e;
    this.getClasses();
  }


}
