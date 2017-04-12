import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

const middlewares = [];
const mockStore = configureStore(middlewares);

const components = [];

// additional interest
import AdditionalInsured from '../components/AdditionalInterests/AdditionalInsured';
import AdditionalInterest from '../components/AdditionalInterests/AdditionalInterest';
import BillPayer from '../components/AdditionalInterests/BillPayer';
import Lienholder from '../components/AdditionalInterests/Lienholder';
import Mortgagee from '../components/AdditionalInterests/Mortgagee';

// assumptions
import Assumptions from '../components/Assumptions/Assumptions';

// billing
import Billing from '../components/Billing/Billing';

// common
import EmailPopup from '../components/Common/EmailPopup';
import ErrorPopup from '../components/Common/ErrorPopup';
import Footer from '../components/Common/Footer';
import Loader from '../components/Common/Loader';
import ScheduleDate from '../components/Common/ScheduleDate';

// customer info
import CustomerInfo from '../components/CustomerInfo/CustomerInfo';

// customize
import Customize from '../components/Customize/Customize';

// error
import CheckError from '../components/Error/CheckError';
import ClearError from '../components/Error/ClearError';
import Error from '../components/Error/Error';

// policy holder
import PolicyHolder from '../components/PolicyHolder/PolicyHolder';

// search
import NoResults from '../components/Search/NoResults';
import Search from '../components/Search/Search';
import SearchBar from '../components/Search/SearchBar';
import SearchResults from '../components/Search/SearchResults';

// share
import Share from '../components/Share/Share';

// thank you
import ThankYou from '../components/ThankYou/ThankYou';

// underwriting
import Underwriting from '../components/Underwriting/Underwriting';

// verify
import Verify from '../components/Verify/Verify';

// workflow
import TaskRunner from '../components/Workflow/TaskRunner';
import WorkflowDetails from '../components/Workflow/WorkflowDetails';
import Workflow from '../components/Workflow/Workflow';

// containers
import AppError from '../containers/AppError';
import Base from '../containers/Base';
import Login from '../containers/Login';
import NotFound from '../containers/NotFound';
import Quote from '../containers/Quote';
import Splash from '../containers/Splash';


// this test will check each component for rendering, if the component does not render it will throw an error
components = [
  <AdditionalInsured />,
  <AdditionalInterest />,
  <BillPayer />,
  <Lienholder />,
  <Mortgagee />,
  <Assumptions />,
  <Billing />,
  <EmailPopup />,
  <ErrorPopup />,
  <Footer />,
  <Loader />,
  <ScheduleDate />,
  <CustomerInfo />,
  <Customize />,
  <CheckError />,
  <ClearError />,
  <Error />,
  <PolicyHolder />,
  <NoResults />,
  <Search />,
  <SearchBar />,
  <SearchResults />,
  <Share />,
  <ThankYou />,
  <Underwriting />,
  <Verify />,
  <TaskRunner />,
  <WorkflowDetails />,
  <Workflow />,
  <AppError />,
  <Base />,
  <Login />,
  <NotFound />,
  <Quote />,
  <Splash />
];

describe('All components must render', () => {
  it('should render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    components.forEach(component => {
      const wrapper = shallow(<Provider store={store}>{component}</Provider>);
      expect(wrapper);
    });
  });
});
