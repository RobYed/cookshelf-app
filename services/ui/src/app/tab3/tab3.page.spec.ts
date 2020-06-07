import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageComponent } from './tab3.page';

describe('Tab3Page', () => {
  let component: Tab3PageComponent;
  let fixture: ComponentFixture<Tab3PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab3PageComponent],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
