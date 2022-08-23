import { Shallow } from 'shallow-render';
import { AppModule } from '../app.module';

import { NavbarComponent } from './navbar.component';

describe('Test NavbarComponent', () => {
  let component: Shallow<NavbarComponent>;

  beforeEach(() => {
    component = new Shallow(NavbarComponent, AppModule);
    jest.clearAllMocks();
  });

  it('should render Navbar', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('Navbar should contain nav links.', async () => {
    const { find } = await component.render();
    expect(find('.nav-link')).toHaveFoundMoreThan(0);
  });
});
