import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesModel } from 'src/app/interfaces/categories-model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-component',
  templateUrl: './category-component.component.html',
  styleUrls: ['./category-component.component.scss']
})
export class CategoryComponentComponent implements OnInit {

  @Input() categoryId: string;
  @Input() authorName: string;
  @Input() authorId: string;

  sectionTitle: string;
  categories: CategoriesModel = {
    sub: null,
    error: null,
    loading: false,
    items: [],
    totalBlogs: 0,
    currentCategoryId: 'all'
  }
  

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if( this.authorName ){
      this.sectionTitle = this.authorName + "'s";
    } else {
      this.sectionTitle = 'Blog'
    }

    if( !this.authorId ) {
      this.authorId = 'all';
    }

    if( !this.categoryId ) {
      this.categoryId = 'all';
    }

    this._route.params.subscribe((params) => {

      if( !params.categoryId ) {
        this.categories.currentCategoryId = 'all';
      } else {
        this.categories.currentCategoryId = params.categoryId;
      }
    });

    this.getCategorizedBlogsCount();
  }

  getCategorizedBlogsCount() {
    this.categories.loading = true;
    this.categories.error = null;

    this.categories.sub = this._categoryService.getCategorizedBlogCount(this.authorId)
    .subscribe({
      next: (res:any) => {
        this.categories.items = res;
        this.categories.items.forEach(c => {
          this.categories.totalBlogs += c.count;
        });
        this.categories.loading = false;
        this.categories.sub.unsubscribe();
      },
      error: (err) => {
        this.categories.error = err;
        this.categories.loading = false;
        this.categories.sub.unsubscribe();
      }
    });
  }

}
