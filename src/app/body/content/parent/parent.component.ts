import { Component, OnInit, ViewChild } from '@angular/core';
import { ParentService } from "./parent.service";
import { FormsModule, FormGroup, FormControl } from "@angular/forms";
declare var $: any;

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  //references the form 
  //see form opening tag
  @ViewChild('f') form: any;
  //parent arraylist 
  parents: any = [];
  //define form title
  formTitle: String = "";

  isNewForm: boolean;
  //this is binded to the form input fields
  model: any = {
    firstName: '',
    lastName: '',
    genderId: '',
    contactNo: '',
    username: '',
    socialLink: '',
    city: '',
    street: ''
  }

  scrollContainer: any;
  limit: number = 10;
  pageNo: number = 1;

  //import parent service and inject in constructor
  //it is a simple class that extends httpService class 
  //which is inside the helper folder please check
  constructor(private service: ParentService) { }

  ngOnInit() {
    this.scrollContainer = $('.scrollable').perfectScrollbar({
      wheelPropagation: true,
      suppressScrollX: true,
      includePadding: true
    });
    this.getParents();
    // this.initEditable();  
  }

  //get all parents
  //the parent service class inherits the get post put and delete
  //method from the extended httpService class
  getParents() {
    this.service._getAll(this.pageNo, this.limit).subscribe(data => { this.parents = data.json().data });
  }
  //delete the parent
  deleteParent(parent) {

    this.service._delete(parent.parentId).subscribe(data => {
      //find the teacher by teacher id in the above teacher array and remove it.
      this.parents.splice(this.parents.indexOf(parent), 1);
      this.reset();
    });
  }



  showEditForm(parent) {
    if (!parent) {
      return;
    }
    if (parent.gender === "female") {
      this.model.genderId = "2";
    }
    this.model.genderId = "1";
    this.isNewForm = false;
    this.model = parent;
    this.formTitle = "Edit Parent."
    $(".bs-modal-sm").modal("show");
  }


  showAddForm() {

    // $('.scrollable').perfectScrollbar({
    //   wheelPropagation: true,
    //   suppressScrollX: true,
    //   includePadding: true
    // }).perfectScrollbar('update');    
    //reset the form if there is data in the array
    if (this.parents.length) {
      this.reset();
    }
    this.model.genderId = "1";
    this.isNewForm = true;
    this.formTitle = "Add parent";

    $(".bs-modal-sm").modal("show");

  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isNewForm) {
        //form values are available here        
        this.service._save(this.model).subscribe(res => {
          //res.json().gender = "asdadf";
          let data = res.json();
          if (res.json().genderId == 1) {
            data.gender = "Male";
          }
          if (res.json().genderId == 2) {
            data.gender = "Female";
          }
          if (res.json().genderId == 3) {
            data.gender = "Others";
          }

          console.log("response", data);

          this.parents.unshift(data);
        });
      } else {
        console.log("Update method : " + this.model);
        this.service._update(this.model.parentId, this.model).subscribe();
      }

      $(".bs-modal-sm").modal("hide");
    }
  }

  reset() {
    this.model = {
      firstName: '',
      lastName: '',
      genderId: '',
      contactNo: '',
      username: '',
      socialLink: '',
      city: '',
      street: ''
    }
    this.form.reset();
  }


}








