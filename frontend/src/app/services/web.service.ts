import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {type Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class WebService {
  // declaring the root url for all the requests from the client
  readonly ROOT_URL;

  constructor(
    @Inject(HttpClient)
    private readonly http: HttpClient,
  ) {
    this.ROOT_URL = environment.SERVER_URL;
  }

  // For all get requests to the server .
  get(uri: string): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  // For all the post requests to the backend server.
  post(uri: string, payload: any): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  put(uri: string, payload: any): Observable<any> {
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload);
  }
}
