import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
  const HeaderNavbar = () => {
return(
    <Nav className="navbar navbar-dark bg-dark">
            <NavItem>
              <Link href="/">
                <a className="navbar-brand">Home</a>
              </Link>
            </NavItem>
                <NavItem>
                  <Link href="/">
                    <a className="logout" >
                      Logout
                    </a>
                  </Link>
                </NavItem>
             
                <NavItem className="ml-auto">
                  <Link href="/signin">
                    <a className="nav-link">Sign In</a>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <a className="nav-link"> Sign Up</a>
                  </Link>
                </NavItem>
              
          </Nav>)
  }
  
  export default HeaderNavbar;