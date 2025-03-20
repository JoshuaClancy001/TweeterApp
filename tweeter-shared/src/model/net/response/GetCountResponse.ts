import {TweeterResponse} from "./TweeterResponse";


export interface GetCountResponse extends TweeterResponse {
    count: number;
}