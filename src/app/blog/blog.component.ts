import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BlogDetailsModel } from '../interfaces/blog-details-model';
import { UserProfile } from '../interfaces/user-profile';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  apiUrl;
  blog: BlogDetailsModel = {
    sub: null,
    error: null,
    loading: false,
    blogId: null,
    data: null
  }

  User: UserProfile = {
    sub: null,
    error: null,
    loading: false,
    data: {
      _id: null,
      first_name: null,
      last_name: null,
      email: null,
      profile_image: null,
      joined: null
    }
  }

  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _blogService: BlogService
  ) { }

  ngOnInit(): void {

    this.apiUrl = environment.apiUrl + '/';

    this.getLoggedInUserData();
    this.blog.blogId = this._route.snapshot.paramMap.get('blogId');
    this.getBlogDetails(this.blog.blogId);

  }

  ngOnDestroy() {
    this.User.sub.unsubscribe();
  }


  getLoggedInUserData(){
    this.User.loading = true;
    this.User.error = null;
    this.User.sub = this._authService.$User
    .subscribe({
      next: (res:any) => {
        this.User.data = res;
        this.User.loading = false;
      },
      error: (err) => {
        this.User.loading = false;
        this.User.error = err;
      }
    });
  }

  getBlogDetails(blogId) {

    this.blog.error = null;
    this.blog.loading = true;

    this.blog.sub = this._blogService.getBlogDetails(blogId)
    .subscribe({
      next: (res:any) => {
        this.blog.data = res;
        this.blog.loading = false;
        this.blog.sub.unsubscribe();
      },
      error: (err) => {
        this.blog.error = err;
        this.blog.loading = false;
        this.blog.sub.unsubscribe();
      }
    });
  }

}
