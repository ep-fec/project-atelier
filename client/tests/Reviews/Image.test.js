import renderer from 'react-test-renderer';
import Image from '../../src/components/reviews/components/Image.jsx';

it('Renders the Image component correctly', () => {
  const currentProduct = {id: 71697}
  const tree = renderer.create(<Reviews currentProduct={currentProduct}/>).toJSON();
  expect(tree).toMatchSnapshot();
});