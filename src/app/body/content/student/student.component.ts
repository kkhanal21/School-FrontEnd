import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from "./student.service";
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @ViewChild('f') form: any;

  students: any = [];

  formTitle: String = "";

  isNewForm: boolean;

  model: any = {
    studentId: "",
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    status: '',
    gender: '',
    _class: '',
    street: '',
    city: '',
    username: ''
  }
  limit: number = 10;
  pageNo: number = 1;
  totalItems: number;


  scrollContainer: any;
  // constructor(private studentService: StudentService) { }

  constructor(private service: StudentService) { }


  ngOnInit() {
    this.scrollContainer = $('.scrollable').perfectScrollbar({
      wheelPropagation: true,
      suppressScrollX: true,
      includePadding: true
    });
    this.getStudents();
    this.initEditable();
    // Or data-backdrop="static" and $('#messagebox-modal').modal('show');
  }
  getStudents() {
    this.service._getAll(this.pageNo, this.limit).subscribe(data => { this.students = data.json() });
  }

  deleteExam(student) {

    this.service._delete(student.studentId).subscribe(data => {
      //find the student by exam id in the above student array and remove it.
      this.students.splice(this.students.indexOf(student), 1);
      this.reset();
    });
  }

  initEditable() {
    (function ($) {
      'use strict'; var nEditing = null; var oTable; function restoreRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow); var jqTds = $('>td', nRow); for (var i = 0, iLen = jqTds.length; i < iLen; i++) { oTable.fnUpdate(aData[i], nRow, i, false); }
        oTable.fnDraw();
      }
      function editRow(oTable, nRow) { var aData = oTable.fnGetData(nRow); var jqTds = $('>td', nRow); jqTds[0].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[0] + '\'>'; jqTds[1].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[1] + '\'>'; jqTds[2].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[2] + '\'>'; jqTds[3].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[3] + '\'>'; jqTds[4].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[4] + '\'>'; jqTds[5].innerHTML = '<a class=\'edit\' href=\'\'>Save</a>'; }
      function saveRow(oTable, nRow) {
        var jqInputs = $('input', nRow); oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
        oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
        oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
        oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
        oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
        oTable.fnUpdate('<a class=\'edit\' href=\'\'>Edit</a>', nRow, 5, false); oTable.fnDraw();
      }
      oTable = $('#table').dataTable();
      //  $('.toolbar').append('<a id=\'new\' href=\'javascript:;\' class=\'btn btn-info mb15 ml15\'>Add new row</a>');
      $('#new').on('click', function (e) { e.preventDefault(); var aiNew = oTable.fnAddData(['', '', '', '', '', '<a class=\'edit\' href=\'\'>Edit</a>', '<a class=\'delete\' href=\'\'>Delete</a>']); var nRow = oTable.fnGetNodes(aiNew[0]); editRow(oTable, nRow); nEditing = nRow; }); $('.datatable').on('click', 'a.delete', function (e) { e.preventDefault(); var nRow = $(this).parents('tr')[0]; oTable.fnDeleteRow(nRow); }); $('.datatable').on('click', 'a.edit', function (e) {
        e.preventDefault(); var nRow = $(this).parents('tr')[0]; if (nEditing !== null && nEditing !== nRow) { restoreRow(oTable, nEditing); editRow(oTable, nRow); nEditing = nRow; } else if (nEditing === nRow && this.innerHTML === 'Save') { saveRow(oTable, nEditing); nEditing = null; } else { editRow(oTable, nRow); nEditing = nRow; }
        return false;
      });
    })(jQuery);
  }

  showEditForm(student) {
    if (!student) {
      return;
    }
    if (student.gender === "female") {
      this.model.genderId = "2";
    }
    this.model.genderId = "1";

    this.isNewForm = false;
    this.model = student;
    this.formTitle = "Edit exam."
    $(".bs-modal-sm").modal("show");
  }
  showAddForm() {
    //reset the form if there is data in the array
    if (this.students.length) {
      this.model = {};
      this.reset();
    }
    this.model.genderId = "1";
    this.isNewForm = true;
    this.formTitle = "Add students";

    $(".bs-modal-sm").modal("show");

  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isNewForm) {
        // console.log(this.model);
        // this.students.unshift(this.model);

        this.service._save(this.model).subscribe(res => {
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

          this.students.push(res.json());
        });
      } else {
        console.log("Update method : " + this.model);
        this.service._update(this.model.examId, this.model).subscribe();
      }

      $(".bs-modal-sm").modal("hide");
    }
  }
  reset() {
    this.model = {
      studentId: "",
      firstName: '',
      lastName: '',
      email: '',
      contactNo: '',
      status: '',
      gender: '',
      _class: '',
      street: '',
      city: '',
      username: ''
    }
    this.form.reset();
  }

  modal() {
    $('#messagebox-modal').modal({ backdrop: 'static' }, 'show').fullscreen();
  }

}
