import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NewsFeedService } from '../news-feed.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../pagination.service';

@Component({
  selector: 'app-news-content-container',
  templateUrl: './news-content-container.component.html',
  styleUrls: ['./news-content-container.component.css']
})
export class NewsContentContainerComponent implements OnInit {

  pageId: number;
  newsFeed: any[] = [];
  pagesFetched: Set<number> = new Set();

  constructor(private newsFeedService: NewsFeedService, 
    private paginationService: PaginationService,
    private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.pageNumberSubscription();
  }

  pageNumberSubscription(){
    this.paginationService.activePageId.subscribe(val=>{
      this.pageId = val;
      this.getNewsFeed();
    });
  }

  cacheNewsFeed(){
    if(!localStorage.getItem('newsFeed')){
      this.getNewsFeed();
    }
    else{
     this.newsFeed = JSON.parse(localStorage.getItem('newsFeed')); 
    }    
  }

  getNewsFeed(){
    this.newsFeedService.getNewsFeed(this.pageId).subscribe(res => {
      this.newsFeed = res.hits;
      this.updateNewsFeed();
      this.updatePageFetches();
    });
  }

  updateNewsFeed(){
    localStorage.setItem('newsFeed', JSON.stringify(this.newsFeed));
  }

  updatePageFetches(){
    this.pagesFetched.add(this.pageId);
    console.log(this.pagesFetched);
  }

  hideStory(index){
    this.newsFeed.splice(index,1);
    this.updateNewsFeed();
  }

  upVote(index){
    this.newsFeed[index].points++;
    this.updateNewsFeed();
  }
}
