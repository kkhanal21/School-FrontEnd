import { Component, OnInit } from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery.getScript("../../assets/js/app.js");
  }


}
