import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import RowBlock from "../rowBlock";
import ItemList from "../itemList";
import ItemDetails, {Field} from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../services/gotService";
import {withRouter} from 'react-router-dom';
import booksItem from "../booksItem/booksItem";

class BookPage extends Component {

    gotService = new GotService();

    state = {
        // selectedBook: 3,
        error: false,
    }

    // onItemSelected = (id) => {
    //     this.setState({
    //         selectedBook: id
    //     })
    // }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }


        // const itemList = (
        //     <ItemList onItemSelected={this.onItemSelected}
        //               getData={this.gotService.getAllBooks}
        //               renderItem={({name}) => `${name}`}
        //     />
        // )
        //
        //
        //
        // const bookDetails = (
        //     <ItemDetails itemId={this.state.selectedBook} getItem={this.gotService.getBook}>
        //         <Field field='name' label='Name'/>
        //         <Field field='numberOfPages' label='NumberOfPages'/>
        //         <Field field='publisher' label='Publisher'/>
        //         <Field field='released' label='Released'/>
        //     </ItemDetails>
        // )

        return (
            // <RowBlock left={itemList} right={bookDetails}/>
            <ItemList
                // onItemSelected={this.onItemSelected}
                onItemSelected={(itemId) => {
                    this.props.history.push(`/books/${itemId}`)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => `${name}`}
            />
        )

    }
}

export default withRouter(BookPage);