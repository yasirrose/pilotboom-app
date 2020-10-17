import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditActivityPage } from './edit-activity.page';

describe('EditActivityPage', () => {
  let component: EditActivityPage;
  let fixture: ComponentFixture<EditActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
