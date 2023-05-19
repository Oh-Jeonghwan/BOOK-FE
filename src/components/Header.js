import React from 'react';
import { Nav, Container, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
          <Navbar bg="primary" variant="dark">
            <Link to="/" className='navbar-brand'>home</Link>
            <Nav className="me-auto">
              {/* <Nav.Link href="#home">글쓰기</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> 
                href -> X 왜일까요??????*/}
              <Link to="/saveForm" className='nav-link'>글쓰기</Link>
              <Link to="/joinForm" className='nav-link'>회원가입</Link>
              <Link to="/loginForm" className='nav-link'>로그인</Link>
            </Nav>
            <Form>
              <FormControl type="text" placeholder='Search' className="mr-sm-2"/>
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
          <br />
        </>
      );
};

export default Header; 