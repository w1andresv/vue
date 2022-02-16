import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket: any;
  readonly url: string =
    'wss://c49ab8hu8d.execute-api.us-west-2.amazonaws.com/desarrollo';

  constructor() {
    this.socket = io(this.url);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data:any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName:any, data:any) {
    this.socket.emit(eventName, data);
  }
}
