import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage/characterPage";
import ItemList from "../itemList";
import ItemDetails from "../itemDetails";
import gotService from "../services/gotService";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BookPage from "../bookPage";
import HousePage from "../housePage";
import BooksItem from "../booksItem";


export default class App extends Component {

    gotService = new gotService();

    state = {
        charToggled: false,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    ToggleRandomChar = () => {
        this.setState(({charToggled}) => {
            return {
                charToggled: !charToggled
            }
        })
    }


    render() {

        const {charToggled} = this.state;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header/>
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {charToggled === false ? <RandomChar/> : null}
                                <Button color='primary' onClick={() => this.ToggleRandomChar()}>Toggle random
                                    char</Button>
                            </Col>
                        </Row>
                        <Route path='/' exact component={() => <h1>Welcome to GoT database </h1>}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            ({match, location, history}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>
                            }
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
};