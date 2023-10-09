import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private _http: HttpClient,
    private _errorService: ErrorService
  ) { }

  createBlog(data) {
    return this._http.post(`${environment.apiUrl}/blog`, data)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  editBlog(data) {
    return this._http.put(`${environment.apiUrl}/blog/editBlog/`, data)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  deleteBlog(blogId) {
    return this._http.delete(`${environment.apiUrl}/blog/${blogId}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getBlogDetails(blogId) {
    return this._http.get(`${environment.apiUrl}/blog/details/${blogId}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getBlogCountryList(countryId, page = 1) {
    return this._http.get(`${environment.apiUrl}/blog/${countryId}?page=${page}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getBlogCategoryList(categoryId, page = 1) {
    return this._http.get(`${environment.apiUrl}/blog/${categoryId}?page=${page}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getBlogCountryUserList(authorId, countryId, page = 1) {
    return this._http.get(`${environment.apiUrl}/blog/${authorId}/${countryId}?page=${page}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getBlogCategoryUserList(authorId, categoryId, page = 1) {
    return this._http.get(`${environment.apiUrl}/blog/${authorId}/${categoryId}?page=${page}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }
}