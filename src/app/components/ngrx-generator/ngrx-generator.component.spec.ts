import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxGeneratorComponent } from './ngrx-generator.component';

describe('NgrxGeneratorComponent', () => {
  let component: NgrxGeneratorComponent;
  let fixture: ComponentFixture<NgrxGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
