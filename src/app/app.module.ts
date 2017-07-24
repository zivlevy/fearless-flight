import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {MediaPage} from '../pages/media/media';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MediaPlugin} from '@ionic-native/media';
import {File} from '@ionic-native/file';

import {MediaTime} from '../pipes/meidatime';
import {DataProvider} from '../providers/data/data';
import {Device} from '@ionic-native/device';
import {IonicStorageModule} from "@ionic/storage";
import {EmailComposer} from '@ionic-native/email-composer';
import {AuthPageModule} from "../pages/auth/auth.module";
import {EulaPage} from "../pages/eula/eula";
import {EulaPageModule} from "../pages/eula/eula.module";
import {FileOpener} from '@ionic-native/file-opener';

import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import {AuthProvider} from '../providers/auth/auth';
import {AppVersion} from '@ionic-native/app-version';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'b1995c6d'
    }
};

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        HomePage,
        TabsPage,
        MediaPage,
        MediaTime
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        AuthPageModule,
        EulaPageModule,
        CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        HomePage,
        TabsPage,
        MediaPage,
        EulaPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        MediaPlugin,
        File,
        Device,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataProvider,
        EmailComposer,
        Storage,
        FileOpener,
        AuthProvider,
        AppVersion
    ]
})
export class AppModule {
}
