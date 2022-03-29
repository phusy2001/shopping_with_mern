import React from 'react'
import {Container, Row, Col, Image} from 'react-bootstrap'
function Footer() {
    return (
            <footer>
                <Container className='footer_content'>
                    <Row>
                        <Col className='text-center' md={8}>
                            <h4>Download now</h4>
                            <Image src="https://deo.shopeemobile.com/shopee/shopee-appdlpage-live-vn/static/img/appleStore.0ca159be.png" alt="Apple Store" rounded fluid style={{width: '100px'}} className='img_download'></Image>
                            <Image src="https://deo.shopeemobile.com/shopee/shopee-appdlpage-live-vn/static/img/googlePlay.df026781.png" alt="Google Play" rounded fluid style={{width: '100px'}} className='img_download'></Image>
                        </Col>
                        <Col md={2}>
                            <p>Contact us</p>
                            <ul className='footer_social-list'>
                                <li><a href="https://www.facebook.com/joneysy"><i className='icon_footer' class="fab fa-facebook-f"></i></a></li>
                                <li><a href=" https://www.instagram.com/synguyennp/"><i className='icon_footer' class="fab fa-instagram-square"></i></a></li>
                            </ul>
                        </Col>
                        <Col md={2}>
                            <p >Accept payments: </p> 
                            <ul className='footer_social-list'>
                                <li><i class='fab fa-cc-paypal' style={{color: '#78c2ad'}}></i></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className='text-center py-3 copyright'>
                            <p>&copy;2020 Nguyen Ngoc Phu Sy</p>
                </Container>
            </footer>

    )
}

export default Footer
