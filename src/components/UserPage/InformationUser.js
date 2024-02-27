import React, {useEffect, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { BsPersonFill } from "react-icons/bs";
import {MDBInput, MDBTypography} from 'mdb-react-ui-kit';
import {IoMdWallet} from "react-icons/io";
import { FaLayerGroup } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

import Upimage from "../FireBase/Upimage";
import axios from "axios";
import {useToast} from "@chakra-ui/react";


const InformationUser = () => {
    const [show, setShow] = useState(false);
    const [showImg, setShowImg] = useState(false);



    const [editUser, setEditUser] = useState({
        email: "",
        name: "",
        username: ""
    })
    const [user, setUser] = useState({})


    const handleShowImg = () => setShowImg(true);
    const showImgClose = () => setShowImg(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toast = useToast();
    const handleSubmit = () => {
        axios
            .put('http://localhost:8080/api/users/' + users.id, editUser)
            .then(res => {
                toast({
                    title: 'Update success!',
                    description: 'You successfully update a information!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
                setTimeout(() => {
                    handleClose();
                }, 1000);
            }).catch(err => {
                toast({
                    title: 'Update Failed',
                    description: 'Error: Email is already in use!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            })
    }

    useEffect(() => {
        const userdata = localStorage.getItem("user");
        console.log(JSON.parse(userdata));
        setUser(JSON.parse(userdata))
    }, []);

    const [images, setImage] = useState("")

    const users = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        axios.get('http://localhost:8080/api/users/' + users.id)
            .then(res => {
                console.log(res.data);
                const userData = res.data;
                setEditUser({
                    email: userData.email,
                    name: userData.name,
                    username: userData.username
                });
                setImage(res.data.image);
            })
            .catch(err => console.error(err))
    }, [users.id])

    return (
        <div>
            <Container>
                <div style={{textAlign: 'center'}}>
                    <Image src={images} className= "mb-3" roundedCircle style={{width: '70px', height: '70px',margin: 'auto'}} />
                    <h5>{editUser.username}</h5>
                    <h7>{editUser.email}</h7>
                </div>
            </Container>
            <ListGroup style={{marginTop: '45px'}}>
                <ListGroup.Item className="d-flex align-items-center">
                    <Link onClick={handleShow} className="text-dark d-flex align-items-center">
                        <MDBTypography className="d-flex align-items-center">
                            <BsPersonFill className="mr-2" style={{ width: '30px', height: '30px' }} />
                            <span style={{ fontWeight: 'bold' }} title='strong'>Account Management</span>
                        </MDBTypography>
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item variant="secondary"><p></p> </ListGroup.Item>

                <ListGroup.Item className="d-flex align-items-center">
                    <Link to="/auth/wallets" className="text-dark d-flex align-items-center">
                        <IoMdWallet className="mr-2" style={{ width: '25px', height: '25px' }} />
                        <span>My Wallet</span>
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex align-items-center">
                    <Link to= "/auth/categories" className="text-dark d-flex align-items-center">
                        <FaLayerGroup  className="mr-2" style={{width: '25px' ,height: '25px'}}/>
                        <span> Group </span>
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item variant="secondary"><p></p></ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                    <Link className="text-dark d-flex align-items-center">
                        <LuLogOut className="mr-2" style={{width: '25px' ,height: '25px'}}/>
                        <span>Logout</span>
                    </Link>
                </ListGroup.Item>

            </ListGroup>


            <div onClick={handleShow}>
                Account Management
            </div>

{/*-------------- Edit user -----------*/}
            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                size="lg"
                style={{height: "600px"}}
            >
                    <div className="row g-0">
                        <div
                            className="col-md-4 gradient-custom text-center text-white"
                            style={{
                                borderTopLeftRadius: ".5rem",
                                borderBottomLeftRadius: ".5rem"
                            }}
                        >
                            <Link onClick={handleShowImg}>
                                <Image src={images} alt="Avatar"
                                       className="img-fluid my-5"
                                       style={{ width: 80 ,
                                           margin: "auto"}} />
                            </Link>
                            <h5>{user.username}</h5>
                            <p>{user.email}</p>
                            <i className="far fa-edit mb-5" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body p-4">
                                <h3>Information</h3>
                                <hr className="mt-0 mb-4" />
                                <div className="row pt-1">
                                    <div className="col-6 mb-3">
                                        <h6>Email</h6>
                                        <MDBInput label='Enter email' id='form1' type='text'
                                                  value={editUser.email} name='email'
                                                  onChange={(event) => {
                                                  setEditUser({...editUser, [event.target.name]: event.target.value})
                                        }}/>

                                    </div>
                                    <div className="col-6 mb-3">
                                        <h6>Name</h6>
                                        <MDBInput label='Enter name' id='form1' type='text'
                                                  value={editUser.name} name='name'
                                                  onChange={(event) => {
                                                      setEditUser({
                                                          ...editUser,
                                                          [event.target.name]: event.target.value
                                                      })
                                                  }}
                                        />
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <h6>User Name</h6>
                                    <MDBInput label='User Name' id='form1' type='text'
                                              value={editUser.username} name='username'
                                              onChange={(event) => {
                                                  setEditUser({
                                                      ...editUser,
                                                      [event.target.name]: event.target.value
                                                  })
                                              }}
                                    />

                                </div>
                                <div className="row pt-1">
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </div>

                            </div>
                        </div>
                    </div>
            </Modal>
{/*-------------- upload img -----------------*/}
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
