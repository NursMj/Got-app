import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../charcterPage';
import ErrorMessage from '../errorMessage';

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
                    <CharacterPage/>
                </Container>
            </>
        );
    }
};