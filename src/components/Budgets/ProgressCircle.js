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
import BudgetEdit from "./BudgetEdit";
import axios from "axios";

function ProgressCircle({value, maxValue, handleTransClick, handleCloseCard}) {
    const percentage = Math.min((value / maxValue) * 100, 100);
    // budget detail
    const [showCard2, setShowCard2] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(false);
    const handleClickX = () => {
        setShowCard2(false);
        setSelectedWallet(false);
        handleCloseCard();
    };

    const handleTrans = () => {
        setShowCard2(true);
        setSelectedWallet(true);
        handleTransClick();
    };
    //edit budget
    const { isOpen, onOpen, onClose } = useDisclosure();
    //show custom time
    const [showInputs, setShowInputs] = useState(false);
    const handleSelectChange = (event) => {
        setShowInputs(event.target.value === 'option2');
    };

// Xử lý sự kiện thay đổi cho các trường Input trong modal
    const handleInputChange = () => {
        // Tạm thời không cần làm gì ở đây, bạn có thể xử lý sau này nếu cần thiết
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
                <div style={{ marginTop: '20px', width: '450px' }}>
                    <TableContainer style={{ marginLeft: '-25%', overflowY: 'auto', maxHeight: '180px' }}>
                        <Table variant='simple' style={{ width: '300px' }}>
                            <Tbody>
                                {budgets.map((budget) => (
                                    <Tr key={budget.id}>
                                        <Td style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleTrans()}>
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
            <div className={`card2 ${selectedWallet ? 'selected' : ''}`}
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
                                        <FaPen onClick={onOpen} style={{fontSize: '20px', marginRight: '1px'}}/>
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
                                            <span style={{marginBottom: '5px'}}>Education</span>
                                            <span>7,000,000 đ</span>
                                        </div>
                                    </div>
                                    <div style={{width: '250px'}}>
                                        <Table variant='simple' style={{width: '100%'}}>
                                            <Tbody>
                                                <Tr>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'left',
                                                        borderBottom: '1px solid #fff'
                                                    }}>inches</Td>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'right',
                                                        borderBottom: '1px solid #fff'
                                                    }}>millimetres (mm)</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'left',
                                                        borderBottom: '1px solid #fff'
                                                    }}>inches</Td>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'right',
                                                        borderBottom: '1px solid #fff'
                                                    }}>millimetres (mm)</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </div>
                                    <div>
                                        <ProgressBar style={{marginLeft: '-40px', marginTop: '-25px'}} completed={60}/>
                                    </div>

                                </MDBRow>
                                <hr style={{width: '350px', marginTop: '10px'}}/>
                                <div style={{display: 'inline-flex', alignItems: 'center'}}>
                                    <MdCalendarMonth style={{fontSize: '20px'}}/>
                                    <span style={{marginLeft: '35px'}}>
                                        11/03 - 18/03
                                    </span>
                                </div>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    marginTop: '5px',
                                    marginLeft: '-5px'
                                }}>
                                    <Image
                                        borderRadius='full'
                                        boxSize='50px'
                                        src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                        alt=''
                                    />
                                    <span style={{marginLeft: '15px'}}>Name Wallet</span>
                                </div>
                                <hr style={{width: '350px', marginTop: '10px'}}/>
                                <div style={{marginTop: '10px', width: '350px'}}>
                                    <TableContainer style={{marginLeft: '-10%', overflowY: 'auto', maxHeight: '150px'}}>
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
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Budget</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Select placeholder='Select Type'>
                                <option value='option1'>Expense</option>
                                <option value='option2'>Loan</option>
                            </Select>
                            <Select placeholder='Select Category' style={{marginTop: '10px'}}>
                                <option value='option1'>Category 1</option>
                                <option value='option2'>Category 2</option>
                                <option value='option3'>Category 3</option>
                            </Select>

                            <InputGroup  style={{marginTop: '10px'}}>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                >
                                    $
                                </InputLeftElement>
                                <Input placeholder='Enter amount' />
                            </InputGroup>

                            <div>
                                <Select
                                    placeholder='Select Time'
                                    style={{ marginTop: '10px' }}
                                    onChange={handleSelectChange}
                                >
                                    <option value='option1'>This Month</option>
                                    <option value='option2'>Custom</option>
                                </Select>
                                {showInputs && (
                                    <>
                                        <Input
                                            placeholder="Select Date and Time"
                                            size="md"
                                            type="date"
                                            style={{ marginTop: '10px' }}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            placeholder="Select Date and Time"
                                            size="md"
                                            type="date"
                                            style={{ marginTop: '10px' }}
                                            onChange={handleInputChange}
                                        />
                                    </>
                                )}
                            </div>
                            <Select
                                placeholder='Select Wallet'
                                style={{ marginTop: '10px' }}
                                onChange={handleSelectChange}
                            >
                                <option value='option1'>Wallet 1</option>
                                <option value='option2'>Wallet 2</option>
                            </Select>

                        </ModalBody>

                        <ModalFooter>
                            <Button variant='success' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme='green'>Submit</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>

        </>
    );
}

export default ProgressCircle;
