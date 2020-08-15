import React from 'react';
import './App.css';
import Checkbox from './Checkbox'
import Amaunt from './Amount';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [],
      checkboxes: []
    }
    this.changeState = this.changeState.bind(this)
  }
  
  changeState (event) {
    const {checkboxes} = this.state
    const arr = checkboxes.filter(({id}) => id === event.target.id)
    if (arr.length) {
      this.setState({checkboxes:[...checkboxes.filter(({id}) => id !== event.target.id)]})
      return
    }

    this.setState({checkboxes: [...checkboxes, {id: event.target.id, price: event.target.attributes.price.value }]})
    console.log(this.state.checkboxes)
  }

  componentDidMount = _ => {
    this.getProducts()
  }

  getProducts = _ => {
    fetch('http://localhost:4000/products')
    .then(response => response.json())
    .then(({data}) => this.setState({products: data}))
    .catch(err => console.error(err))
  }

  addProduct = _ => {
    (this.state.checkboxes.length > 0) ? 
    this.state.checkboxes.map(({id}) => 
      fetch(`http://localhost:4000/products/add?id=${id}`)
      .then(() => console.log ( '%c%s', 'color: green;', 'product added' ))
      .catch(err => console.error(err))  
    ): 
    console.error('err')
  }

  onChecked = event => {
    this.setState({rememberMe: event.target.checked})
    console.log(event.target.checked)
  }

  render () {
    const {products, checkboxes} = this.state
    const {changeState} = this
    return (
      <div className="App">
        <div className='Checkboxes'>
        {products.map((obj) => {
         return (
           <Checkbox  key={obj.id} {...obj} OnChengeCheck={changeState}></Checkbox>
         )
        })}
        </div> 
        <Amaunt totalPrice={checkboxes.reduce((state, curr) => state += parseInt(curr.price), 0)} addProduct={this.addProduct}></Amaunt>
      </div>
    )
  }
}

export default App;
