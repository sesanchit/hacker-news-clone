import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  newsFeedUrl= "http://hn.algolia.com/api/v1/search?page=";

  constructor(private http: HttpClient) { }

  getNewsFeed(page:number): Observable<any>{
    return this.http.get(this.newsFeedUrl+page);
  }
}
