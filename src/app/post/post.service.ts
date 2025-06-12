import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Post } from "./post";
import { stringify } from "uuid";
import jasmine from "jasmine";

/*
 Reusable class that holds logic 
 or data you want to share across components

we are using https://jsonplaceholder.typicode.com 
web site api for now they provide to easily use. 
*/

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiURL = "http://localhost:8000";

  /*---------------------------------------------
  -----------------------------------------------
  Http Header Options
  HTTP headers are additional pieces of 
  information sent along with an HTTP request
  or response.
  -----------------------------------------------
  -----------------------------------------------*/

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  /*------------------------------------------
  --------------------------------------------
  Created constructor

  In Angular, if you want to use a service — 
  either built-in (like HttpClient, Router) or 
  custom (like your PostService) —
  you must inject it into the constructor.

  That’s how Angular’s Dependency Injection (DI) system works.

  HttpClient is a service class, not a utility function.
  It must be created by Angular, with all its dependencies 
  resolved.
  You ask for it in the constructor, and Angular’s 
  Dependency Injection system gives you a ready-to-use instance.
  --------------------------------------------
  --------------------------------------------*/

  constructor(private httpClient: HttpClient) {}

  /**
   * Write code on Method
   *
   * @return response()
   */

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + "/posts/")

      .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   * stringify for converting JS object into a JSON sting,
   * from client-side to server in string format
   */

  create(post: Post): Observable<any> {
    return this.httpClient.post(
      this.apiURL + "/posts/",
      JSON.stringify(post),
      this.httpOptions
    );
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + "/posts/" + id)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id: number, post: Post): Observable<any> {
    return this.httpClient
      .put(this.apiURL + "/posts/" + id, JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   */

  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + "/posts/" + id)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Write on Method,
   *
   * @return response()
   */
  errorHandler(error: any) {
    let errorMessage = "";
    // ErrorEvent is a browser class for error event that initiates if error occurs.
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // throwError
    return throwError(() => error);
  }
}
