import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginationService } from '../pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  disablePrev: boolean = true;
  pageId: number;

  routeQueryParams: any={
    'page': null
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paginationService: PaginationService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.routeQueryParams.page = params && params.page ? Number.parseInt(params.page) : null;
      const pageNumber = this.routeQueryParams.page;
      if(pageNumber>0){
        this.pageId = pageNumber;
        if(this.pageId>1){
          this.disablePrev = false;
        }
      }
      else{
        this.pageId = 1;
        this.disablePrev = true;
      }
      this.setPageId();
    });
  }

  setPageId(){
    this.paginationService.updatePage(this.pageId);
  }

  onPrevious(){
    this.pageId--;
    if(this.pageId == 1)
      this.disablePrev=true;
    this.setPageId();
    this.updateRoute();
  }

  onNext(){
    this.pageId++;
    this.disablePrev = false;
    this.setPageId();
    this.updateRoute();
  }

  updateRoute(){
    const queryParams: Params = { page: this.pageId };
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge',
      });
    }
}
