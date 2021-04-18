import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase';
import { LoadChildren, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public formValid = true;
  isSubmitted = false;
  user: any = {};
email:string;
password:string;
  constructor(private toastController:ToastController,private alertController:AlertController,
public fb: FormBuilder,private auth:AuthService,
    private router: Router,public loadingCtrl:LoadingController
  ) {
   
  }

  ngOnInit() {
  }
  async showtoast(message,status) {
    const toast = await this.toastController.create({
      message: message,
      color:status,
      duration: 4000,
     position:'top'
    });
    toast.present();
  }
    // // set user to storage
  // localStorage.setItem("The present user loggedIn", JSON.stringify(res));
  async showalert(message) {
    const alert = await this.alertController.create({
      cssClass:'alertclass',
      header:'Notification',
      message: message,
      keyboardClose:false,
      mode:'md',
      backdropDismiss:false,
      buttons: ['OK']
    });
    await alert.present();

   
  }
  login() {

if (this.email && this.password) 
    {
      this.auth.signIn(this.email, this.password )
  
    }else{
    this.showtoast('Please enter yoour email and password','warning');
  } 
  
}








   
 

}
