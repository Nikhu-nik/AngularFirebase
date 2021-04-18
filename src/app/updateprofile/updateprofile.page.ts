import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {  AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
export interface user{
  username:string;
  uid:string;
  // email:string;
}

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.page.html',
  styleUrls: ['./updateprofile.page.scss'],
})
export class UpdateprofilePage implements OnInit {
 
  constructor(private toastController:ToastController,
    private ofAuth:AngularFireAuth) { }

  ngOnInit() {
  }

 






  
   }













 
  

