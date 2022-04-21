import React from 'react';
import { Navbar, Container, NavDropdown, Nav, Form, FormControl, Button  } from 'react-bootstrap';
import logo from '../i/logo.png';
export default  function Header() {
    return (
      <>
        <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
            <Container fluid>
                <Navbar.Brand href="#" className="d-flex align-items-center">
                    <img src={logo} alt="logo" className="me-2" />
                    {process.env.REACT_APP_NAME}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0">
                    {/* <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                    <NavDropdown title="Link">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                {/* <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
                </Navbar.Collapse>
            </Container>
            </Navbar>
      </>
    );
}