import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<User>;
user:User;
  constructor(
    private loadingCtrl:LoadingController,
    private toastController:ToastController,
    private router:Router,
    private afauth:AngularFireAuth,
    private afs:AngularFirestore,

  ) { 
    this.user$ = this.afauth.authState
    .pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    )
  }

  async toast(message, status) {
    const toast = await this.toastController.create({
      message:message,
      color:status,
      position:'top',
      duration:2000
    });
    toast.present();
  }
//////////////////////
async signIn(email,password){
  const loading = await this.loadingCtrl.create({
     message:"please wait..",
     spinner:"crescent",
     duration:2000,
     showBackdrop:true
});
loading.present();
this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(()=> {
this.afauth.signInWithEmailAndPassword(email, password).then((data)=> {
console.log(data);
localStorage.setItem("The present user loggedIn", JSON.stringify(data));
  loading.dismiss();
  this.router.navigate(['/home']);
 
 


  })
  .catch(error => {
    loading.dismiss();
    this.toast(error.message,'danger');
  })
})

}












  async signout(){
    const loading = await this.loadingCtrl.create({
      message:"processing",
     spinner:"bubbles",
     duration:2000,
     showBackdrop:true
});
loading.dismiss();
this.afauth.signOut()
.then(()=> {
  loading.dismiss();
  this.router.navigate(['/login']);
})
  }
}

