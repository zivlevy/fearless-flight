import {AfterContentInit, Component, OnDestroy} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';

import {MediaPlugin, MediaObject} from '@ionic-native/media';
import {File} from '@ionic-native/file';
import {MediaItem, MediaType} from "../../models/mediaItem";

@Component({
    selector: 'page-media',
    templateUrl: 'media.html'
})
export class MediaPage implements OnDestroy, AfterContentInit {
    mediaItem: MediaItem;
    mediaFile: MediaObject;
    duration: number = 0;
    currentLocation: number = 0;
    timeRemaining: number = 0;
    positionTimer: any = 0;
    title: string = 'Home';
    isVideo: boolean = false;
    videoSource: string;
    isPlaying:boolean=false;

    constructor(public navCtrl: NavController,
                public media: MediaPlugin,
                private file: File,
                private navParams: NavParams,
                private platform: Platform) {
        this.title = this.navParams.data.title;
        this.mediaItem = this.navParams.data.mediaItem;

        const onStatusUpdate = (status) => {
            console.log(status)
            if (status === 1) {
            }
            else if (status == 2) {

            }
        }
        const onSuccess = () => console.log('Action is successful.');
        const onError = (error) => {
            console.error(error.message);
        }
        if (this.mediaItem.mediaType === MediaType.voice) {
            if (this.platform.is('ios')) {
                this.mediaFile = this.media.create('assets/media/' + this.mediaItem.file, onStatusUpdate, onSuccess, onError);

            } else {
                this.mediaFile = this.media.create(this.file.applicationDirectory + 'www/assets/media/' + this.mediaItem.file, onStatusUpdate, onSuccess, onError);
            }
            this.positionTimer = setInterval(this.setCurrentPosition.bind(this), 1000);

        } else {
            this.videoSource = 'assets/media/' + this.mediaItem.file;

            this.isVideo = true;
        }

    }

    ngAfterContentInit() {
        if (!this.isVideo) this.play();
    }

    play() {
        if (!this.isPlaying){
            this.mediaFile.play();
            this.isPlaying=true;
        }
    }

    stop() {
        this.isPlaying=false;
        this.mediaFile.stop();
        this.currentLocation = 0;
    }

    pause() {
        this.isPlaying=false;
        this.mediaFile.pause();
    }


    setCurrentPosition() {
        if (this.isPlaying){
            this.mediaFile.getCurrentPosition().then(currentPosition => {
                if (!this.duration) {
                    let duration = this.mediaFile.getDuration();
                    this.duration = duration;
                }
                console.log(currentPosition);
                this.timeRemaining = this.duration-currentPosition;
                this.currentLocation = currentPosition;
            })
        }
    }

    ngOnDestroy() {
        clearInterval(this.positionTimer);
        if (!this.isVideo) {
            this.mediaFile.release();
            this.positionTimer = null;
        }

    }

    goto(e) {
        this.mediaFile.seekTo(e * 1000);
        this.currentLocation = e;
    }

}