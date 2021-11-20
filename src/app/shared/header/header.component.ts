import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginModal', { static: true }) myloginModal!: ElementRef;


  today: number; //yyyy-mm-dd
  uName: string="";
  password: string="";
  error = [];
  constructor(private authService: AuthService) { 
    this.today = Date.now();
  }

  login(){
    this.authService.login({username: this.uName, password: this.password}).
    subscribe(data => {
      console.log(data);
    });
    this.authService.login({username: this.uName, password: this.password}).subscribe(
      resData => {
       this.myloginModal.nativeElement.hide();
        console.log(resData);

      },
      errorMessage => {
        this.error = errorMessage;
        console.log(this.error);
      }
      );

  }
  ngOnInit(): void {

  }

}
