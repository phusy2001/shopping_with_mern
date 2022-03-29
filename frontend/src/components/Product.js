import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import Rating from '../components/Rating'

function Product({product}) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'></Card.Img>
            </Link>

            <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='div'>
                <Rating 
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color='red'
                ></Rating>
            </Card.Text>

            <Card.Text as='h3'>
                ${product.price}
            </Card.Text>
            
            </Card.Body>
        </Card>
    )
}

export default Product
