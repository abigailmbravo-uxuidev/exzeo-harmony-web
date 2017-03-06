const React = require('react');
const mockery = require('mockery');

const Route = ({ component }) => React.createElement(
  'div',
  null,
  component
);

Route.propTypes = {
  component: React.PropTypes.node
};

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});

const reactRouter = {
  Route
};

const reactApollo = {
  graphql: () => component => component
};

mockery.registerMock('react-apollo', reactApollo);
//mockery.registerMock('react-router', reactRouter);
