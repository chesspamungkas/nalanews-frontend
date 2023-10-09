import { Subscription } from "rxjs";

export interface UserProfile {
    sub: Subscription,
    error: string,
    loading: boolean,
    data: {
        profile_image?: string,
        _id: string,
        email?: string,
        first_name: string,
        last_name?: string,
        joined?: string
    }
}
