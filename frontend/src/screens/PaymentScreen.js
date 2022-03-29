import React, { useState } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({ history }) {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if (!userInfo) {
        history.push('/login')
    }

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/login?redirect=place_order')
    }

    return (
        <div>
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='country'>
                        <Form.Label as='legend'>Select Method</Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='PayPal or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                            ></Form.Check>
                        </Col>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Continue</Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default PaymentScreen
