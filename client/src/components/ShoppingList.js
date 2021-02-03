import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect, useSelector } from 'react-redux'
import { getItem, deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types'
import * as actions from '../actions/types'


function ShoppingList(props) {
    const list = useSelector(list => props.item);
    
    const onDeleteHandler = id => {
        props.deleteItem(id)
    }

    ShoppingList.propTypes = {
        isAuthenticated: PropTypes.bool
    }
    
    useEffect(() => {
        props.getItem()
    },[])

    return (
        <div className="shoppingList">
            <Container>
                <ListGroup> 
                    <TransitionGroup className="shoppingList_List">
                        {list.items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {props.isAuthenticated === true ?
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={() => onDeleteHandler(_id)}
                                        >&times;</Button> : null }
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
            
        </div>
    )
}

ShoppingList.propTypes = {
    getItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItem, deleteItem })(ShoppingList)

