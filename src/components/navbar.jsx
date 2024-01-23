import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ReactComponent as BrandLogo } from "./food-dinner-svgrepo-com.svg";
import { Link } from "react-router-dom";

function TopNavBar() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        data-bs-theme="dark"
      >
        <Container fluid>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavBar;
