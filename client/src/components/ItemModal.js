import React, { useState } from 'react'
import { Container, Form, FormGroup, Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'
import PropTypes from 'prop-types'
import * as actions from '../actions/types'

function ItemModal(props) {
    const [ itemName, setItemName ] = useState('')
    ItemModal.propTypes = {
        isAuthenticated: PropTypes.bool
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        if(itemName) {
            const newItem = { 
                name: itemName
            }
            props.addItem(newItem)
            setItemName('')
        }
    }
    return (
        <div>
            {props.isAuthenticated ? 
            <Container>
                <Form onSubmit={onSubmitHandler}>
                    <FormGroup>
                        <Input
                            type="text"
                            name={itemName}
                            id="item"
                            placeholder="Add Item"
                            onChange={e => setItemName(e.target.value)}
                        />
                        <Button
                            color="dark"
                            style={{marginTop: '2rem'}}
                            block
                        >Add Item</Button>
                    </FormGroup>
                </Form>
            </Container> : null }
        </div>
    )
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { addItem })(ItemModal)
