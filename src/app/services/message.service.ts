import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {
  messages: string[] = [];
  counter = 0;
  count: BehaviorSubject<number>;
  cartItemArr = new BehaviorSubject<any[]>([]);

  constructor(){
  	this.count  = new BehaviorSubject(this.counter);
  }

  add(message: string) {
    this.messages.push(message);
  }

  nextCount(itemId: number) {
  	this.cartItemArr.next(this.cartItemArr.getValue().concat([itemId]));
    this.count.next(++ this.counter);
  }

  clear() {
    this.messages = [];
  }
}
