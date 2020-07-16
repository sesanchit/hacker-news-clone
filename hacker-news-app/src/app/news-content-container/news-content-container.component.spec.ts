import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsContentContainerComponent } from './news-content-container.component';

describe('NewsContentContainerComponent', () => {
  let component: NewsContentContainerComponent;
  let fixture: ComponentFixture<NewsContentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsContentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
