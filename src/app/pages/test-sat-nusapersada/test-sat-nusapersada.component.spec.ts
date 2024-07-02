import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSatNusapersadaComponent } from './test-sat-nusapersada.component';

describe('TestSatNusapersadaComponent', () => {
  let component: TestSatNusapersadaComponent;
  let fixture: ComponentFixture<TestSatNusapersadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSatNusapersadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestSatNusapersadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
