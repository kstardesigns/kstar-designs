import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAccordionComponent } from './header-accordion.component';

describe('HeaderAccordionComponent', () => {
  let component: HeaderAccordionComponent;
  let fixture: ComponentFixture<HeaderAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
