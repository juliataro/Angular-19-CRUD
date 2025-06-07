import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Post } from "./post";
import { stringify } from "uuid";
import jasmine from "jasmine";

/*
 we will write and call all web services. we will create getAll(), 
 create(), find(), update() and delete().

we are using https://jsonplaceholder.typicode.com web site api for now. 
they provide to easily use. 
*/

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiURL = "https://jsonplaceholder.typicode.com";

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
