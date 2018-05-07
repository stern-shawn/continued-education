import { renderComponent , expect } from '../test_helper';
import App from '../../src/components/app';

describe('App' , () => {
  let component;
  // Dummy auth state since application state needs to be mocked to get App to render without reference errors
  let auth = {
    authenticated: false,
    userProfile: {
      firstName: 'John',
      lastName: 'Doe',
    },
  };

  beforeEach(() => {
    component = renderComponent(App, {}, { auth });
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('shows the comment box', () => {
    expect(component.find('.comment-box')).to.exist;
  });
});
