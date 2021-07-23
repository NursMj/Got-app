import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BookPage, HousePage} from '../pages';
import ErrorMessage from '../errorMessage';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

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
                <> 
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
                        <Route path='/books' component={BookPage}/>
                        <Route path='/houses' component={HousePage}/>
                    </Container>
                </>
            </Router>
        );
    }
};