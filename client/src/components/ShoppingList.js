import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect, useSelector, useDispatch  } from 'react-redux'
import { getItem, deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types'
import * as actions from '../actions/types'


function ShoppingList(props) {
    const list = useSelector(list => props.item);
    const dispatch = useDispatch();
    
    const onDeleteHandler = id => {
        dispatch({type:actions.DELETE_ITEMS, payload: id})
    }
    
    useEffect(() => {
        props.getItem()
    },[])

    return (
        <div className="shoppingList">
            <Container>
                <ListGroup> 
                    <TransitionGroup className="shoppingList_List">
                        {list.items.map(({id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => onDeleteHandler(id)}
                                    >&times;</Button>
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
    item: state.item
})

export default connect(mapStateToProps, { getItem, deleteItem })(ShoppingList)

