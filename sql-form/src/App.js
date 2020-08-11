import React from 'react';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount () {
    this.getProducts()
  }

  getProducts = _ => {
    fetch('http://localhost:4000/products')
    .then(response => response.json())
    .then(({data}) => this.setState({products: data}))
    .catch(err => console.error(err))
  }

renderProduct = ({name, price}) => <div key={Math.round(Math.random() * name.length * price)}>{name + " " + price}</div> 

  render () {
    const {products} = this.state
    return (
      <div className="App">
        {products.map(this.renderProduct)}
      </div>
    )
  }
}

export default App;
