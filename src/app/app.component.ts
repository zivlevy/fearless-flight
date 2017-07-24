import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
import {AuthPage} from "../pages/auth/auth";
import {EmailComposer} from "@ionic-native/email-composer";
import {EulaPage} from "../pages/eula/eula";
import {Storage} from "@ionic/storage";
import {TabsPage} from "../pages/tabs/tabs";
import {Device} from "@ionic-native/device";

import {AlertController, LoadingController} from 'ionic-angular';
import {Deploy} from '@ionic/cloud-angular';
import {AuthProvider} from "../providers/auth/auth";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
                private auth: AuthProvider,
                private emailComposer: EmailComposer,
                private storage: Storage,
                private device: Device,
                public deploy: Deploy, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            /////
            // this.deploy.channel = 'dev';
            this.deploy.getSnapshots().then((snapshots) => {
                console.log('now getting snapshots...');
                console.log(snapshots);
            });

            this.deploy.check().then((snapshotAvailable: boolean) => {
                if (snapshotAvailable) {

                    this.deploy.getMetadata().then((metadata) => {
                        console.log('now getting metadata2..');
                        console.log(metadata);

                        let alert = this.alertCtrl.create({
                            title: 'Version ' + metadata.version + ' is available',
                            message: 'Do you want to download this update?',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                    handler: () => {

                                    }
                                },
                                {
                                    text: 'Yes',
                                    handler: () => {

                                        this.deploy.download().then(() => {

                                            console.log('download completed!');

                                            let loading = this.loadingCtrl.create({
                                                content: 'Now reloading the app...'
                                            });

                                            loading.present();

                                            this.deploy.extract().then(() => {
                                                console.log('extract completed!');
                                                this.deploy.load();

                                                console.log('reload completed!');
                                                loading.dismiss();

                                            });
                                        });

                                    }
                                }
                            ]
                        });

                        alert.present();

                    });

                }
            });
            ////
            if (platform.is('cordova')) {
                // You are on a device, cordova plugins are accessible
                this.emailComposer.isAvailable().then((available: boolean) => {
                    console.log(available);
                    if (available) {
                        console.log('===>' + available);
                    }
                });


            } else {
                // Cordova not accessible, add mock data if necessary
            }
            this.storage.get('license').then((license) => {
                if (license) {
                    if (auth.auth(license)) {
                        this.storage.get('eula').then(eula => {
                            if (eula === 'YES') {
                                this.rootPage = TabsPage;
                            } else {
                                this.rootPage = EulaPage;
                            }
                        })
                    } else {
                        this.rootPage = AuthPage;
                    }
                } else {
                    this.rootPage = AuthPage;
                }

            });
            statusBar.styleDefault();
            splashScreen.hide();

        });
    }
}
