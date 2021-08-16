import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BookPage, HousePage, BooksItem} from '../pages';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css'

export default class App extends Component {
    gotService = new gotService();

    state = {
        toggled: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onToggle = () => {
        this.setState((state) => {
            return {
                toggled: !state.toggled
            }
        })
    };

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {this.state.toggled && <RandomChar/>}
                                <button 
                                    type='button' 
                                    className='btn btn-primary mb-5'
                                    onClick={this.onToggle}>
                                        TOGGLE RANDOM CHARACTER</button>
                            </Col>
                        </Row>

                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;

                                return <BooksItem bookId={id}/>}
                        }/>

                    </Container>
                </div>
            </Router>
        );
    }
};