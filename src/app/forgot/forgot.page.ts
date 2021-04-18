import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import firebase from 'firebase';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  email: any;
  constructor(public loadingCtrl:LoadingController,private router: Router,
    private auth: AngularFireAuth,private alertController:AlertController
  ) { }

  ngOnInit() {
  }
  async showalert(message) {
    const alert = await this.alertController.create({
      cssClass:'alertclass',
      header:'Notification',
      message: message,
      mode:'md',
      backdropDismiss:false,
      buttons: ['OK']
    });
    await alert.present();

   
  }
  reset() {
    this.loadingCtrl.create({
      message:"Processing...",
      mode:'ios',
      cssClass:'register-loader',
      duration: 1000,
      spinner: 'crescent',
      backdropDismiss:true
    }).then((ele)=>{
      ele.present();  
    if (this.email) {
      this.auth.sendPasswordResetEmail(this.email).then((r) => {
        console.log("Email Reset");
        this.showalert("Email sent");
        this.router.navigate(['/login']);
      }).catch((error:firebase.FirebaseError) => {
        this.showalert(error);
        console.log(error);
        let errorCode = error.code // THIS CAN'T BE READ
      })
    }
   })

}

}