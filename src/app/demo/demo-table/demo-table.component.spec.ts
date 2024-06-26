import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTableComponent } from './demo-table.component';

describe('DemoTableComponent', () => {
  let component: DemoTableComponent;
  let fixture: ComponentFixture<DemoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
