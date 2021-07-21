import React, {Component} from 'react';
import gotService from '../../services/gotService';
import styled from 'styled-components';

const CharDetailsBlock = styled.div`
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

export default class CharDetails extends Component {
    gotService = new gotService();

    state = {
        char: null
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })
        // this.foo.bar = 0; //error
    }

    render() {
        if(!this.state.char) {
            return <SelectorError>Please select a character!</SelectorError>
        }

        const {name, gender, born, died, culture} = this.state.char;


        return (
            <CharDetailsBlock className="rounded">
                <h4>{name || 'no data :('}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender || 'no data :('}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born || 'no data :('}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died || 'no data :('}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture || 'no data :('}</span>
                    </li>
                </ul>
            </CharDetailsBlock>
        );
    }
}