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

mockery.registerMock('react-router', reactRouter);
