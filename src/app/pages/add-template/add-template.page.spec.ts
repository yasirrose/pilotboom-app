import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTemplatePage } from './add-template.page';

describe('AddTemplatePage', () => {
  let component: AddTemplatePage;
  let fixture: ComponentFixture<AddTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTemplatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
