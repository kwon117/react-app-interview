import React, { Component } from 'react';
import IWA from './IWA/IWA.js';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <IWA 
          finalText={null}
          finalPic={null}
        />
      </Container>
    );
  }
}

export default App;
