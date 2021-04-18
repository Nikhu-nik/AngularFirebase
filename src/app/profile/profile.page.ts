import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};
  constructor(private router:Router,
    private auth: AuthService,
    private afStorage: AngularFireStorage,
    private afDB: AngularFireDatabase,
  ) { }

  async ngOnInit() {
 this.auth.user$.subscribe(user =>{
   console.log(user);
   this.user = user;
 })
  }


  
  EditProfile(){
    this.router.navigate(['/profile/edit']);
  }

}
