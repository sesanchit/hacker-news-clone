import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from '../news-feed.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-news-content-container',
  templateUrl: './news-content-container.component.html',
  styleUrls: ['./news-content-container.component.css']
})
export class NewsContentContainerComponent implements OnInit {

  constructor(private newsFeedService: NewsFeedService, private route: ActivatedRoute) { }



  pageId: number;
  newsFeed: any[] = [];

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('pageId');
    this.newsFeedService.getNews().subscribe(res => {
      this.newsFeed = res.hits;
      debugger;
    })
  }

  hideStory(storyId){
    alert(storyId);
  }

}
