import React, {useState} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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
} from '@chakra-ui/react'
import {MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow} from "mdb-react-ui-kit";
import {MdOutlineClose} from "react-icons/md";
import {FaUserTie, FaWallet} from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ProgressBar from "./ProgressBar";

function ProgressCircle({ value, maxValue }) {
    const percentage = Math.min((value / maxValue) * 100, 100);
    const [showCard2, setShowCard2] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(false);
    const handleClickX = () => {
        setShowCard2(false)
        setSelectedWallet(false)
    }
    const handleWalletClick = (wallet) => {
        setShowCard2(true)
        setSelectedWallet(wallet)
    }

    return (
        <>
            <div style={{ width: '200px', margin: 'auto', marginTop: '2%' }}>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage.toFixed(2)}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                        textColor: '#f88',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}
                />

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: '10px',width: '350px' }}>
                    <div style={{ flex: 1, textAlign: "center", borderRight: '1px solid gray', paddingRight: '10px',marginLeft: '-45%' }}>
                        <span style={{ display: "block", marginBottom: 5 }}>+8 M đ</span>
                        <span>Total budgets</span>
                    </div>
                    <div style={{ flex: 1, textAlign: "center", borderRight: '1px solid gray', paddingLeft: '10px', paddingRight: '10px' }}>
                        <span style={{ display: "block", marginBottom: 5 }}>+8 M đ</span>
                        <span>Total budgets</span>
                    </div>
                    <div style={{ flex: 1, textAlign: "center", paddingLeft: '10px' }}>
                        <span style={{ display: "block", marginBottom: 5 }}>+8 M đ</span>
                        <span>Total budgets</span>
                    </div>
                </div>
                <div style={{marginTop: '20px',width: '450px'}}>
                    <TableContainer style={{marginLeft:'-25%',overflowY: 'auto',maxHeight: '180px'}}>
                        <Table variant='simple' style={{width: '300px'}}>
                            <Tbody>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleWalletClick()}>
                                        <Image
                                            borderRadius='full'
                                            boxSize='50px'
                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                            alt=''
                                        />
                                        <span style={{ marginLeft: '15px' }}>Name Category</span>
                                    </Td>
                                    <Td style={{ textAlign: 'right' }}>1.000.000</Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                        <Image
                                            borderRadius='full'
                                            boxSize='50px'
                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                            alt=''
                                        />
                                        <span style={{ marginLeft: '15px' }}>Name Category</span>
                                    </Td>
                                    <Td style={{ textAlign: 'right' }}>1.000.000</Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                        <Image
                                            borderRadius='full'
                                            boxSize='50px'
                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                            alt=''
                                        />
                                        <span style={{ marginLeft: '15px' }}>Name Category</span>
                                    </Td>
                                    <Td style={{ textAlign: 'right' }}>1.000.000</Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                        <Image
                                            borderRadius='full'
                                            boxSize='50px'
                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                            alt=''
                                        />
                                        <span style={{ marginLeft: '15px' }}>Name Category</span>
                                    </Td>
                                    <Td style={{ textAlign: 'right' }}>1.000.000</Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                        <Image
                                            borderRadius='full'
                                            boxSize='50px'
                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                            alt=''
                                        />
                                        <span style={{ marginLeft: '15px' }}>Name Category</span>
                                    </Td>
                                    <Td style={{ textAlign: 'right' }}>1.000.000</Td>
                                </Tr>
                            </Tbody>

                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div className={`card2 ${selectedWallet ? 'selected' : ''}`} style={{width: '400px', position: 'absolute', top: 0, left: '100%', transform: 'translateX(-50%)' }}>
                {showCard2 && (
                    <MDBCard>

                        <MDBCardBody>
                            <MDBRow>
                                <div style={{ display: 'flex'}}>
                                    <MdOutlineClose onClick={handleClickX} style={{marginTop: '-2px',fontSize:'30px',marginLeft: '-10px'}}/>
                                    <MDBCardTitle style={{ margin: 'auto' }}>Budget Details</MDBCardTitle>
                                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                        <FaPen style={{fontSize: '20px',marginRight: '5px'}}/>
                                        <MdDelete style={{fontSize: '25px',marginRight: '-5px',marginTop: '-2px'}}/>
                                    </div>
                                </div>

                                <hr style={{width: '350px',marginTop: '10px'}}/>
                                <MDBRow className="wallet-infomation">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Image
                                            borderRadius='full'
                                            boxSize='50px'
                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                            alt=''
                                        />
                                        <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ marginBottom: '5px' }}>Education</span>
                                            <span>7,000,000 đ</span>
                                        </div>
                                    </div>
                                    <div style={{ width: '350px' }}>
                                        <Table variant='simple' style={{ width: '100%' }}>
                                            <Tbody>
                                                <Tr>
                                                    <Td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #fff' }}>inches</Td>
                                                    <Td style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #fff' }}>millimetres (mm)</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #fff' }}>inches</Td>
                                                    <Td style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #fff' }}>millimetres (mm)</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </div>
                                    <div>
                                        <ProgressBar style={{marginLeft: '-40px',marginTop: '-25px' }} completed={60} />
                                    </div>

                                </MDBRow>
                                <hr style={{width: '350px',marginTop: '10px'}}/>
                                <MDBRow className="wallet-infomation">


                                </MDBRow>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                )}
            </div>
        </>
    );
}

export default ProgressCircle;
