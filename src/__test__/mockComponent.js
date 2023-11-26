// __mocks__/mockComponent.js

import React from 'react';

const mockComponent = (name) => {
  const RealComponent = require.requireActual(name);

  class MockedComponent extends React.Component {
    render() {
      return <RealComponent {...this.props} />;
    }
  }

  return MockedComponent;
};

export default mockComponent;
