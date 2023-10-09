import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private _http: HttpClient,
    private _errorService: ErrorService
  ) { }

  createCountry(data) {
    return this._http.post(`${environment.apiUrl}/country`, data)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  editCountry(data) {
    return this._http.put(`${environment.apiUrl}/country/editCountry/`, data)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  deleteCountry(countryId) {
    return this._http.delete(`${environment.apiUrl}/country/${countryId}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getCountries() {
    return this._http.get(`${environment.apiUrl}/country`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getCountryBlogCount(authorId = 'all') {
    return this._http.get(`${environment.apiUrl}/country/countriesBlogs/${authorId}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    )
  }
}
