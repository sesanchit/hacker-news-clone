import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  activePageId = new BehaviorSubject<number>(1);

  constructor() { }

  updatePage(pageId: number){
    this.activePageId.next(pageId);
  }
}
