import React from 'react'
import  {Spinner} from 'react-bootstrap'
function Loader(props) {
    return (
        // <Spinner 
        // animation='border' 
        // role='status'
        // style={{
        //         width: '100px', 
        //         height: '100px', 
        //         margin: 'auto', 
        //         display: 'block'
        //     }}
        // variant="primary"
        // >
        //     <span className='sr-only'>Loading...</span>
        // </Spinner>
        <div
        style={{
                    margin: 'auto', 
                    display: 'block',
                    textAlign: 'center'
                    
                }}
        >
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        </div>
    )
}

export default Loader
