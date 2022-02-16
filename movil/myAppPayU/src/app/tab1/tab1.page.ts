import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import MD5 from 'crypto-js/md5';
import { environment } from '../../environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component( {
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: [ 'tab1.page.scss' ]
} )
export class Tab1Page {
  payuform: any = {};
  disablePaymentButton: boolean;


  constructor( private iab: InAppBrowser ) {
  }

  generarMD5( data: any ) {
    return MD5(
      environment.apiKey +
      data.merchantId + '~' +
      data.referenceCode + '~' +
      data.amount + '~' +
      data.currency ).toString();
  }

  openPayu() {
    const data = {} as any;
    data.merchantId = environment.merchantId;
    data.accountId = environment.accountId;
    data.description = 'Pruebasdesarrollo';
    data.referenceCode = 'TX-WAVC-002';
    data.amount = 20000;
    data.tax = 3193;
    data.taxReturnBase = 16806;
    data.currency = 'COP';
    data.test = 1;
    data.buyerEmail = 'test@test.com';
    data.shippingAddress = 'shippingAddress';
    data.shippingCity = 'shippingCity';
    data.shippingCountry = 'CO';
    data.telephone = '3117825326';
    data.buyerFullName = 'ANDRES VARGAS';
    data.responseUrl = 'https://myAppPayU';
    data.confirmationUrl = 'https://myAppPayU';
    data.signature = this.generarMD5( data );
    this.postForm( `https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/`, data, 'post' );
  }

  postForm( path, params, method ) {
    method = method || 'post';

    const form = document.createElement( 'form' );
    form.setAttribute( 'method', method );
    form.setAttribute( 'action', path );

    for ( const key in params ) {
      if ( params.hasOwnProperty( key ) ) {
        const hiddenField = document.createElement( 'input' );
        hiddenField.setAttribute( 'type', 'hidden' );
        hiddenField.setAttribute( 'name', key );
        hiddenField.setAttribute( 'value', params[ key ] );
        form.appendChild( hiddenField );
      }
    }
    document.body.appendChild( form );
    form.submit();
  }

  openBrowser() {
    const browser = this.iab.create( 'https://ionicframework.com/' );
    browser.close();
  }
}
