import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptButtonComponent } from './prompt-button.component';

describe('PromptButtonComponent', () => {
  let component: PromptButtonComponent;
  let fixture: ComponentFixture<PromptButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
