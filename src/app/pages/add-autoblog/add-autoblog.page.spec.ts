import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAutoblogPage } from './add-autoblog.page';

describe('AddAutoblogPage', () => {
  let component: AddAutoblogPage;
  let fixture: ComponentFixture<AddAutoblogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAutoblogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAutoblogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
