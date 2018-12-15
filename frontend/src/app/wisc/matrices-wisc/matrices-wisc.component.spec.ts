import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricesWiscComponent } from './matrices-wisc.component';

describe('MatricesWiscComponent', () => {
  let component: MatricesWiscComponent;
  let fixture: ComponentFixture<MatricesWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatricesWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatricesWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
