import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import _ from 'lodash';
import configureStore from 'redux-mock-store';
import SearchResults, { Results } from './SearchResults';

describe('SearchResults', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});
  let props = {};
  props = {
    data: {
      steps: {
        data: []
      }
    }
  };

  it('should render Results', () => {
    // const newProps = _.cloneDeep(props);
    props.initialValues = {};
    const wrapper = shallow(<Results
      handleClick={function () { return true; }}
      addresses={[{
        id: '1201108965C71AE50',
        source: 'casaclue',
        residenceType: 'N/A',
        physicalAddress: {
          city: 'SOUTHWEST RANCHES',
          latitude: '26.050010',
          zip: '33332',
          state: 'FL',
          address2: '',
          longitude: '-80.403270',
          county: 'BROWARD',
          address1: '19101 SW 56 ST'
        }
      },
      {
        id: '1201108965C71AE51',
        source: 'casaclue',
        residenceType: 'N/A',
        physicalAddress: {
          city: 'SOUTHWEST RANCHES',
          latitude: '26.050010',
          zip: '33332',
          state: 'FL',
          address2: '',
          longitude: '-80.403270',
          county: 'BROWARD',
          address1: '18101 SW 57 ST'
        }
      }]}
    />);

    expect(wrapper).to.exist;

    expect(wrapper.find('li')).to.have.length(2);
  });

  it('should render SearchResults, with initialize', () => {
    // const newProps = _.cloneDeep(props);..+
    const wrapper = mount(<Provider store={store}>
      <SearchResults {...props} />
    </Provider>);

    const newProps = _.cloneDeep(props);

    newProps.data.steps.data = [
      {
        id: '1201108965C71AE50',
        source: 'casaclue',
        residenceType: 'N/A',
        physicalAddress: {
          city: 'SOUTHWEST RANCHES',
          latitude: '26.050010',
          zip: '33332',
          state: 'FL',
          address2: '',
          longitude: '-80.403270',
          county: 'BROWARD',
          address1: '19101 SW 56 ST'
        }
      },
      {
        id: '120110B3C1E8AA97C',
        source: 'casaclue',
        residenceType: 'N/A',
        physicalAddress: {
          city: 'SOUTHWEST RANCHES',
          latitude: '26.055230',
          zip: '33332',
          state: 'FL',
          address2: '',
          longitude: '-80.397220',
          county: 'BROWARD',
          address1: '5201 SW 186 AVE'
        }
      }
    ];

    wrapper.setProps({ data: newProps.data });
    wrapper.setState({ results: newProps.data.steps.data });

    expect(wrapper).to.exist;

    expect(wrapper.instance().props.data).to.equal(newProps.data);
    expect(wrapper.instance().state.results).to.equal(newProps.data.steps.data);


    expect(wrapper.find('SearchResults')).to.have.length(1);
  });
});
