import React from 'react'
import styled from 'styled-components';

const Navigation = () => {
  return (
    <Nav>
        <Logo>
            <h1>WEATHER</h1>
        </Logo>
        <NavDesktop>
            <NavLink>Home</NavLink>
            <NavLink>Coords</NavLink>
            <NavLink>Coords & Map</NavLink>
        </NavDesktop>
    </Nav>
  )
}

const Nav = styled.nav`
    
    height: 7vh;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

`

const NavDesktop = styled.div`
    
`;

const NavLink = styled.a`
    
    display: inline-block;
    margin-right: 30px;
    color: blue;

`

export default Navigation;