import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Doughnut } from "react-chartjs-3";
import { Image, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCol,
    MDBRow
} from 'mdb-react-ui-kit';
import {MDBCardText} from "mdbreact";
import {Link} from "react-router-dom";

const ChartPage = ({ wallet_id }) => {
    const userdata = JSON.parse(localStorage.getItem("user"));

    // Income transactions
    const [listTransactionIncome, setListTransactionIncome] = useState([]);
    const [incomeCategory, setIncomeCategory] = useState([]);
    const [incomeAmount, setIncomeAmount] = useState([]);

    useEffect(() => {
        if (wallet_id) {
            const fetchData = async () => {
                getTransactionIncome(userdata, wallet_id);
                getTransactionEx(userdata, wallet_id);
            };
            fetchData();
        }
    }, [userdata]);

    const getTransactionIncome = (userdata, wallet_id) => {
        if (wallet_id) {
            axios.get(`http://localhost:8080/api/transactions/user/${userdata.id}/income_transaction/${wallet_id}`)
                .then((res) => {
                    console.log(res);
                    setListTransactionIncome(res.data);
                    getlist(res.data, setIncomeCategory, setIncomeAmount);
                })
                .catch((error) => {
                    console.error("Error fetching income transaction data:", error);
                });
        }
    };

    // Expense transactions
    const [listTransactionEx, setListTransactionEx] = useState([]);
    const [exCategory, setExCategory] = useState([]);
    const [exAmount, setExAmount] = useState([]);

    useEffect(() => {
        if (wallet_id) {
            const fetchData = async () => {
                getTransactionEx(userdata, wallet_id);
                getTransactionIncome(userdata,wallet_id);
            };
            fetchData();
        }
    }, [wallet_id]);

    const getTransactionEx = (userdata, wallet_id) => {
        if (wallet_id) {
            axios.get(`http://localhost:8080/api/transactions/user/${userdata.id}/expense_transaction/${wallet_id}`)
                .then((res) => {
                    console.log(res);
                    setListTransactionEx(res.data);
                    getlist(res.data, setExCategory, setExAmount);
                })
                .catch((error) => {
                    console.error("Error fetching expense transaction data:", error);
                });
        }
    };

    function getlist(transactions, setCategory, setAmount) {
        const category = [];
        const amount = [];
        transactions.forEach(transaction => {
            if (transaction.category.type === "INCOME" || transaction.category.type === "EXPENSE") {
                const index = category.indexOf(transaction.category.name)
                if (index === -1) {
                    category.push(transaction.category.name);
                    amount.push(transaction.amount);
                }
                else amount[index] += transaction.amount
            }
        })
        setCategory(category);
        setAmount(amount)
    }

    const dataIncome = {
        labels: incomeCategory,
        datasets: [{
            data: incomeAmount,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#9aff56',
                '#e056ff',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#a2ff56',
                '#9456ff',
            ]
        }]
    };

    const dataEx = {
        labels: exCategory,
        datasets: [{
            data: exAmount,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#9aff56',
                '#e056ff',
                '#5664ff'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#a2ff56',
                '#9456ff',
                '#56ffeb'
            ]
        }]
    };

    return (
        <div>
            <div className="div-card">
                <MDBRow className='card-simplegrid row-cols-1 row-cols-md-3 g-4'>
                    <MDBCol style={{ width: '33%' }}>
                        <MDBCard className='h-100'>
                            <Doughnut data={dataIncome} position='top' />
                            <MDBCardBody>
                                <MDBCardText>
                                    <div style={{ maxHeight: '250px', margin: 'auto', overflowY: 'auto' }}>
                                        <TableContainer>
                                            <Table variant='simple'>
                                                <Tbody>
                                                    {listTransactionIncome.map((transaction) => (
                                                        <Tr key={transaction._id}>
                                                            <Td style={{ display: 'flex', alignItems: 'center' }}>
                                                                <Image
                                                                    borderRadius='full'
                                                                    boxSize='50px'
                                                                    src={transaction.category.image}
                                                                    alt=""
                                                                />
                                                                <span style={{ marginLeft: '5px' }}>{transaction.category.name}</span>
                                                            </Td>
                                                            <Td style={{ textAlign: 'right' }}>{transaction.amount} vnd </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <Link to= "/auth/piechart" className='text-dark' >
                                    <span>See Detail</span>
                                </Link>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol style={{ width: '33%' }}>
                        <MDBCard className='h-100'>
                            <Doughnut data={dataEx} position='top' />
                            <MDBCardBody>
                                <MDBCardText>
                                    <div style={{ maxHeight: '250px', margin: 'auto', overflowY: 'auto' }}>
                                        <TableContainer>
                                            <Table variant='simple'>
                                                <Tbody>
                                                    {listTransactionEx.map((transaction) => (
                                                        <Tr key={transaction._id}>
                                                            <Td style={{ display: 'flex', alignItems: 'center' }}>
                                                                <Image
                                                                    borderRadius='full'
                                                                    boxSize='50px'
                                                                    src={transaction.category.image}
                                                                    alt=""
                                                                />
                                                                <span style={{ marginLeft: '5px' }}>{transaction.category.name}</span>
                                                            </Td>
                                                            <Td style={{ textAlign: 'right' }}>{transaction.amount} vnd </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <Link to= "/auth/exchart" className='text-dark' >
                                    <span>See Detail</span>
                                </Link>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol style={{ width: '33%' }}>
                        <MDBCard className='h-100'>
                            {/* Content for the third card */}
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
    );
};

export default ChartPage;
