import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryList } from '../interfaces/country-list';
import { CategoryList } from '../interfaces/category-list';
import { CreateBlog } from '../interfaces/create-blog';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';
import { CountryService } from '../services/country.service';
import { CategoryService } from '../services/category.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  apiUrl;
  countryList: CountryList = {
    sub: null,
    error: null,
    loading: false,
    items: []
  };

  categoryList: CategoryList = {
    sub: null,
    error: null,
    loading: false,
    items: []
  };
  
  blog: CreateBlog = {
    sub: null,
    error: null,
    loading: false,
    data: {
        news_title: null,
        country: null,
        category: null,
        body: null,
        excerpt: null,
        external_link: null,
        cover_image: ''
    }
  };

  image;

  constructor(
    private _authService: AuthService,
    private _countryService: CountryService,
    private _categoryService: CategoryService,
    private _blogService: BlogService,
    private _router: Router,
    private _utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.getCategories();
  }

  saveBlog() {
    this.blog.loading = true;
    this.blog.error = null;
    console.log(this.blog.data);

    this.blog.data = this._utils.trimObject(this.blog.data);
    const formData = new FormData();
    formData.append('news_title', this.blog.data.news_title);
    formData.append('country', this.blog.data.country);
    formData.append('category', this.blog.data.category);
    formData.append('body', this.blog.data.body);
    formData.append('excerpt', this.blog.data.excerpt);
    formData.append('external_link', this.blog.data.external_link);
    if( this.image ) {
      formData.append('cover_image', this.image);
    }
    
    this.blog.sub = this._blogService.createBlog(formData)
    .subscribe({
      next: (res:any) => {
        this._router.navigate(['/blog', res._id])
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

  getCountries() {
    this.countryList.loading = true;
    this.countryList.error = null;
    
    this.countryList.sub = this._countryService.getCountries()
    .subscribe({
      next: (res:any) => {
        this.countryList.items = res;
        this.countryList.loading = false;
        this.countryList.sub.unsubscribe();
      },
      error: (err) => {
        this.countryList.error = err;
        this.countryList.loading = false;
        this.countryList.sub.unsubscribe();
      }
    });
    
  }

  getCategories() {
    this.categoryList.loading = true;
    this.categoryList.error = null;
    
    this.categoryList.sub = this._categoryService.getCategories()
    .subscribe({
      next: (res:any) => {
        this.categoryList.items = res;
        this.categoryList.loading = false;
        this.categoryList.sub.unsubscribe();
      },
      error: (err) => {
        this.categoryList.error = err;
        this.categoryList.loading = false;
        this.categoryList.sub.unsubscribe();
      }
    });
    
  }

  fileChangeEvent(e) {
    if( e.target.files.length > 0 ) {
      this.image = e.target.files[0];
      
      const file = (e.target as HTMLInputElement).files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.blog.data.cover_image = reader.result as string;
      }
      reader.readAsDataURL(file)

    }
  }

}