import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
    return (
        <div className='item'>
            <Link to={`/car/${props.id}`}>
                <img 
                    src={props.image} 
                    alt={props.name} 
                    onClick={() => window.scrollTo(0,0)} 
                />
            </Link>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    Rent: ${props.rent_price}/day
                </div>
                <div className="item-price-old">
                    Buy: ${props.buy_price}
                </div>
            </div>
        </div>
    )
}

export default Item