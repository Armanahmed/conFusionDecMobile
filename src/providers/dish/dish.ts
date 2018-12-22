import { HttpClient, Response } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

import { map, catchError } from 'rxjs/operators';

/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: HttpClient, private processHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello DishProvider Provider');
  }

  getDishes(): Observable<Dish[]> {
  	return this.http.get(baseURL + 'dishes')
  		.pipe(catchError(this.processHttpmsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
  	return this.http.get<Dish>(baseURL + 'dishes/' + id)
  		.pipe(catchError(this.processHttpmsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
  	return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
  		.pipe(map(res => res[0] ))
  		.pipe(catchError(this.processHttpmsgService.handleError));
  }

}
