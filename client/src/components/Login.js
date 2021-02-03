import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function Login(props) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ modal , setModal] = useState(false)
    const [ error, setError ] = useState(null)

    const handleToggle = () => {
        setModal(!modal)
    }

    Login.propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    useEffect(() => {
      console.log(props.error)
      if(props.error.id === "LOGIN_FAIL"){
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
      const usertoLogin = { email, password }
      props.login(usertoLogin)
      setEmail('')
      setPassword('')
  }
    return (
        <div>
      <NavLink onClick={handleToggle} href="#">
        Log in
      </NavLink>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Log in</ModalHeader>
        <ModalBody>
          {error ? <Alert color="danger">{error}</Alert> : null}
          <Form onSubmit={onSubmitHandler}>
            <FormGroup>
                <Label for="name">Name</Label>
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
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Log in
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
    error: state.error
})


export default connect(mapStateToProps, { login, clearErrors })(Login)
