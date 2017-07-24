import {Injectable} from '@angular/core';
import {Group, MediaItem, MediaType} from "../../models/mediaItem";
import {Observable} from "rxjs";


/*
 Generated class for the DataProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DataProvider {
    mediaGroups: Group[] = [
        {title: "הכנה לטיסה"},
        {title: "תיאוריה של טיסה"},
        {title: "מהלך הטיסה"},
        {title: "תופעות סביבה ומזג אוויר"},
    ];
    //Sequence 01 - intro.mp3
    mediaItems: MediaItem[] = [
        {
            title: "הקדמה",
            file: "Sequence 01 - intro.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 0,
            groupOrder:1
        },
        {
            title: "קולות צלילים ורעשים",
            file: "Sequence 02 -Noises.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 0,
            groupOrder:2
        },
        {
            title: "הכנה לטיסה",
            file: "Sequence 03 - Prep.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 0,
            groupOrder:3
        },
        {
            title: "בשדה התעופה",
            file: "Sequence 04 - Terminal.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 2,
            groupOrder:1
        },
        {
            title: "כניסה למטוס",
            file: "Sequence 05 - Cabin.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 2,
            groupOrder:2
        },
        {
            title: "לפני המראה",
            file: "Sequence 06 - Before Takeoff.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 2,
            groupOrder:3
        },
        {
            title: "המראה",
            file: "Sequence 07 - Takeoff.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 2,
            groupOrder:4
        },
        {
            title: "שיוט בגובה",
            file: "Sequence 08 - Cruise.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 2,
            groupOrder:5
        },
        {
            title: "הנמכה לנחיתה",
            file: "Sequence 09 - Descent and Landing.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 2,
            groupOrder:6
        },
        {
            title: "מערבולות",
            file: "Sequence 10- Turbulence.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 3,
            groupOrder:1
        },
        {
            title: "מזג אוויר וסביבה",
            file: "Sequence 11 - Weather.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 3,
            groupOrder:2
        },
        {
            title: "ציפורים ותעופה",
            file: "Sequence 12 - Birds.mp3",
            mediaType: MediaType.voice,
            tags: [],
            group: 3,
            groupOrder:2
        },
        {
            title: "איך בוחנים מטוס",
            file: "Sequence 14 - Aircraft Certification.mp4",
            mediaType: MediaType.video,
            tags: [],
            group: 1,
            groupOrder:2
        },
        {
            title: "עילוי - איך מטוס טס",
            file: "Sequence 13 -Lift Phone.mp4",
            mediaType: MediaType.video,
            tags: [],
            group: 1,
            groupOrder:1
        },
        {
            title: "נחיתה",
            file: "Landing-Clip-phone.mp4",
            mediaType: MediaType.video,
            tags: [],
            group: 2,
            groupOrder:7
        }

    ]


    constructor() {
        console.log('Hello DataProvider Provider');
    }

    getGroups$ ():Observable<Group[]>{
        return Observable.of(this.mediaGroups);
    }

    getMediaItemsByGroup(group){
        return this.mediaItems
            .filter((item:MediaItem) => item.group==group)
            .sort((a,b)=>a.groupOrder-b.groupOrder)
    }

}
