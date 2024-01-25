import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ReactComponent as BrandLogo } from "./food-dinner-svgrepo-com.svg";
import { Link } from "react-router-dom";
import Cart from "./cart";

function TopNavBar() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        data-bs-theme="dark"
      >
        <Container fluid className="d-flex ">

            <Navbar.Brand href="#home">Dinner Dash</Navbar.Brand>
            <BrandLogo />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/items">Items</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/orders">Orders</Link>
                </Nav.Link>
              </Nav>
              <button
                onClick={() => toggleVisibility()}
                className="btn btn-primary"
              ></button>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="d-flex justify-content-end cart-row">{isVisible ? <Cart /> : <></>}</div>
    </>
  );
}

export default TopNavBar;
