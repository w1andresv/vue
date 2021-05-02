import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-page-not-fount',
  templateUrl: './page-not-fount.component.html',
  styleUrls: [ './page-not-fount.component.css' ]
} )
export class PageNotFountComponent implements OnInit {

  constructor( private router: Router, ) {
  }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate( [ '' ] );
  }
}
