
import error from '../../assets/404.png'
import { Col } from 'react-bootstrap'

function Error() {
  return (
   
   
    <Col xs={12} className="d-flex justify-content-center" style={{marginTop:'12rem'}}>
              <img
                style={{ height: "20rem", width: "25rem" }}
                alt="No Data"
                src={error}
              />
            </Col>
    
 
  )
}

export default Error
