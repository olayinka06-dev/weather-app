import React from 'react';
import styled from 'styled-components';

const Preloader = () => {
  return (
    <Wrapper>
      <div class="preloader">
        <div class="preloader-inner">
          <div class="preloader-logo">
            Insert your logo or any image here
            {/* <img src="./images/check-line.png" alt=""/> */}
          </div>
          <div class="preloader-progress"></div>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  .preloader {
    background-color: #fff;
    z-index: 9999;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .preloader-inner {
    text-align: center;
  }
  
  .preloader-logo img {
    width: 100px;
    height: auto;
  }
  
  .preloader-progress {
    width: 100%;
    height: 5px;
    background-color: #000;
    position: relative;
    margin-top: 20px;
  }
  
  .preloader-progress:before {
    content: "";
    width: 0%;
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    animation: progress 2s ease-in-out backwards;
  }
  
  @keyframes progress {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }

  // .progress-bar {
  //   width: 200px;
  //   height: 10px;
  //   background-color: lightgray;
  // }

  // .progress-bar:before {
  //   content: '';
  //   display: block;
  //   width: 0;
  //   height: 100%;
  //   background-color: blue;
  //   transition: width 0.3s ease-in-out;
  // }

  // .loader .progress-bar:before {
  //   width: 100%;
  // }
`;
export default Preloader;