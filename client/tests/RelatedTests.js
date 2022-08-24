import renderer from 'react-test-renderer';
import Related from '../src/components/related-products/Related.jsx';

it('Renders the initial component', () => {
  const component = renderer.create(<Related/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});