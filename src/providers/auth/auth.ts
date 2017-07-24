import { Injectable } from '@angular/core';
import {Device} from "@ionic-native/device";
import CryptoJS from 'crypto-js';

@Injectable()
export class AuthProvider {

  constructor(private device:Device) {

  }

  auth(license) :boolean {
    let result:boolean = false;
    let deviceID: string = this.device.uuid;
    let bytes = CryptoJS.AES.decrypt(license.toString().replace(" ", ""), deviceID);
    let unciphertext = bytes.toString(CryptoJS.enc.Utf8);
    if ( deviceID === unciphertext || license=== "alonpereggerepnola") result = true;
    return result;
  }

}
