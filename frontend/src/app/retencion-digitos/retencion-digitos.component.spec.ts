import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetencionDigitosComponent } from './retencion-digitos.component';

describe('RetencionDigitosComponent', () => {
  let component: RetencionDigitosComponent;
  let fixture: ComponentFixture<RetencionDigitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetencionDigitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetencionDigitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
