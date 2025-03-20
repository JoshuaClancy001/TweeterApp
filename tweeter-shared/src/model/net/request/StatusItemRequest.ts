import {TweeterRequest} from "./TweeterRequest";
import {StatusDto} from "../../dto/StatusDto";

export interface StatusItemRequest extends TweeterRequest {
    readonly userAlias: string;
    readonly pageSize: number;
    readonly lastItem: StatusDto | null;
}