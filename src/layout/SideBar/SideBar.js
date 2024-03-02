import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';import { IoReorderThree } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import Image from 'react-bootstrap/Image';
import { FaUserAstronaut } from "react-icons/fa";
import { PiIntersectThreeBold } from "react-icons/pi";
import "./sidebar.css";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { BsCalendar2Date } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { GiSheikahEye } from "react-icons/gi";
import { FaGreaterThan } from "react-icons/fa";import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
const SideBar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    const [toggled, setToggled] = React.useState(false);
    return (

            <div>
                    <Offcanvas show={show} onHide={handleClose} style={{width: '27.5%'}}>
                        <Offcanvas.Header style={{ margin: 'auto' }}>
                            <div>
                                <div style={{ margin: '30%' }}>
                                    <Image src="https://imgt.taimienphi.vn/cf/Images/np/2022/8/16/anh-gai-xinh-cute-de-thuong-hot-girl-2.jpg" style={{ width: '65px', height: '65px' }} roundedCircle />
                                </div>

                                <div style={{ marginTop: '-25%',marginLeft: '20%' }}>

                                    <span style={{marginLeft: '-10%',fontSize: '20px'}}>User Name</span>
                                    <br />
                                    <span style={{marginLeft: '-25%',fontSize: '14px'}}>useradmin@gmail.com</span>
                                </div>
                            </div>
                        </Offcanvas.Header>

                        <hr style={{height: '0.1px',backgroundColor: 'black'}}/>
                        <Offcanvas.Body>
                            <TableContainer style={{marginTop: '-10%'}}>
                                <Table>
                                        <Tr>
                                            <Td><FaUserAstronaut className="icon"/></Td>
                                            <Td class="text-left">My Account</Td>
                                            <Td><FaGreaterThan style={{marginLeft: 'auto'}} className="icon-1"/></Td>
                                        </Tr>
                                        <Tr>
                                            <Td><MdAccountBalanceWallet className="icon"/></Td>
                                            <Td>My Wallets</Td>
                                            <Td><FaGreaterThan style={{marginLeft: 'auto'}} className="icon-1"/></Td>
                                        </Tr>
                                        <Tr>
                                            <Td><PiIntersectThreeBold className="icon"/></Td>
                                            <Td>Categories</Td>
                                            <Td><FaGreaterThan style={{marginLeft: 'auto'}} className="icon-1"/></Td>
                                        </Tr>
                                </Table>
                            </TableContainer>
                        </Offcanvas.Body>
                    </Offcanvas>

                <div style={{position: 'relative',backgroundColor: '#DCDCDC'}} className= "w-screen h-screen">
                    <div style={{backgroundColor: 'white',width: '100%'}} className="mt-50">
                        <Navbar className="bg-body-tertiary">
                            <Container>
                                <Navbar.Brand href="#home">
                                    <div className='relative'>
                                        <MDBDropdown group>
                                            <Image src="https://static.moneylover.me/img/icon/icon.png" style={{ width: '30px', height: '30px' }} roundedCircle />

                                            <MDBDropdownToggle style={{backgroundColor: "white"}}>
                                                <p className= "text-black" style={{ textTransform: "none", fontSize: "smaller" }}>
                                                    Your Wallets
                                                </p>
                                                <p  className= "text-black" style={{ textTransform: "none", fontSize: "smaller" }}>
                                                    10000000
                                                </p>
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                    <MDBDropdownItem link>1</MDBDropdownItem>
                                                    <MDBDropdownItem link>2</MDBDropdownItem>
                                                    <MDBDropdownItem link>3</MDBDropdownItem>
                                                <MDBDropdownItem link>See More</MDBDropdownItem>
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </div>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                                <Navbar.Collapse className="justify-content-end">
                                    <Navbar.Text style={{ display: "flex", alignItems: "center" }}>
                                        <BsCalendar2Date style={{ marginRight: 30 ,fontSize: '20px' }}/>
                                        <GiSheikahEye style={{ marginRight: 30 ,fontSize: '20px' }}/>
                                        <FaSearch style={{fontSize: '20px' }}/>
                                    </Navbar.Text>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>

                    <div className= "h-screen" style={{position: 'absolute',top: 0,left: 0, display: 'flex', width: '6%', backgroundColor: 'white', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginTop: '40%', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <IoReorderThree className= "ml-3" style={{ width: '30px', height: '30px', color: '#696969' }} onClick={handleShow} />
                            </div>
                            <div style={{ marginTop: '40%', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <MdAccountBalanceWallet className= "ml-2.5" style={{ width: '25px', height: '25px', color: '#228B22' }}/>
                                <span className= "ml-2.5" style={{ marginTop: '5px', textAlign: 'center',color: '#228B22' }}>Transactions</span>
                            </div>
                            <hr style={{height: '0.1px',backgroundColor: 'black'}}/>
                        </div>
                    </div>
                </div>

            </div>



    );
};

export default SideBar;