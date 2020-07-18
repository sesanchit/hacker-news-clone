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
  pageChangeEvent: string = "";

  constructor(private newsFeedService: NewsFeedService, 
    private paginationService: PaginationService,
    private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.pageNumberSubscription();
    this.pageDirectionSubscription();

  }

  pageNumberSubscription(){
    this.paginationService.activePageId.subscribe(val=>{
      this.pageId = val;
      this.getNewsFeed();
    });
  }

  pageDirectionSubscription(){
    this.paginationService.pageChangeDirection.subscribe(val=>{
      this.pageChangeEvent = val;
      this.updatePageStore(val);
    });
  }


  getNewsFeed(){
    const newsFeedStore = this.checkNewsFeedStore();
    if(newsFeedStore && newsFeedStore.length > 0){
      this.newsFeed = newsFeedStore;
    }
    else{
      this.newsFeedService.getNewsFeed(this.pageId).subscribe(res => {
        this.newsFeed = res.hits;
        this.updateNewsFeedStore();
      });
    }
  }

  checkNewsFeedStore(){
    const lastPage:number = localStorage.getItem("currentPage") ? +localStorage.getItem("currentPage") : 0;
    let newsFeedStore:any = [];
    if(this.pageId && this.pageId == lastPage){
      newsFeedStore = JSON.parse(localStorage.getItem("newsFeedStore"));
    }
    return newsFeedStore;
  }

  updateNewsFeedStore(){
    localStorage.setItem("newsFeedStore", JSON.stringify(this.newsFeed));
    localStorage.setItem("currentPage", this.pageId.toString());
  }

  updatePageStore(val: string){
    if(val=='prev'){
      //TODO
    }
    else if(val=='next'){
      //TODO
    }
  }

  hideStory(index){
    this.newsFeed.splice(index,1);
    this.updateNewsFeedStore();
  }

  upVote(index, evt?: any){
    if(!evt || (evt.keyCode && (evt.keyCode == 13 || evt.keyCode == 32))){
      this.newsFeed[index].points++;
      this.updateNewsFeedStore();
    }
  }
}
