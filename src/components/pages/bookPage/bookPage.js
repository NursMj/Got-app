import React, {Component} from 'react';
import ItemList from '../../itemList';
import RowBlock from '../../rowBlock';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';


export default class BookPage extends Component {

  gotService = new gotService();

  state = { 
    selectedBook: 130,
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }
  
  onItemSelected = (id) => { 
    this.setState({
      selectedBook: id
    })
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage/>
    }

    const itemList = (
      <ItemList 
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({name}) => name}/>
    );

    const bookDetails = (
      <ItemDetails 
        itemId={this.state.selectedBook}
        itemType='book'>
        <Field field='gender' label='book'/>
        <Field field='born' label='Born'/>
        <Field field='died' label='Died'/>
        <Field field='culture' label='Culture'/>
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={bookDetails}/>
    )
  }
}