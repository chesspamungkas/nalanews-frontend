import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http: HttpClient,
    private _errorService: ErrorService
  ) { }

  createCategory(data) {
    return this._http.post(`${environment.apiUrl}/category`, data)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  editCategory(data) {
    return this._http.put(`${environment.apiUrl}/category/editCategory/`, data)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getCategories() {
    return this._http.get(`${environment.apiUrl}/category`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getCategorizedBlogCount(authorId = 'all') {
    return this._http.get(`${environment.apiUrl}/category/categorizedBlogs/${authorId}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    )
  }
}
