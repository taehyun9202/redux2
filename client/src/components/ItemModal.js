import React, { useState } from 'react'
import { Container, Form, FormGroup, Input, Button } from 'reactstrap'
import { connect, useDispatch  } from 'react-redux'
import { addItem } from '../actions/itemActions'
import * as actions from '../actions/types'

function ItemModal() {
    const dispatch = useDispatch();
    const [ itemName, setItemName ] = useState('')
    
    const onSubmitHandler = e => {
        e.preventDefault()
        if(itemName) {
            const newItem = { 
                name: itemName
            }
            dispatch({type:actions.ADD_ITEMS, payload: newItem})
            setItemName('')
        }
    }
    return (
        <div>
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
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    item: state.item
})


export default connect(mapStateToProps, { addItem })(ItemModal)
