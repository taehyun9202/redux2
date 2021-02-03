import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function AppNavbar(props) {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ user, setUser ] = useState(props.loggedinuser)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    AppNavbar.propTypes = {
        loggedinuser: PropTypes.string,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired
    }

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">
                        ShoppingList
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        {props.isAuthenticated ? 
                            <Nav className="ml-auto">
                                <NavItem>
                                    <span className="navbar-text mr-3">
                                        <strong>Hello {user.name}!</strong>
                                    </span>
                                </NavItem>
                                <NavItem>
                                    <Logout />
                                </NavItem>
                            </Nav>
                            :
                            <Nav className="ml-auto">
                                <NavItem>
                                    <Register />
                                </NavItem>
                                <NavItem>
                                    <Login />
                                </NavItem>
                            </Nav>
                            }
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedinuser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, null )(AppNavbar)
