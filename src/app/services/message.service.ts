import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {
  messages: string[] = [];
  counter = 0;
  count: BehaviorSubject<number>;
  cartItems:number[] = [];

  constructor(){
  	this.count  = new BehaviorSubject(this.counter);
  }

  add(message: string) {
    this.messages.push(message);
  }

  nextCount(itemId: number) {
  	this.cartItems.push(itemId);
    this.count.next(++ this.counter);
    console.log(this.cartItems)
  }

  clear() {
    this.messages = [];
  }
}
