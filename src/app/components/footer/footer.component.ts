import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component( {
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ]
} )
export class FooterComponent implements OnInit {

  version: string;
  autor: string;

  constructor( private appMain: AppComponent ) {
  }

  ngOnInit(): void {
    this.version = '2021.05.01';
    this.autor = 'Weymar Andres Vargas Castillo';
  }

}
