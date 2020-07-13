import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrestationComponent } from './new-prestation.component';

describe('NewPrestationComponent', () => {
  let component: NewPrestationComponent;
  let fixture: ComponentFixture<NewPrestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPrestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
