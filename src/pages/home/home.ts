import {Component} from '@angular/core';
import {ItemGroup, NavController} from 'ionic-angular';
import {MediaPage} from '../media/media'
import {Group} from "../../models/mediaItem";
import {Observable} from "rxjs/Observable";
import {DataProvider} from "../../providers/data/data";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    mediaGrups: Observable<Group[]>;

    madiaPage: MediaPage;

    constructor(public navCtrl: NavController,
                private dataProvider: DataProvider) {
        this.mediaGrups = this.dataProvider.getGroups$();
    }

    gotoGroup(title,index) {
        console.log(title +'-'+ index);
        let itemsGroup:ItemGroup= this.dataProvider.getMediaItemsByGroup(index);
        console.log(itemsGroup);
        this.navCtrl.push('GroupListPage', {title:title,itemsGroup:itemsGroup});
    }

}
