import { Subscription } from "rxjs";

export interface CreateBlog {
    sub: Subscription,
    error: string,
    loading: boolean,
    data: {
        news_title: string,
        country: string,
        category: string,
        body: string,
        excerpt: string,
        external_link: string,
        cover_image: string,
    }
}
