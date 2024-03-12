import React, {useEffect, useState} from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Image,
    TableCaption,
    TableContainer,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Select,
    InputGroup, InputLeftElement, Input, ModalFooter,
} from '@chakra-ui/react'
import {MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow} from "mdb-react-ui-kit";
import {MdOutlineClose} from "react-icons/md";
import {FaPen} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import ProgressBar from "./ProgressBar";
import {MdCalendarMonth} from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function ProgressCircle({value, maxValue, handleTransClick, handleCloseCard}) {
    const percentage = Math.min((value / maxValue) * 100, 100);
    // budget detail
    const [showCard2, setShowCard2] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(false);
    const [selectedBudgetId, setSelectedBudgetId] = useState(null);
    const [editBudget, setEditBudget] = useState({
        amount: '',
        category_id: '',
        wallet_id: '',
        startDate: '',
        endDate: ''
    });
    const handleClickX = () => {
        setShowCard2(false);
        setSelectedBudget(false);
        handleCloseCard();
    };

    const handleTrans = (budgetId) => {
        setSelectedBudgetId(budgetId);
        setShowCard2(true);
        setSelectedBudget(true);
        handleTransClick();
        const budget = budgets.find(b => b.id === budgetId);
        setEditBudget(budget);
        console.log(editBudget);
    };

    //show custom time
    const [showInputs, setShowInputs] = useState(false);
    const handleSelectChange = (event) => {
        setShowInputs(event.target.value === 'option2');
    };

// Xử lý sự kiện thay đổi cho các trường Input trong modal
    const handleInputChange = () => {
    };

    // const handleSelectChange = (event) => {
    //     setShowInputs(event.target.value === 'option2');
    // };

    const [budgets, setBudgets] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/budgets/user/${user.id}`);
                setBudgets(response.data);
            } catch (error) {
                console.error('Error fetching budgets:', error);
            }
        };

        fetchBudgets();
    }, [user.id]);

    //modal edit budget
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div style={{width: '200px', margin: 'auto', marginTop: '2%'}}>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage.toFixed(2)}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(0, 170, 0, ${percentage / 100})`,
                        textColor: '#66b73a',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#33de0d',
                    })}
                />

                <div style={{display: "flex", justifyContent: "space-between", marginTop: '10px', width: '350px'}}>
                    <div style={{
                        flex: 1,
                        textAlign: "center",
                        borderRight: '1px solid gray',
                        paddingRight: '10px',
                        marginLeft: '-45%'
                    }}>
                        <span style={{display: "block", marginBottom: 5}}>+8 M đ</span>
                        <span>Total budgets</span>
                    </div>
                    <div style={{
                        flex: 1,
                        textAlign: "center",
                        borderRight: '1px solid gray',
                        paddingLeft: '10px',
                        paddingRight: '10px'
                    }}>
                        <span style={{display: "block", marginBottom: 5}}>+8 M đ</span>
                        <span>Total budgets</span>
                    </div>
                    <div style={{flex: 1, textAlign: "center", paddingLeft: '10px'}}>
                        <span style={{display: "block", marginBottom: 5}}>+8 M đ</span>
                        <span>Total budgets</span>
                    </div>
                </div>
                {/*phần hiển thị danh sách budget*/}
                <div style={{ marginLeft: '-20%', marginTop: '20px', width: '450px' }}>
                    <TableContainer style={{ overflowY: 'auto', maxHeight: '180px' }}>
                        <Table variant='simple' style={{ width: '300px' }}>
                            <Tbody>
                                {budgets.map((budget) => (
                                    <Tr key={budget.id}>
                                        <Td style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleTrans(budget.id)}>
                                            <Image
                                                borderRadius='full'
                                                boxSize='50px'
                                                src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                alt=''
                                            />
                                            <span style={{ marginLeft: '15px' }}>{budget.name}</span>
                                        </Td>
                                        <Td style={{ textAlign: 'right' }}>{budget.amount}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>

            </div>

            {/*phần hiển thị thông tin budget */}
            <div className={`card2 ${selectedBudget ? 'selected' : ''}`}
                 style={{
                     width: '400px',
                     position: 'absolute',
                     top: '-12.5%',
                     right: '-120.5%',
                     transform: 'translateX(-50%)'
                 }}>
                {showCard2 && (
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow>
                                <div style={{display: 'flex'}}>
                                    <MdOutlineClose onClick={handleClickX}
                                                    style={{marginTop: '-2px', fontSize: '30px', marginLeft: '-10px'}}/>
                                    <MDBCardTitle style={{margin: 'auto'}}>Budget Details</MDBCardTitle>
                                    <div style={{marginLeft: 'auto', display: 'flex', gap: '5px'}}>
                                        <FaPen onClick={handleShow} style={{fontSize: '20px', marginRight: '1px'}}/>
                                        <MdDelete style={{
                                            fontSize: '25px',
                                            marginRight: '-1px',
                                            marginTop: '-2px',
                                            color: 'red'
                                        }}/>
                                    </div>
                                </div>

                                <hr style={{width: '350px', marginTop: '10px'}}/>
                                <MDBRow className="wallet-infomation">
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Image
                                            borderRadius='full'
                                            boxSize='50px'
                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                            alt=''
                                        />
                                        <div style={{marginLeft: '10px', display: 'flex', flexDirection: 'column'}}>
                                            <span style={{marginBottom: '5px'}}>{editBudget.category.name}</span>
                                            <span>{editBudget.amount} đ</span>
                                        </div>
                                    </div>
                                    <div style={{width: '250px'}}>
                                        <Table variant='simple' style={{width: '350px',marginTop:'10px'}}>
                                            <Tbody>
                                                <Tr>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'left',
                                                        borderBottom: '1px solid #fff'
                                                    }}>Spent</Td>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'right',
                                                        borderBottom: '1px solid #fff'
                                                    }}>Left</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'left',
                                                        borderBottom: '1px solid #fff'
                                                    }}>70,000 đ</Td>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'right',
                                                        borderBottom: '1px solid #fff'
                                                    }}>6,930,000 đ</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </div>
                                    <div style={{marginLeft: '20px', marginTop: '10px'}}>
                                        <ProgressBar completed={60}/>
                                    </div>

                                </MDBRow>
                                <hr style={{width: '350px', marginTop: '10px'}}/>
                                <div style={{display: 'inline-flex', alignItems: 'center'}}>
                                    <MdCalendarMonth style={{fontSize: '20px'}}/>
                                    <span style={{marginLeft: '35px'}}>
                                        {editBudget.startDate} to {editBudget.endDate}
                                    </span>
                                </div>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    marginTop: '10px',
                                    marginLeft: '-5px'
                                }}>
                                    <Image
                                        borderRadius='full'
                                        boxSize='50px'
                                        src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                        alt=''
                                    />
                                    <span style={{marginLeft: '15px'}}>{editBudget.wallet.name}</span>
                                </div>
                                <hr style={{width: '350px', marginTop: '10px'}}/>
                                <div style={{marginTop: '5px', width: '350px',marginLeft: '5%'}}>
                                    <TableContainer style={{ overflowY: 'auto', maxHeight: '130px'}}>
                                        <Table variant='simple' style={{width: '300px'}}>
                                            <Tbody>
                                                <Tr>
                                                    <Td style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                            alt=''
                                                        />
                                                        <span style={{marginLeft: '15px'}}>Name Category</span>
                                                    </Td>
                                                    <Td style={{textAlign: 'right'}}>1.000.000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                            alt=''
                                                        />
                                                        <span style={{marginLeft: '15px'}}>Name Category</span>
                                                    </Td>
                                                    <Td style={{textAlign: 'right'}}>1.000.000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                            alt=''
                                                        />
                                                        <span style={{marginLeft: '15px'}}>Name Category</span>
                                                    </Td>
                                                    <Td style={{textAlign: 'right'}}>1.000.000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                            alt=''
                                                        />
                                                        <span style={{marginLeft: '15px'}}>Name Category</span>
                                                    </Td>
                                                    <Td style={{textAlign: 'right'}}>1.000.000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                            alt=''
                                                        />
                                                        <span style={{marginLeft: '15px'}}>Name Category</span>
                                                    </Td>
                                                    <Td style={{textAlign: 'right'}}>1.000.000</Td>
                                                </Tr>
                                            </Tbody>

                                        </Table>
                                    </TableContainer>
                                </div>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                )}

                {/*modal edit budget*/}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    );
}

export default ProgressCircle;
