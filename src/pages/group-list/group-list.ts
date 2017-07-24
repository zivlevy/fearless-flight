import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaItem} from "../../models/mediaItem";
import {MediaPage} from "../media/media";

@IonicPage()
@Component({
  selector: 'page-group-list',
  templateUrl: 'group-list.html',
})
export class GroupListPage {
  title:string;
  mediaGrups:MediaItem[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams)
    this.title = this.navParams.data.title;
    this.mediaGrups = this.navParams.data.itemsGroup;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupListPage');
  }

  gotoMedia(title,index) {

    let mediaItem:MediaItem= this.mediaGrups[index];
    console.log(mediaItem);
    this.navCtrl.push(MediaPage, {title:title,mediaItem:mediaItem});
  }

}
