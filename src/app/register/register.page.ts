import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {  LoadingController, ToastController } from '@ionic/angular';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import {AngularFireDatabase} from '@angular/fire/database';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
  user:any = {};
  name:string;
  email:string;
  password:string;
  constructor(private toastController:ToastController,
    private afDB:AngularFireDatabase,
    private afs:AngularFirestore,
    private auth: AngularFireAuth,
    private router:Router,
    public alertController: AlertController,
    private loadingCtrl:LoadingController,
    ) { 
     
    }

  ngOnInit() {
    if(firebase.apps.length ==0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }
 
  async showalert(message) {
    const alert = await this.alertController.create({
      cssClass:'alertclass',
      header:'Notification',
      message: message,
      mode:'md',
      buttons: ['OK']
    });
    await alert.present();

   
  }
  

  async showtoast(message, status) {
    const toast = await this.toastController.create({
      message:message,
      color:status,
      position:'top',
      duration:2000
    });
    toast.present();
  }
  async register() {
   {
     if(this.name && this.email && this.password) {
       const loading = await this.loadingCtrl.create({
         message:"processing",
        spinner:"bubbles",
        duration:2000,
        showBackdrop:true
});
    loading.present();
    this.auth.createUserWithEmailAndPassword(this.email, this.password).then((data)=> {
      //  data.user.sendEmailVerification();
      this.afs.collection('user').doc(data.user.uid).set({
        'userId':data.user.uid,
        'userName':this.name,
        'userEmail':this.email,
        'createdAt':Date.now()  
        }).then(()=>{
          loading.dismiss();
          this.showtoast('Register Successfully','success');
          this.router.navigate(['/login']);
        })
        
        
        .catch((error:firebase.FirebaseError)=> {
         
          this.showalert(error);
          console.error(error);
         
        })
    })
     }
   }




}
}














    // firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then((user)=>{
    //   if(user) {
    //     user.user.updateProfile({
    //       displayName:this.username,
    //       photoURL:"",
    //     }).then((val)=> {
    //       this.showtoast("Registered Sucessfully");
    //     }).catch(err => {
    //       this.showtoast(err);
    //       console.log(`login failed ${err}`);
    //      this.error = err.message;
    //     })
    //   }
    // })
   
   
        
 
