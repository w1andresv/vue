import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component( {
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
} )
export class DashboardComponent implements OnInit {

  constructor( private router: Router,
               private appmain: AppComponent, ) {
  }

  ngOnInit() {
    const token = localStorage.getItem( 'token' );
    if ( token !== null ) {
      // this.appmain.setSession( true );
      // this.router.navigate( [ 'dashboard' ] );
    } else {
      this.router.navigate( [ 'login' ] );
    }
  }

}
