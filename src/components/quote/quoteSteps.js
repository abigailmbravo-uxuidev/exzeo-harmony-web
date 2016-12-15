import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SearchResults from '../common/search/SearchResults';
import Survey from '../common/question/Survey';

const query = gql`
    query SearchAddress($searchText: String!) {
        searchAddress(address:$searchText) {
            id
            address1
            address2
            city
            state
            zip
        }
    }
`;

const underwritingQuestions = gql`
    query UnderwritingQuestions($modelName: ID!) {
        questions: underwritingQuestions(quoteNumber:$modelName){
            id
            question
            description
            answers {
                answer
            }
            answerType
            optional
            styleName
        }
    }
`;

const PropertySearch = graphql(query)(SearchResults);
const Demographics = graphql(underwritingQuestions)(Survey);
const UnderWritingQA = graphql(underwritingQuestions)(Survey);
const Coverage = graphql(underwritingQuestions)(Survey);
const Share = graphql(underwritingQuestions)(Survey);
const BillingInfo = graphql(underwritingQuestions)(Survey);
const VerifyWrite = graphql(underwritingQuestions)(Survey);

const steps = {
  chooseAddress: {
    name: 'Property address',
    icon: 'fa-map-marker',
    url: '/property-address',
    status: 'selected',
    required: true,
    componentType: <PropertySearch searchText="123 Main" />,
  },
  askUWAnswers: {
    name: 'Undewriting Q & A',
    icon: 'fa-file-text-o',
    url: '/underwriting',
    status: 'disabled',
    required: true,
    component: <UnderWritingQA modelName="23456" />,
  },
  askAdditionalCustomerData: {
    name: 'Demographics',
    icon: 'fa fa-user',
    url: '/demographics',
    status: 'disabled',
    required: true,
    component: <Demographics modelName="23456" />,
  },
  askCoverage: {
    name: 'Coverage',
    icon: 'fa-umbrella',
    url: '/coverage',
    status: 'disabled',
    required: true,
    component: <Coverage modelName="23456" />,
  },
  shareIt: {
    name: 'Share',
    icon: 'fa-share-alt',
    url: '/share',
    status: 'disabled',
    required: true,
    component: <Share modelName="23456" />,
  },
  billingInfo: {
    name: 'Billing Info',
    icon: 'fa-dollar',
    url: '/billing',
    status: 'disabled',
    required: true,
    component: <BillingInfo modelName="23456" />,
  },
  verifyWrite: {
    name: 'Verify & write',
    icon: 'fa-check-square',
    url: '/verify',
    status: 'disabled',
    required: true,
    component: <VerifyWrite modelName="23456" />,
  },
};

export default steps;
