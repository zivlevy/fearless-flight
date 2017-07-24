import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {TabsPage} from "../tabs/tabs";


@IonicPage()
@Component({
  selector: 'page-eula',
  templateUrl: 'eula.html',
})
export class EulaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private storage:Storage, private platform:Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EulaPage');
  }

  accept(){
    this.storage.set('eula', 'YES');
    this.navCtrl.setRoot(TabsPage);
    // this.storage.get('eula').then(s=>console.log(s));

  }


}
