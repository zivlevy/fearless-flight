export class MediaItem {
    title:string;
    file:string;
    mediaType:MediaType;
    tags:string[];
    group:number;
    groupOrder:number;


}

export interface Group {
    title:string;
}

export enum MediaType {
    voice = 1,
    video
}