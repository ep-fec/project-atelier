import renderer from 'react-test-renderer';
import Overview from '../src/components/product-overview/Overview.jsx';

it('Renders the initial component', () => {
  const component = renderer.create(<Overview />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});