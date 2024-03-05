import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {IoReorderThree} from "react-icons/io5";
import {MdAccountBalanceWallet} from "react-icons/md";
import Image from 'react-bootstrap/Image';
import {FaUserAstronaut} from "react-icons/fa";
import {PiIntersectThreeBold} from "react-icons/pi";
import "./sideBar.css";
import {MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBInput} from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {LuCalendarDays} from "react-icons/lu";
import {FaSearch} from "react-icons/fa";
import {TbEyeDollar} from "react-icons/tb";
import {FaCircleQuestion} from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';
import {FaCartShopping} from "react-icons/fa6";
import {FaGreaterThan} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";
import {Outlet, useNavigate} from 'react-router-dom';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, useToast,
} from '@chakra-ui/react'
import {Link} from "react-router-dom";
import axios from "axios";

function MydModalWithGrid(props) {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const handleCloseLogout = () => setShowLogout(false);
    const handleShowLogout = () => setShowLogout(true);
    const [image, setImage] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const [userLocal, setUserLocal] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/' + user.id)
            .then(res => {
                console.log(res.data);
                setUserLocal(res.data);
                setImage(res.data.image);
            })
            .catch(err => console.error(err))
    }, []);
    const handleLogout = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const accessToken = user.accessToken;
            console.log(user);
            await axios.post('http://localhost:8080/api/auth/logout', {token: accessToken})
                .then((response) => {
                    localStorage.removeItem('user');
                    console.log('Response from server:', response.data);
                    navigate("/login");
                });
        } catch (error) {
            console.error('Error:', error);
        }

    };
    //change password
    const [showChangePassword, setShowChangePassword] = useState(false);
    const handleChangePassword = () => setShowChangePassword (true);
    const handleCloseCPassword = () => setShowChangePassword(false);
    const toast = useToast();
    const [ChangePassword, setChangePassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword:""
    })
    const handleSubmitPassword = async () => {
        await axios.put(`http://localhost:8080/api/users/${user.id}/change_password`, ChangePassword)
            .then(res => {
                toast({
                    title: 'Update success!',
                    description: 'You successfully update a password!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
                setTimeout(() => {

                    navigate("/login")
                }, 1000);
            }).catch(err => {
                toast({
                    title: 'Update Failed',
                    description: 'Error: Password incorrect or you are set up old password!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            })
    }

    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
                        <IoMdClose onClick={props.onHide} className="close-icon"/>
                        <span className="title-text mb-1">My Account</span>
                        <Button style={{marginLeft: 160}} variant="outline-success" className="btn-sign-out"
                                onClick={handleShowLogout}>Sign
                            Out</Button>{' '}
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body className="grid-example">
                    <Container>
                        <div style={{textAlign: 'center'}}>
                            <div>
                                <Image
                                    src={image}
                                    style={{width: '65px', height: '65px', margin: 'auto'}} roundedCircle/>
                            </div>
                            <div className='mx-2'>
                                <span style={{fontSize: '20px'}}>{user.username}</span>
                                <br/>
                                <span style={{fontSize: '14px'}}>{user.email}</span>
                            </div>
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{marginLeft: 160}} variant="outline-success" onClick={handleChangePassword} className="btn-sign-out">
                        Change Password
                    </Button>{' '}
                </Modal.Footer>
            </Modal>

            <Modal show={showLogout} onHide={handleCloseLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <img src="https://web.moneylover.me/static/img/image-404.8f4ef91.png"/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogout}>
                        Nope
                    </Button>
                    <Button variant="success" onClick={handleLogout}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*modal change password*/}
            <Modal
                show={showChangePassword}
                onHide={handleCloseCPassword}
                keyboard={false}
                size="lg"
                style={{height: "600px"}}
            >
                <div className="flex ">
                    <div className="flex-1">
                        <img style={{marginTop: "130px"}} className="justify-center align-items-center" src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709510400&semt=ais" alt=""/>
                    </div>
                    <div className="flex-1 w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Change Password
                        </h2>
                        <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Old Password
                                </label>
                                <MDBInput
                                    type="password"
                                    name="oldPassword"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                    required=""
                                    onChange={(e) => {
                                        setChangePassword({
                                            ...ChangePassword,
                                            [e.target.name]: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    New Password
                                </label>
                                <MDBInput
                                    type="password"
                                    name="newPassword"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    onChange={(e) => {
                                        setChangePassword({
                                            ...ChangePassword,
                                            [e.target.name]: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Confirm password
                                </label>
                                <MDBInput
                                    type="password"
                                    name="confirmPassword"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    onChange={(e) => {
                                        setChangePassword({
                                            ...ChangePassword,
                                            [e.target.name]: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="newsletter"
                                        aria-describedby="newsletter"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="newsletter"
                                        className="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the{" "}
                                        <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                onClick={handleSubmitPassword}
                                className="btn btn-success w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"

                            >
                                Reset passwod
                            </Button>
                            <Button
                                onClick={handleCloseCPassword}
                                className="btn btn-success w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    );
}

const SideBar = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalShow, setModalShow] = useState(false);
    const [toggled, setToggled] = React.useState(false);
    const [image, setImage] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const [userLocal, setUserLocal] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/' + user.id)
            .then(res => {
                console.log(res.data);
                setUserLocal(res.data);
                setImage(res.data.image);
            })
            .catch(err => console.error(err))
    }, []);

    return (
        <div>
            <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)}/>
            <Offcanvas show={show} onHide={handleClose} style={{width: '27.5%'}}>
                <Offcanvas.Header style={{margin: 'auto'}}>
                    <Container>
                        <div style={{textAlign: 'center', marginTop: '15%'}}>
                            <div>
                                <Image
                                    src={image}
                                    style={{width: '65px', height: '65px', margin: 'auto'}} roundedCircle/>
                            </div>
                            <div className='mx-2'>
                                <span style={{fontSize: '20px'}}>{user.username}</span>
                                <br/>
                                <span style={{fontSize: '14px'}}>{user.email}</span>
                            </div>
                        </div>
                    </Container>
                </Offcanvas.Header>

                <hr style={{height: '0.1px', backgroundColor: 'black'}}/>
                <Offcanvas.Body>
                    <TableContainer style={{marginTop: '-5%'}}>
                        <Table>
                            <Tr className="hover-div" onClick={() => setModalShow(true)}>
                                <Td><FaUserAstronaut className="icon"/></Td>
                                <Td class="text-left">My Account</Td>
                                <Td><FaGreaterThan style={{marginLeft: 'auto'}} className="icon-1"/></Td>
                            </Tr>

                            <Tr className="hover-div">
                                <Td>
                                    <Link to={"/auth/wallets"}>
                                        <MdAccountBalanceWallet className="icon"/>
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={"/auth/wallets"} className="text-reset">
                                        My Wallets
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={"/auth/wallets"}>
                                        <FaGreaterThan style={{marginLeft: 'auto'}} className="icon-1"/>
                                    </Link>
                                </Td>
                            </Tr>

                            <Tr className="hover-div">
                                <Td>
                                    <Link to={"/auth/categories"}>
                                        <PiIntersectThreeBold className="icon"/>
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={"/auth/categories"} className="text-reset">
                                        Categories
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={"/auth/categories"}>
                                        <FaGreaterThan style={{marginLeft: 'auto'}} className="icon-1"/>
                                    </Link>
                                </Td>
                            </Tr>
                        </Table>
                    </TableContainer>
                </Offcanvas.Body>
            </Offcanvas>

            <div style={{position: 'relative', backgroundColor: '#DCDCDC'}} className="w-screen h-screen">
                <div style={{backgroundColor: 'white', width: '100%'}}>
                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand>

                                <MDBDropdown group style={{height: "40px"}}>
                                    <Image src="https://static.moneylover.me/img/icon/icon.png"
                                           style={{width: '40px', height: '40px'}} roundedCircle/>

                                    <MDBDropdownToggle style={{backgroundColor: "white"}}>
                                        <div>
                                            <p style={{
                                                marginTop: '10px',
                                                fontSize: "13px",
                                                color: 'black'
                                            }}>
                                                Your Wallets
                                            </p>
                                            <p className="text-black"
                                               style={{
                                                   marginTop: '-15px',
                                                   fontSize: "13px"
                                               }}>
                                                10000000
                                            </p>
                                        </div>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link>1</MDBDropdownItem>
                                        <MDBDropdownItem link>2</MDBDropdownItem>
                                        <MDBDropdownItem link>3</MDBDropdownItem>
                                        <MDBDropdownItem link>See More</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>

                            </Navbar.Brand>
                            <Navbar.Toggle/>
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text style={{display: "flex", alignItems: "center", marginRight: '-5%'}}>
                                    <LuCalendarDays style={{marginRight: 30, fontSize: '20px'}}/>
                                    <TbEyeDollar style={{marginRight: 30, fontSize: '20px'}}/>
                                    <FaSearch style={{fontSize: '20px'}}/>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                {/* Phần chú thích cho phần trung tâm */}
                <div className="central-content" style={{marginLeft: '6%', marginTop: 'auto', height: '85.5%'}}>
                    <Outlet/>
                </div>

                <div className="h-screen" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    width: '6%',
                    backgroundColor: 'white',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{
                            marginTop: '40%',
                            fontSize: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <IoReorderThree className="ml-3" style={{width: '30px', height: '30px', color: '#696969'}}
                                            onClick={handleShow}/>
                        </div>
                        <div style={{
                            marginTop: '40%',
                            fontSize: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Link to= "/auth/transactions">
                                <MdAccountBalanceWallet className="ml-2.5"
                                                        style={{width: '25px', height: '25px', color: '#228B22'}}/>
                            </Link>
                            <span className="ml-2.5"
                                  style={{marginTop: '5px', textAlign: 'center', color: '#228B22'}}>Transactions</span>
                        </div>
                        <hr style={{height: '0.1px', backgroundColor: 'black'}}/>
                        <div style={{
                            fontSize: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FaCartShopping className="ml-2.5"
                                            style={{width: '25px', height: '25px', color: '#D3D3D3'}}/>
                            <span className="ml-2.5"
                                  style={{marginTop: '5px', textAlign: 'center', color: '#D3D3D3'}}>Store</span>
                        </div>
                        <div style={{
                            marginTop: '40%',
                            fontSize: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FaCircleQuestion className="ml-2.5"
                                              style={{width: '25px', height: '25px', color: '#D3D3D3'}}/>
                            <span className="ml-2.5"
                                  style={{marginTop: '5px', textAlign: 'center', color: '#D3D3D3'}}>Help</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;