import React from 'react'

const Amaunt = ({totalPrice, addProduct}) => 
    <div className='Amaunt'>
        <p>Сумма заказа</p>
        <p><b>{totalPrice}</b></p> 

        <button onClick={addProduct}>add-product</button>
    </div>

export default Amaunt