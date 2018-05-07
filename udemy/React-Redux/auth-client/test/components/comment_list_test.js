import { renderComponent , expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('CommentList' , () => {
  let component;

  beforeEach(() => {
    const state = { comments: ['New Comment', 'Troll Comment'] };
    component = renderComponent(CommentList, null, state);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('comment-list');
  });

  it('renders an <li> for each comment', () => {
    expect(component.find('li').length).to.equal(2);
  });

  it('render each comment that is provided', () => {
    expect(component).to.contain('New Comment');
    expect(component).to.contain('Troll Comment');
  });
});
