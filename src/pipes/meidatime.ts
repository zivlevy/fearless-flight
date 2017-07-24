/**
 * Created by zivlevy on 22/05/2017.
 */
import {Pipe} from '@angular/core';

@Pipe({
    name: 'mediatime'
})
export class MediaTime {
    transform(value, args) {
        if (value <0) return '00:00';
        console.log(value)
        let minute = this.setLeadingZero(Math.floor(value / 60));
        console.log(minute)
        let sec = this.setLeadingZero(Math.round(Math.floor(value) % 60));
        console.log(sec)


        return minute+':' + sec;
    }

    setLeadingZero(val:number):string {
        if ( val< 10) return '0'+val;
        return ''+val;
    }
}