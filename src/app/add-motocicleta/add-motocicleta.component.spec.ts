import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMotocicletaComponent } from './add-motocicleta.component';

describe('AddMotocicletaComponent', () => {
  let component: AddMotocicletaComponent;
  let fixture: ComponentFixture<AddMotocicletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMotocicletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMotocicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
