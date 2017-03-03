// import React from 'react';
// import { mount } from 'enzyme';
// import Suggestion from './Suggestion';
//
// const data = {
//   suggestion: {
//     heading: 'Waffles',
//     count: 10,
//     mapping: {
//       title: '',
//       description: '',
//       details: ''
//     },
//     results: []
//   }
// };
//
// describe('<Suggestion />', () => {
//   let wrapper;
//
//   beforeEach(() => {
//     wrapper = mount(
//       <Suggestion data={data} />,
//     );
//   });
//
//   it('should exist', () => {
//     expect(wrapper).to.exist;
//   });
//
//   it('should display the heading', () => {
//     const result = wrapper.contains(
//       <span className="heading">{data.heading} <span> {data.count}</span></span>,
//     );
//     expect(result).to.be.true;
//   });
//
//   it('should display the count', () => {
//     const result = wrapper.contains(
//       <span> {data.count}</span>,
//     );
//     expect(result).to.be.true;
//   });
// });
