import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux'
import { register } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import PropTypes from 'prop-types'

function Register(props) {
    const [ userName, setUserName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ modal , setModal] = useState(false)
    const [ error, setError ] = useState(null)
    const handleToggle = () => {
        props.clearErrors()
        setModal(!modal)
    }

    Register.propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    useEffect(() => {
        console.log(props.error)
        if(props.error.id === "REGISTER_FAIL"){
            setError(props.error.msg.msg)
        } else {
            setError(null)
        }
    },[props.error])

    useEffect(() => {
        if(props.isAuthenticated) {
            setModal(false)
        }
    },[props.isAuthenticated])

    const onSubmitHandler = e => {
        e.preventDefault()
        const newUser = { userName, email, password, confirmPassword }
        props.register(newUser)
        setUserName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }
    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Register
            </NavLink>

            <Modal isOpen={modal} toggle={handleToggle}>
            <ModalHeader toggle={handleToggle}>Register</ModalHeader>
            <ModalBody>
                {error ? <Alert color="danger">{error}</Alert> : null}
                <Form onSubmit={onSubmitHandler}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name={userName}
                            id="userName"
                            placeholder="Enter Name"
                            className="mb-3"
                            onChange={e => setUserName(e.target.value)}
                        />
                        <Input
                            type="email"
                            name={email}
                            id="email"
                            placeholder="Enter Email"
                            className="mb-3"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            name={password}
                            id="password"
                            placeholder="Enter Password"
                            className="mb-3"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Input
                            type="password"
                            name={confirmPassword}
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            className="mb-3"
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <Button color="dark" style={{ marginTop: '2rem' }} block>
                            Register
                        </Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
})


export default connect(mapStateToProps, { register, clearErrors })(Register)