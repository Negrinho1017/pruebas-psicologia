import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionWiscComponent } from './informacion-wisc.component';

describe('InformacionWiscComponent', () => {
  let component: InformacionWiscComponent;
  let fixture: ComponentFixture<InformacionWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
