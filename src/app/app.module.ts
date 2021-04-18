import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

////////////////Firebase
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
//////////////////
///////environment
import { environment } from 'src/environments/environment';
/////////////////Auth
import {AuthService} from './services/auth.service';
///////////AuthGuard
import {AuthGuard} from  './guards/auth.guard';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,AngularFireStorageModule,
     IonicModule.forRoot(), AppRoutingModule],
  providers: [AuthGuard,AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,
    
   }],
  bootstrap: [AppComponent],
})
export class AppModule {}
