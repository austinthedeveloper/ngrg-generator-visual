import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorCardComponent } from './generator-card.component';

describe('GeneratorCardComponent', () => {
  let component: GeneratorCardComponent;
  let fixture: ComponentFixture<GeneratorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
