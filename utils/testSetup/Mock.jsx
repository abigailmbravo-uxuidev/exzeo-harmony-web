const React = require('react');
const mockery = require('mockery');

const Match = ({ component }) => React.createElement(
  'div',
  null,
  component,
);

Match.propTypes = {
  component: React.PropTypes.node,
};

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false,
});

const reactRouter = {
  Match,
};

const reactApollo = {
  graphql: () => component => component,
};

mockery.registerMock('react-apollo', reactApollo);
mockery.registerMock('react-router', reactRouter);
