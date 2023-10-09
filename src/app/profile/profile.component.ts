import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AllBlogsModel } from '../interfaces/all-blogs-model';
import { User } from '../interfaces/user';
import { UserProfile } from '../interfaces/user-profile';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  User: Observable<User>;
  categoryId: string = 'all';
  authorProfile: UserProfile = {
    sub: null,
    error: null,
    loading: null,
    data: {
      profile_image: null,
      _id: null,
      email: null,
      first_name: null,
      last_name: null,
      joined: null,
    }
  };

  authorAllBlogs: AllBlogsModel = {
    sub: null,
    error: null,
    loading: false,
    items: [],
    totalBlogs: 0,
    totalPages: [],
    currentPage: 0
  }
  
  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _blogService: BlogService
    ) { }
    
  ngOnInit(): void {

    this.User = this._authService.$User;

    this.authorProfile.data._id = this._route.snapshot.paramMap.get('authorId');

    this._route.params.subscribe((params) => {
      if( !params.categoryId ) {
        this.categoryId = 'all';
      } else {
        this.categoryId = params.categoryId;
      }
      this.getAuthorBlogs(this.authorProfile.data._id, this.categoryId);
    });

    this.getAuthorProfile(this.authorProfile.data._id);

  }

  getAuthorProfile(authorid: string) {

    this.User = this._authService.$User;
    this.authorProfile.loading = true;
    this.authorProfile.error = null;

    this.authorProfile.sub = this._authService.getAuthorProfile(authorid)
    .subscribe({
      next: (res:any) => {
        this.authorProfile.data = res;
        this.authorProfile.data.profile_image = this.authorProfile.data.profile_image;
        this.authorProfile.loading = false;
        this.authorProfile.sub.unsubscribe();
      },
      error: (err) => {
        this.authorProfile.error = err;
        this.authorProfile.loading = false;
        this.authorProfile.sub.unsubscribe();
      }
    });

  }

  getAuthorBlogs(authorid: string, categoryId: string) {

    this.authorAllBlogs.loading = true;
    this.authorAllBlogs.error = null;
    
    this.authorAllBlogs.sub = this._blogService.getBlogCategoryUserList(authorid, categoryId)
    .subscribe({
      next: (res:any) => {
        this.authorAllBlogs.items = res.result;
        this.authorAllBlogs.totalBlogs = res.totalBlogs;
        this.authorAllBlogs.currentPage = res.currentPage;
        this.authorAllBlogs.totalPages = Array(res.totalPages).fill(5).map((x,i)=>i);
  
        this.authorAllBlogs.loading = false;
        this.authorAllBlogs.sub.unsubscribe();
      },
      error: (err) => {
        this.authorAllBlogs.error = err;
        this.authorAllBlogs.loading = false;
        this.authorAllBlogs.sub.unsubscribe();
      }
    });

  }

  changePage(page) {

    this.authorAllBlogs.loading = true;
    this.authorAllBlogs.error = null;
    
    this.authorAllBlogs.sub = this._blogService.getBlogCategoryUserList(this.authorProfile.data._id, this.categoryId, page)
    .subscribe({
      next: (res:any) => {
        this.authorAllBlogs.items = res.result;
        this.authorAllBlogs.totalBlogs = res.totalBlogs;
        this.authorAllBlogs.currentPage = res.currentPage;
        this.authorAllBlogs.totalPages = Array(res.totalPages).fill(5).map((x,i)=>i);
  
        this.authorAllBlogs.loading = false;
        this.authorAllBlogs.sub.unsubscribe();
      },
      error: (err) => {
        this.authorAllBlogs.error = err;
        this.authorAllBlogs.loading = false;
        this.authorAllBlogs.sub.unsubscribe();
      }
    });

  }
}
