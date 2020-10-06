import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditContactGroupPage } from './edit-contact-group.page';

describe('EditContactGroupPage', () => {
  let component: EditContactGroupPage;
  let fixture: ComponentFixture<EditContactGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContactGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditContactGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
