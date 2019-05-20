import toJson from 'enzyme-to-json';
import createTestContext from 'react-cosmos-test/enzyme';
import wait from 'waait';

import fixture from './ClassifyImages.fixture';

const { mount, getWrapper } = createTestContext({ fixture });

describe('Classify Images', () => {
  beforeEach(mount);

  it('renders loading screen correctly', () => {
    expect(toJson(getWrapper())).toMatchSnapshot();
  });

  it('renders correctly', async () => {
    await wait(0);
    expect(toJson(getWrapper())).toMatchSnapshot();
  });
});
