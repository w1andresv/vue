import { Component, OnInit } from '@angular/core';
import { SedeService } from '../../_services/sede.service';
import { Sede } from '../../modelos/sede';

@Component( {
    selector: 'app-sedes',
    templateUrl: './sedes.component.html',
    styleUrls: [ './sedes.component.css' ]
} )
export class SedesComponent implements OnInit {

    cols: any;
    listaSedes: Sede[] = [];
    show = 'T';
    sede: Sede;

    constructor( private sedeService: SedeService ) {
    }

    ngOnInit() {
        this.cargarLista();
        this.cols = [
            { field: 'codigoSede', header: 'Codigo' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'habilitado', header: 'Habilitado' },
            { field: 'def', header: 'Acciones' },
        ];
    }

    cargarLista() {
        this.sedeService.getAll().subscribe( res => {
            this.listaSedes = res;
        } );
    }

    agregar( event? ) {
        if ( event ) {
            this.sede = event;
        }
        this.show = 'E';
    }

    inhabilitar( sede ) {
        sede.habilitado = false;
        this.actualizar( sede );
    }

    actualizar( sede ) {
        this.sedeService.actualizar( sede ).subscribe( res => {
            this.cargarLista();
        }, error => {
            console.log( 'error al guardar' );
        } );
    }

    habilitar( sede ) {
        sede.habilitado = true;
        this.actualizar( sede );
    }

    verAsesores( sede ) {
        this.sede = sede;
        this.show = 'TA';
    }

    mostrarOcultar( event ) {
        this.show = event;
        this.sede = undefined;
        if ( event === 'T' ) {
            this.cargarLista();
        }
    }

}
