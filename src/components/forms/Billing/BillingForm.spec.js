import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import questionsMock from './questionsMock';
// import configureStore from 'redux-mock-store';
import BillingForm from './BillingForm';

describe('BillingForm', () => {
  // const mockStore = configureStore([]);
  // const store = mockStore({});
  let props = {};


  beforeEach(() => {
    props = {
      push: fn => fn,
      completeStep: fn => fn,
      reset: fn => fn,
      dispatch: fn => fn,
      children: [],
      data: {
        completeStep: { link: fn => fn },
        refetch: fn => fn,
        steps: {
          questions: questionsMock,
          details: [{ name: 'Annual Premium', value: 500000 }, { name: 'Coverage A', value: 50000 }],
          name: 'old',
          data: [{
            _id: '5866c036a46eb72908f3f547',
            companyCode: 'TTIC',
            state: 'FL',
            product: 'HO3',
            quoteNumber: '12-1234567-12',
            billToId: '5866c036a46eb72908f3f547',
            billPlan: 'Annual',
            eligibility: 'Yes',
            effectiveDate: '2017-01-04T20:14:46.793Z',
            endDate: '2018-01-04T20:14:46.793Z',
            agencyId: '20000',
            agentId: '60000',
            property: {
              id: '12089DF01D986BF1A',
              source: 'CasaClue',
              physicalAddress: {
                address1: '95155 STINGRAY LN',
                address2: '',
                city: 'FERNANDINA BEACH',
                state: 'FL',
                county: 'NASSAU',
                zip: '32034',
                latitude: 30.57729,
                longitude: -81.50374,
                _id: '5866c036a46eb72908f3f55b'
              },
              residenceType: 'Single Family',
              yearBuilt: 2005,
              constructionType: 'Frame',
              territory: '892-0',
              protectionClass: 'A',
              buildingCodeEffectivenessGrading: 99,
              familyUnits: '1-2',
              squareFeet: 2066,
              sprinkler: 'no',
              floodZone: 'V',
              windMitigation: {
                roofGeometry: 'Other',
                roofDeckAttachment: 'A',
                secondaryWaterResistance: false,
                windBorneDebrisRegion: false,
                terrain: 'B',
                _id: '5866c036a46eb72908f3f55a'
              },
              _id: '5866c036a46eb72908f3f559',
              gatedCommunity: false,
              burglarAlarm: false,
              fireAlarm: false,
              trampoline: false,
              divingBoard: false,
              poolSecured: false,
              pool: false
            },
            rating: {
              engineCode: 'HO3ByPeril',
              rateCode: '0417',
              _id: '5866c036a46eb72908f3f548'
            },
            underwritingExceptions: [],
            underwritingAnswers: {
              noPriorInsuranceSurcharge: {
                question: 'No Prior Insurance Surcharge',
                answer: 'false',
                source: 'Default',
                _id: '5866c036a46eb72908f3f54a'
              },
              floodCoverage: {
                question: 'Flood Coverage',
                answer: 'yes',
                source: 'Default',
                _id: '5866c036a46eb72908f3f549'
              }
            },
            deductibles: {
              hurricane: {
                displayText: 'Hurricane',
                amount: 0.2,
                format: 'Percentage',
                ofCoverageLimit: '2%',
                _id: '5866c036a46eb72908f3f54c'
              },
              allOtherPerils: {
                displayText: 'All Other Perils',
                amount: 1000,
                format: 'Currency',
                _id: '5866c036a46eb72908f3f54b'
              }
            },
            coverageOptions: {
              personalPropertyReplacementCost: {
                displayText: 'Personal Property Replacement Coverage',
                answer: false,
                _id: '5866c036a46eb72908f3f550'
              },
              sinkholePerilCoverage: {
                displayText: 'Sinkhole Peril Coverage',
                answer: false,
                _id: '5866c036a46eb72908f3f550'
              },
              propertyIncidentalOccupanciesMainDwelling: {
                displayText: 'Property Incidental Occupancies Main Dwelling',
                answer: false,
                _id: '5866c036a46eb72908f3f54f'
              },
              propertyIncidentalOccupanciesOtherStructures: {
                displayText: 'Property Incidental Occupancies Other Structures',
                answer: false,
                _id: '5866c036a46eb72908f3f54e'
              },
              liabilityIncidentalOccupancies: {
                displayText: 'liability Incidental Occupancies',
                answer: false,
                _id: '5866c036a46eb72908f3f54d'
              }
            },
            coverageLimits: {
              dwelling: {
                displayText: 'Dwelling',
                amount: 10000000,
                format: 'Currency',
                minAmount: 2000000,
                maxAmount: 2000000,
                _id: '5866c036a46eb72908f3f558'
              },
              otherStructures: {
                displayText: 'Other Structures',
                amount: 1000000,
                format: 'Currency',
                _id: '5866c036a46eb72908f3f557'
              },
              ordinanceOrLaw: {
                displayText: 'Ordinance Or Law',
                amount: 1000000,
                format: 'Currency',
                _id: '5866c036a46eb72908f3f557'
              },
              personalProperty: {
                displayText: 'Personal Property',
                amount: 500000,
                format: 'Currency',
                _id: '5866c036a46eb72908f3f556'
              },
              lossOfUse: {
                displayText: 'Loss of Use',
                amount: 1000000,
                format: 'Currency',
                _id: '5866c036a46eb72908f3f555'
              },
              personalLiability: {
                displayText: 'Personal Liability',
                amount: 100000,
                format: 'Currency',
                _id: '5866c036a46eb72908f3f554'
              },
              medicalPayments: {
                displayText: 'Medical Payments',
                amount: 2000,
                format: 'Currency',
                _id: '5866c036a46eb72908f3f553'
              },
              moldProperty: {
                displayText: 'Mold Property',
                amount: 10000,
                format: 'Currency',
                _id: '5866c036a46eb72908f3f552'
              },
              moldLiability: {
                displayText: 'Mold Liability',
                amount: 50000,
                format: 'Currency',
                _id: '5866c036a46eb72908f3f551'
              }
            },
            additionalInterests: [
              {
                type: 'Mortgagee',
                name1: 'BB1',
                name2: 'CC1',
                active: true,
                referenceNumber: '1001',
                phoneNumber: '1234567890',
                mailingAddress: {
                  address1: '123 this way dr',
                  city: 'Tampa',
                  state: 'FL',
                  zip: '33611',
                  country: {
                    code: 'US',
                    displayText: 'United States'
                  }
                }
              },
              {
                type: 'Mortgagee',
                name1: 'BB2',
                name2: 'CC2',
                active: true,
                referenceNumber: '1001',
                phoneNumber: '1234567890',
                mailingAddress: {
                  address1: '123 this way dr',
                  city: 'Tampa',
                  state: 'FL',
                  zip: '33611',
                  country: {
                    code: 'US',
                    displayText: 'United States'
                  }
                }
              },
              {
                type: 'Mortgagee',
                name1: 'BB3',
                referenceNumber: '1001',
                phoneNumber: '1234567890',
                name2: 'CC3',
                active: true,
                mailingAddress: {
                  address1: '123 this way dr',
                  city: 'Tampa',
                  state: 'FL',
                  zip: '33611',
                  country: {
                    code: 'US',
                    displayText: 'United States'
                  }
                }
              }
            ],
            policyHolderMailingAddress: {
              careOf: null,
              address1: '1000 Poplar Ave',
              address2: null,
              city: 'Tampa',
              state: 'FL',
              zip: '33607',
              country: {
                code: 'USA',
                displayText: 'United States of America'
              }
            },
            policyHolders: [
              {
                id: 'DFBDFBDF1',
                order: 1,
                entityType: 'Person',
                firstName: 'Bryan1',
                lastName: 'BBBB',
                emailAddress: 'bb1@bb.com',
                primaryPhoneNumber: '813-555-3456'
              },
              {
                id: 'DFBDFBDF2',
                order: 2,
                entityType: 'Person',
                firstName: 'Bryan2',
                lastName: 'BBBB',
                emailAddress: 'bb2@bb.com',
                primaryPhoneNumber: '813-555-3456'
              }
            ],
            __v: 0
          }]
        }
      },
      fieldValues: {},
      handleSubmit: fn => fn,
      handleOnSubmit: fn => fn,
      initialize: fn => fn,
      initialValues: {},
      styleName: ''
    };
    props.reset = function () { props.pristine = true; };
    props.completeStep = function () { return new Promise(() => { }); };
    props.data.refetch = function () { return props; };
    props.push = function (s) { return s; };
  });

  it('should render BillingForm with redux form wrapper', () => {
  //  const Billing = reduxForm({ form: 'Billing' })(BillingForm);
    const wrapper = shallow(<BillingForm {...props} />);
    expect(wrapper).to.exist;
    expect(wrapper.find('Form')).to.have.length(1);
  });

  it('should submit', () => {
  //  const Billing = reduxForm({ form: 'Billing' })(BillingForm);
    const wrapper = shallow(<BillingForm {...props} />);


    expect(wrapper).to.exist;
    expect(wrapper.find('Form')).to.have.length(1);

    wrapper.instance().handleOnSubmit();
  });

  it('should fillMailForm then reset values', () => {
  //  const Billing = reduxForm({ form: 'Billing' })(BillingForm);
    const wrapper = shallow(<BillingForm {...props} />);

    expect(wrapper).to.exist;
    expect(wrapper.find('Form')).to.have.length(1);
    // fill
    wrapper.instance().fillMailForm();
    expect(wrapper.instance().state.values.address1).to.equal('95155 STINGRAY LN');
    expect(wrapper.instance().state.values.state).to.equal('FL');

    // reset
    wrapper.instance().fillMailForm();
    expect(wrapper.instance().state.values.address1).to.equal('');
    expect(wrapper.instance().state.values.state).to.equal('');
  });
});
