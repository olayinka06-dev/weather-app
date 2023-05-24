import React from 'react';
import styled from 'styled-components';

const Preloader = () => {
  return (
    <Wrapper className='loader'>
      <div className="progress-bar" />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .progress-bar {
    width: 200px;
    height: 10px;
    background-color: lightgray;
  }

  .progress-bar:before {
    content: '';
    display: block;
    width: 0;
    height: 100%;
    background-color: blue;
    transition: width 0.3s ease-in-out;
  }

  .loader .progress-bar:before {
    width: 100%;
  }
`;
export default Preloader;