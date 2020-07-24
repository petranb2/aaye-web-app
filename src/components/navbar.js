import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {
    NavLink as Link
} from "react-router-dom";


const TopNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Dashboard</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem >
                            <Link to="/home" className="nav-link" >Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/home/users' className="nav-link" >Users</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/home/newUser' className="nav-link" >New User</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Protected Pages
              </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/home" className="nav-link" >Auth Home</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to="/home/logout" className="nav-link" >Logout</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default TopNav;