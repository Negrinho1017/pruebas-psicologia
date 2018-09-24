import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularioComponent } from './vocabulario.component';

describe('VocabularioComponent', () => {
  let component: VocabularioComponent;
  let fixture: ComponentFixture<VocabularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
