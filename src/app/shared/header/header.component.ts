import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[DatePipe]
})
export class HeaderComponent implements OnInit {
  today: number = Date.now(); //yyyy-mm-dd
  constructor(private datePipe: DatePipe) { 

  console.log( this.datePipe.transform(this.today, 'yyyy-MM-dd'));
  }

  ngOnInit(): void {
  }

}
