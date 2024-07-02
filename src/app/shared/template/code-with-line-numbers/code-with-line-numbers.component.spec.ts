import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeWithLineNumbersComponent } from './code-with-line-numbers.component';

describe('CodeWithLineNumbersComponent', () => {
  let component: CodeWithLineNumbersComponent;
  let fixture: ComponentFixture<CodeWithLineNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeWithLineNumbersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeWithLineNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
