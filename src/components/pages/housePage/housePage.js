import React, {Component} from 'react';
import ItemList from '../../itemList';
import RowBlock from '../../rowBlock';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';


export default class HousePage extends Component {

  gotService = new gotService();

  state = { 
    selectedHouse: 130,
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }
  
  onItemSelected = (id) => { 
    this.setState({
      selectedHouse: id
    })
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage/>
    }

    const itemList = (
      <ItemList 
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllHouses}
        renderItem={({name}) => name}/>
    );

    const houseDetails = (
      <ItemDetails 
        itemId={this.state.selectedHouse}
        itemType='house'>
        <Field field='region' label='Region'/>
        <Field field='words' label='Words'/>
        <Field field='title' label='Title'/>
        <Field field='overlord' label='Overlord'/>
        <Field field='ancestralWeappons' label='Ancestral weappons'/>
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={houseDetails}/>
    )
  }
}