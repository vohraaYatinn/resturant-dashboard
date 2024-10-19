import React from 'react'
import { Fragment } from 'react';

/// Images
import img1 from '../../../images/big/img1.jpg'


/// Bootstrap
import { Row, Col, Card, Carousel, Tab } from 'react-bootstrap'

const UiCarousel = () => {
  
  return (
    <Fragment>
      <div className="container">
          <div className="element-area">
            <div className="demo-view">
              <div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
                <Row>
                  <Col xl={12}>
                    <Tab.Container defaultActiveKey="Preview">
                      <Card name="slides-only" className="dz-card">
                        <Card.Header className="flex-wrap border-0 pb-0">
                            <h4 className='card-intro-title'>Slides</h4>  
                          </Card.Header>
                            <Carousel>
                                
                                      <img
                                        src={img1}
                                        
                                        alt=""
                                      />
                            
                             
                                </Carousel>
                           
                      </Card>
                    </Tab.Container>  
                  </Col>
                 
                 
                </Row>               
              </div>
            </div>
            
          </div>      
      </div>
    </Fragment>
  )
}

export default UiCarousel
