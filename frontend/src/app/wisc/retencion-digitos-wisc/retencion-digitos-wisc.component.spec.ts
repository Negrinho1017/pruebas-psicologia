import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetencionDigitosWiscComponent } from './retencion-digitos-wisc.component';

describe('RetencionDigitosWiscComponent', () => {
  let component: RetencionDigitosWiscComponent;
  let fixture: ComponentFixture<RetencionDigitosWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetencionDigitosWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetencionDigitosWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
