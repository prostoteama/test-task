import React, {Component} from 'react'

class Checkbox extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isChecked: false
        }
        this.modefOnChange = this.modefOnChange.bind(this)
    }
    
    modefOnChange (event) {
        const {OnChengeCheck} = this.props

        this.setState({isChecked: event.target.checked})
        OnChengeCheck(event)
    }
    
    render () {
        const {isChecked} = this.state
        const {product_name, product_price, id} = this.props
        return (
            <div >
            <input type='checkbox' id={id} value={product_name} name={product_name} price={product_price} checked={isChecked} onChange={this.modefOnChange} ></input>
            <label for={id}>{product_name + '' + product_price}</label>
          </div>
        )
    }
}

export default Checkbox