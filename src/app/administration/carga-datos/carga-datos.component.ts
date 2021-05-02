import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-carga-datos',
  templateUrl: './carga-datos.component.html',
  styleUrls: [ './carga-datos.component.css' ]
} )
export class CargaDatosComponent implements OnInit {
  archivo: any;
  jsonData: any;
  cols: any[];
  listaClientes: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.cols = [
      { field: 'nombre', header: 'nombre' },
      { field: 'documento', header: 'Numero documento' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'producto', header: 'Producto' },
    ];
  }

  onUpload( event ) {
    const archivo = event.files[ 0 ];
  }

  onBeforeUpload( event ) {
    this.archivo.text().then( res => {
      this.jsonData = this.csvJSON( res );
    } );
  }

  csvJSON( csv ) {
    const lines = csv.split( '\n' );
    const result = [];
    const headers = lines[ 0 ].split( ',' );
    for ( let i = 1; i < lines.length; i++ ) {
      const obj = {};
      const currentline = lines[ i ].split( ',' );
      if ( currentline.length > 0 ) {
        for ( let j = 0; j < headers.length; j++ ) {
          obj[ headers[ j ] ] = currentline[ j ];
        }
        if ( currentline[ 0 ] !== '' ) {
          result.push( obj );
        }
      }
    }
    this.listaClientes = result;
    return JSON.stringify( result ); //JSON
  }

  onSelect( event ) {
    this.archivo = event.files[ 0 ];
  }
}
