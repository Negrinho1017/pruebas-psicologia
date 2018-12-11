import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularioWiscComponent } from './vocabulario-wisc.component';

describe('VocabularioWiscComponent', () => {
  let component: VocabularioWiscComponent;
  let fixture: ComponentFixture<VocabularioWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularioWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularioWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
