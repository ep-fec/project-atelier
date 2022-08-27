import renderer from 'react-test-renderer';
import Reviews from '../../src/components/reviews/Reviews.jsx';

it('Renders the initial Reviews component correctly', async () => {
  const currentProduct = {id: 71697}
  const tree = await renderer.create(<Reviews currentProduct={currentProduct}/>).toJSON();
  await expect(tree).toMatchSnapshot();
});