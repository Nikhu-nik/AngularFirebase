import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadChildren, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
name:string;
email:string;
userId:string;

username:string;
error;
  constructor(private auth:AngularFireAuth,private afs:AngularFirestore
    ,private toastController:ToastController,private router:Router,
    private loaderController:LoadingController) { }

  ngOnInit() {
    this.auth.user.subscribe(user=>{
      console.log(user);
      this.userId=user.uid;
     this.name = user.displayName;
     this.email= user.email;

    })
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







  
  async edit(){
const loading = await this.loaderController.create({
  message:'Updating...',
  spinner:'crescent',
  showBackdrop:true
});
   loading.present();
this.afs.collection('user').doc(this.userId).set({

        'userName':this.name,
        'userEmail':this.email,
        'createdAt':Date.now(),
        'editAt':Date.now()
},{merge:true})
.then(()=> {
  loading.dismiss();
this.toast('Updated successfully', 'success');
this.router.navigate(['/profile1'])
}).catch((error)=> {
  loading.dismiss();
this.toast(error.message, 'danger');
})


  }



}
