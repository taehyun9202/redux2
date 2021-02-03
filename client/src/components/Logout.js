import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import PropTypes from 'prop-types'
import { NavLink } from 'reactstrap'

function Logout(props) {

    Logout.propTypes = {
        logout: PropTypes.func.isRequired
    }

    const onClickHandler = () => {
        props.logout()
    }

    return (
        <Fragment style={{cursor:'pointer'}}>
            <NavLink onClick={onClickHandler}>Log out</NavLink>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
})


export default connect(mapStateToProps, { logout })(Logout)
