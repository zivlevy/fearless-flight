import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EmailComposer} from "@ionic-native/email-composer";
import { AppVersion } from '@ionic-native/app-version';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  version:string;
  constructor(private appVersion:AppVersion ,public navCtrl: NavController, private emailComposer:EmailComposer) {
    this.appVersion.getVersionNumber().then((version)=>{
      this.version=version;
    });
  }

  send(){

    let email = {
      to: 'info@alonpereg.co.il',
      subject: 'יישומון טיסה ללא פחד - יצירת קשר',
      body: '',
      isHtml: false
    };

// Send a text message using default options
    this.emailComposer.open(email);


  }
}
