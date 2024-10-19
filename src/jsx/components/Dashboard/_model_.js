import React, {  useReducer } from "react";
import {Link} from 'react-router-dom';
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";

const init =  false;
const reducer = (state, active) =>{
	switch(active.type){
		case 'basicModal' :
			return { ...state, basicModal: !state.basicModal}
		case 'contentModal'	:
			return { ...state, contentModal: !state.contentModal}
		case 'modalCentered'	:
			return { ...state, modalCentered: !state.modalCentered}
		case 'modalWithTooltip'	:
			return { ...state, modalWithTooltip: !state.modalWithTooltip}		
		case 'gridInsideModal'	:
			return { ...state, gridInsideModal: !state.gridInsideModal}
		case 'largeModal'	:
			return { ...state, largeModal: !state.largeModal}
		case 'smallModal'	:
			return { ...state, smallModal: !state.smallModal}		
		default :	
			return state;
	}	
}

const UiModal = () => {
    const [state ,dispatch] = useReducer(reducer, init);
    return (
      <div className="h-80">
<Modal className="fade" show={state.contentModal} onHide={()=>dispatch({type:'contentModal'})}>
				<Modal.Header>
					<Modal.Title>Order Details</Modal.Title>
					<Button variant="" className="btn-close" onClick={() =>dispatch({type:'contentModal'})}></Button>
				</Modal.Header>
				<Modal.Body>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger light" onClick={() => dispatch({type:'contentModal'})}>Close</Button>
					<Button variant="primary">Save changes</Button>
				</Modal.Footer>
			</Modal>



    </div>

);
};

export default UiModal;
