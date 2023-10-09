import { Subscription } from "rxjs";

export interface CountryList {
    sub: Subscription,
    error: string,
    loading: boolean,
    items: {
        _id: string,
        country: string,
        count?: number
    }[]
}
