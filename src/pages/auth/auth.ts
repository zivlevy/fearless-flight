import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Device} from "@ionic-native/device";
import {EmailComposer} from "@ionic-native/email-composer";
import { Storage} from '@ionic/storage';
import {TabsPage} from "../tabs/tabs";
import { ToastController } from 'ionic-angular';
import {EulaPage} from "../eula/eula";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
    selector: 'page-auth',
    templateUrl: 'auth.html',
})
export class AuthPage {
    deviceID: string;
    fullname: string = '';
    license: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private auth: AuthProvider,
                private device: Device,
                private emailComposer: EmailComposer,
    private storage:Storage,public toastCtrl:ToastController) {


    }

    reverse(str: string) {
        return str.split('').reverse().map(l => {
            return l + 1
        }).join('');
    }

    send() {
        this.deviceID = this.device.uuid;
        let email = {
            to: 'info@alonpereg.co.il',
            subject: 'בקשת קוד איתחול ליישומון טיסה ללא פחד',
            body: `שלום,\n \n מזהה המכשיר שלי הוא \n\n ${this.deviceID} \n\n מבקש לקבל קוד איתחול ליישומון טיסה ללא פחד. \n \n בברכה,\n  ${this.fullname}`,
            isHtml: false
        };

        // Send a text message
        this.emailComposer.open(email);


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AuthPage');
    }



    init(){
        // this.deviceID = this.device.uuid;
        // let bytes = CryptoJS.AES.decrypt(this.license.toString().replace(" ", ""), this.deviceID);
        // let unciphertext = bytes.toString(CryptoJS.enc.Utf8);
        if (this.auth.auth(this.license.toString().replace(" ", ""))) {
            this.storage.set('license', this.license.toString().replace(" ", ""));
            this.storage.get('eula').then(eula=>{
                if (eula==='YES') {
                    this.navCtrl.setRoot(TabsPage);
                } else {
                    this.navCtrl.setRoot(EulaPage);
                }
            })

        } else {
            this.storage.remove('license');
            let toast = this.toastCtrl.create({
                message: 'קוד איתחול אינו תואם למכשיר',
                duration: 3000,
                position: 'middle'
            });
            toast.present();
        }
    }


}
