import renderer from 'react-test-renderer';
import Reviews from './Reviews.jsx';

it('Renders the initial component', () => {
  const component = renderer.create(<Reviews />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});