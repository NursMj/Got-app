import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import styled from 'styled-components';

const ListGroup = styled.ul`
    cursor: pointer;
    li {
        cursor: pointer;
    }
`


export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
    }

    renderItem(arr) {
        return arr.map((item, i) => {
            return (
                <li 
                    key={i}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(41 + i)}
                    >
                    {item.name}
                </li>
            )
        })
    }

    render() {
        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItem(charList)

        return (
            <ListGroup className="item-list list-group">
                {items}
            </ListGroup>
        );
    }
}