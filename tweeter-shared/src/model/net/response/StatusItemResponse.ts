import {StatusDto} from "../../dto/StatusDto";

export interface StatusItemResponse {
    readonly success: boolean;
    readonly message: string;
    readonly items: StatusDto[] | null;
    readonly hasMore: boolean;
}