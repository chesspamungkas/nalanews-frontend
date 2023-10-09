import { Subscription } from "rxjs";

export interface CountriesModel {
    sub: Subscription,
    error: string,
    loading: boolean,
    items: {
        _id: string,
        country: string,
        code: string,
        count: number
    }[],
    totalBlogs: number,
    currentCountryId: string
}
