import { Component, ViewChild, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { TeacherService } from './teacher.service';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  //to display the loader animation
  load: boolean = false;
  //message to display
  noData: boolean = false;
  //references the form 
  //see form opening tag
  @ViewChild('f') form: any;
  //teacher arraylist 
  teachers: any = [];
  //define form title
  formTitle: String = "";

  isNewForm: boolean;
  //this is binded to the form input fields
  model: any = {
    firstName: '',
    lastName: '',
    genderId: '',
    contactNo: '',
    email: '',
    username: '',
    socialLink: '',
    city: '',
    street: ''
  }
  limit: number = 10;
  pageNo: number = 1;
  totalItems: number;
  scrollContainer: any;

  //import teacher service and inject in constructor
  //it is a simple class that extends httpService class 
  //which is inside the helper folder please check
  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.load = true;
    this.scrollContainer = $('.scrollable').perfectScrollbar({
      wheelPropagation: true,
      suppressScrollX: true,
      includePadding: true
    });
    this.getTeachers();
    // this.initEditable();  
  }

  //get all teachers
  //the teacher service class inherits the get post put and delete
  //method from the extended httpService class
  getTeachers() {
    this.teacherService.get('teachers?page=' + this.pageNo + '&limit=' + this.limit).subscribe(data => { this.teachers = data.json().data; this.load = false; if (data.json().data.length === 0) { this.noData = true }; this.totalItems = data.json().totalItems; });
  }
  //delete the teacher
  deleteTeacher(teacher) {

    this.teacherService.delete('teachers', teacher.teacherId).subscribe(data => {
      //find the teacher by teacher id in the above teacher array and remove it.
      this.teachers.splice(this.teachers.indexOf(teacher), 1);
      this.reset();
    });
  }

  // initEditable() {
  //   (function ($) {
  //     'use strict'; var nEditing = null; var oTable; function restoreRow(oTable, nRow) {
  //       var aData = oTable.fnGetData(nRow); var jqTds = $('>td', nRow); for (var i = 0, iLen = jqTds.length; i < iLen; i++) { oTable.fnUpdate(aData[i], nRow, i, false); }
  //       oTable.fnDraw();
  //     }
  //     function editRow(oTable, nRow) { var aData = oTable.fnGetData(nRow); var jqTds = $('>td', nRow); jqTds[0].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[0] + '\'>'; jqTds[1].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[1] + '\'>'; jqTds[2].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[2] + '\'>'; jqTds[3].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[3] + '\'>'; jqTds[4].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[4] + '\'>'; jqTds[5].innerHTML = '<a class=\'edit\' href=\'\'>Save</a>'; }
  //     function saveRow(oTable, nRow) {
  //       var jqInputs = $('input', nRow); oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
  //       oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
  //       oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
  //       oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
  //       oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
  //       oTable.fnUpdate('<a class=\'edit\' href=\'\'>Edit</a>', nRow, 5, false); oTable.fnDraw();
  //     }
  //     oTable = $('#table').dataTable();
  //     //  $('.toolbar').append('<a id=\'new\' href=\'javascript:;\' class=\'btn btn-info mb15 ml15\'>Add new row</a>');
  //     $('#new').on('click', function (e) { e.preventDefault(); var aiNew = oTable.fnAddData(['', '', '', '', '', '<a class=\'edit\' href=\'\'>Edit</a>', '<a class=\'delete\' href=\'\'>Delete</a>']); var nRow = oTable.fnGetNodes(aiNew[0]); editRow(oTable, nRow); nEditing = nRow; }); $('.datatable').on('click', 'a.delete', function (e) { e.preventDefault(); var nRow = $(this).parents('tr')[0]; oTable.fnDeleteRow(nRow); }); $('.datatable').on('click', 'a.edit', function (e) {
  //       e.preventDefault(); var nRow = $(this).parents('tr')[0]; if (nEditing !== null && nEditing !== nRow) { restoreRow(oTable, nEditing); editRow(oTable, nRow); nEditing = nRow; } else if (nEditing === nRow && this.innerHTML === 'Save') { saveRow(oTable, nEditing); nEditing = null; } else { editRow(oTable, nRow); nEditing = nRow; }
  //       return false;
  //     });
  //   })(jQuery);
  // }

  showEditForm(teacher) {
    if (!teacher) {
      return;
    }
    if (teacher.gender === "female") {
      this.model.genderId = "2";
    }
    this.model.genderId = "1";
    this.isNewForm = false;
    this.model = teacher;
    this.formTitle = "Edit teacher."
    $(".bs-modal-sm").modal("show");
  }


  showAddForm() {

    // $('.scrollable').perfectScrollbar({
    //   wheelPropagation: true,
    //   suppressScrollX: true,
    //   includePadding: true
    // }).perfectScrollbar('update');    
    //reset the form if there is data in the array
    if (this.teachers.length) {
      this.reset();
    }
    this.model.genderId = "1";
    this.isNewForm = true;
    this.formTitle = "Add teacher";

    $(".bs-modal-sm").modal("show");

  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isNewForm) {
        //form values are available here        
        this.teacherService.post('teachers', this.model).subscribe(res => {
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

          this.teachers.unshift(data);
        });
      } else {
        console.log("Update method : " + this.model);
        this.teacherService.put('teachers/', this.model.teacherId, this.model).subscribe();
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
      email: '',
      socialLink: '',
      city: '',
      street: ''
    }
    this.form.reset();
  }

  //triggers on pagination button clicked
  pageChange(e) {
    this.load = true;
    this.pageNo = e;
    this.getTeachers();
  }

}
