import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageComponent } from './tab2.page';

describe('Tab2Page', () => {
  let component: Tab2PageComponent;
  let fixture: ComponentFixture<Tab2PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2PageComponent],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
