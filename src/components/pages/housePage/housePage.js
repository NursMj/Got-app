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
        <Field field='gender' label='house'/>
        <Field field='born' label='Born'/>
        <Field field='died' label='Died'/>
        <Field field='culture' label='Culture'/>
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={houseDetails}/>
    )
  }
}