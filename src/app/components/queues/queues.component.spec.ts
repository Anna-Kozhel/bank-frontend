import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuesComponent } from './queues.component';

describe('queuesComponent', () => {
  let component: QueuesComponent;
  let fixture: ComponentFixture<QueuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueuesComponent]
    });
    fixture = TestBed.createComponent(QueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
