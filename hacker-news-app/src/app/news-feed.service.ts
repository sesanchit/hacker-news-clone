import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  newsFeedUrl= "http://hn.algolia.com/api/v1/search";

  constructor(private http: HttpClient) { }

  getNews(): Observable<any>{
    return this.http.get(this.newsFeedUrl);
  }
}
