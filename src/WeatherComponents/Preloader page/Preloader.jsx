import React from 'react';
import styled from 'styled-components';
import logo from '../../images/weather-2021-12-07.png'

const Preloader = () => {
  return (
    <Wrapper>
      <div class="preloader">
        <div class="preloader-inner">
          <div class="preloader-logo">
            <img src={logo} alt={logo}/>
          </div>
          <div class="preloader-progress"></div>
        </div>
      </div>
      <footer style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", bottom: "3%"}}>
        <span style={{color: "blue"}}>Coded and Designed By <a style={{color: "red"}} href="https://olayinka-dev-portfolio.netlify.app">Olayinka_Dev</a></span>
      </footer>
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
    border-radius: 50%;
    height: auto;
    animation: loadlogo 1s linear infinite;
  }
  @keyframes loadlogo {
    0%{transform: scale(90%);}
    100%{transform: scale(115%);}
  }
  
  .preloader-progress {
    width: 100%;
    height: 5px;
    background-color: #fff;
    position: relative;
    margin-top: 20px;
  }
  
  .preloader-progress:before {
    content: "";
    width: 0%;
    height: 100%;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    animation: progress 3s ease-in-out forwards;
  }
  
  @keyframes progress {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

// const Wrapper = styled.div`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }


//   .preloader {
//     background-color: #fff;
//     z-index: 9999;
//     height: 100vh;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }
  
//   .preloader-inner {
//     text-align: center;
//   }
  
  // .preloader-logo img {
  //   width: 100px;
  //   border-radius: 50%;
  //   height: auto;
  //   animation: loadlogo 1s linear infinite;
  // }
  // @keyframes loadlogo {
  //   0%{transform: scale(90%);}
  //   100%{transform: scale(115%);}
  // }
//   .preloader-progress {
//     width: 100%;
//     height: 5px;
//     background-color: #000;
//     position: relative;
//     margin-top: 20px;
//   }
  
//   .preloader-progress:before {
//     content: "";
//     width: 100%;
//     height: 100%;
//     background-color: #fff;
//     position: absolute;
//     top: 0;
//     left: 0;
//     animation: progress 2s ease-in-out backwards;
//   }
  
//   @keyframes progress {
//     0% {
//       width: 100%;
//     }
//     100% {
//       width: 0%;
//     }
//   }

// `;
export default Preloader;