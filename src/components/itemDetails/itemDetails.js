import React, {Component} from 'react';
import gotService from '../../services/gotService';
import styled from 'styled-components';

const ItemDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const SelectorError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class ItemDetails extends Component {
    gotService = new gotService();

    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, itemType} = this.props;
        if (!itemId) {
            return;
        }

        switch (itemType) {
            case itemType === 'book': 
                this.gotService.getBook(itemId)
                .then((item) => {
                    this.setState({item})
                });
                break;
            case itemType === 'char': 
                this.gotService.getCharacter(itemId)
                .then((item) => {
                    this.setState({item})
                });
                break;
            case itemType === 'house': 
                this.gotService.getHouse(itemId)
                .then((item) => {
                    this.setState({item})
                });
                break;
            default:
        }
    }

    render() {
        if(!this.state.item) {
            return <SelectorError>Please select a character!</SelectorError>
        }

        const {item} = this.state;
        const {name} = item;


        return (
            <ItemDetailsBlock className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </ItemDetailsBlock>
        );
    }
}