import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  activePageId = new BehaviorSubject<number>(1);
  pageChangeDirection = new Subject<string>();

  constructor() { }

  updatePage(pageId: number){
    this.activePageId.next(pageId);
  }

  updatePageChangeDirection(pageMove: string){
    this.pageChangeDirection.next(pageMove);
  }

}
