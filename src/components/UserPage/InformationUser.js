import React, {useEffect, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import ManagerUserPage from "./ManagerUserPage";
import Upimage from "../FireBase/Upimage";
import {FaUserEdit} from "react-icons/fa";
import {HiMiniWallet} from "react-icons/hi2";
import {BiSolidCategory} from "react-icons/bi";
import {RiLogoutBoxFill} from "react-icons/ri";
import {BiLogOut} from "react-icons/bi";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBTypography,
    MDBIcon
} from 'mdb-react-ui-kit';

const InformationUser = () => {
    const [show, setShow] = useState(false);
    const [showImg, setShowImg] = useState(false);

    const handleShowImg = () => setShowImg(true);
    const showImgClose = () => setShowImg(false);

    const [user, setUser] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        const userdata = localStorage.getItem("user");
        console.log(JSON.parse(userdata));
        setUser(JSON.parse(userdata))
    }, []);

    return (
        <div style={{backgroundColor: 'lightgray', width:'100%',height:'90vh'}}>
            <div style={{backgroundColor:'#3CB371', textAlign: 'center'}}>
                <Container>
                    <div>
                        <Image src={user.image} className="mb-3" roundedCircle
                               style={{width: '70px', height: '70px', margin: 'auto'}}/>
                        <h5>{user.username}</h5>
                        <h7>{user.email}</h7>
                    </div>
                </Container>


            </div>
               <div>
                {/*<section className="vh-500" style={{backgroundColor: 'blue'}}>*/}
                    <div className="py-5 h-1500" style={{backgroundColor:'lightgray',height:'100%', width:'100%'}}>
                        <MDBRow className="justify-content-center align-items-center h-10" >
                            <MDBCol lg="6" className="mb-4 mb-lg-0">
                                <MDBCard className="mb-3" style={{borderRadius: '.5rem'}}>
                                    <MDBRow className="g-0">
                                        <MDBCol md="4" className="gradient-custom text-center text-white"
                                                style={{backgroundColor:'#FFDAB9',borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}>
                                            <MDBCardImage
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"

                                                alt="Avatar" className="my-5" style={{width: '260px', height: '250px'}}
                                                fluid/>
                                            <MDBIcon far icon="edit mb-5"/>
                                        </MDBCol>


                                            <MDBCol md="8" style={{backgroundColor:'#FFC0CB'}}>
                                            <MDBCardBody className="p-5">
                                                <ListGroup.Item className= "d-flex align-items-center">
                                                    <Link  onClick={handleShow} className="text-dark d-flex align-items-center">
                                                        <FaUserEdit className="mx-2 text-green-700" style={{ width: '25px', height: '25px' }} />
                                                        <span style={{ fontWeight: 'bold'}}>Account Management</span>
                                                    </Link>
                                                </ListGroup.Item>
                                                <MDBRow className="pt-1">

                                                    <hr className="mt-3 mb-5"/>
                                                    <ListGroup.Item className="d-flex align-items-center">
                                                        <Link to="/auth/wallets" className="text-dark d-flex align-items-center">
                                                            <HiMiniWallet className="mx-2 text-green-700" style={{ width: '25px', height: '25px' }} />
                                                            <span style={{fontWeight: 'bold'}}>My Wallet</span>
                                                        </Link>
                                                    </ListGroup.Item>
                                                </MDBRow>

                                                <hr className="mt-3 mb-5"/>

                                                <MDBRow className="pt-1">

                                                    <ListGroup.Item className="d-flex align-items-center">
                                                        <Link to= "/auth/categories" className="text-dark d-flex align-items-center">
                                                            <BiSolidCategory  className="mx-2 text-green-700" style={{width: '25px' ,height: '25px'}}/>
                                                            <span style={{fontWeight: 'bold'}}> Group </span>
                                                        </Link>
                                                    </ListGroup.Item>
                                                    <hr className="mt-3 mb-5"/>

                                                    <ListGroup.Item className="d-flex align-items-center">
                                                        <Link className="text-dark d-flex align-items-center">
                                                            <BiLogOut  className="mx-2 text-green-700" style={{width: '25px' ,height: '25px'}}/>
                                                            <span style={{fontWeight: 'bold'}}>Logout</span>
                                                        </Link>
                                                    </ListGroup.Item>

                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCol>

                                    </MDBRow>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>
                {/*</section>*/}
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{marginLeft: '165px'}}>Edit Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div style={{textAlign: 'center'}}>
                            <Link onClick={handleShowImg}>
                                <Image src={user.image} roundedCircle
                                       style={{width: '60px', height: '60px', margin: 'auto'}} className="mb-3"/>
                            </Link>
                            <h5>{user.username}</h5>
                            <h7>username@gmail.com</h7>
                        </div>
                    </Container>
                    <ManagerUserPage/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showImg}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Upimage></Upimage>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showImgClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default InformationUser;