import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine
} from "recharts";
import axios from "axios";
import {Image, Table, TableContainer, Tbody, Td, Tr} from "@chakra-ui/react";
import PropTypes from "prop-types";
import TransactionService from "../../services/transactions.services";



const ApexChart = () => {


    const [dailyTransactions, setDailyTransactions] = useState({});
    const [monthlyTransactions, setMonthlyTransactions] = useState({});
    const [yearlyTransactions, setYearlyTransactions] = useState({});
    const [listTransaction, setListTransaction] = useState([]);
    const [incomeCategory, setIncomeCategory] = useState([]);
    const [expenseCategory, setExpenseCategory] = useState([]);
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [user, setUser] = useState({});

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("user"));
        setUser(userdata);
        transactions(userdata);
        transaction(userdata);
    }, []);
    const transactions = (userdata) => {
        axios.get(`http://localhost:8080/api/transactions/user/${userdata?.id}/income_transaction/7`)
            .then((res) => {
                setListTransaction(res.data);
                getIncomeList(res.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    const transaction = (userdata) => {
        axios.get(`http://localhost:8080/api/transactions/user/${userdata?.id}/expense_transaction/7`)
            .then((res) => {
                setListTransaction(res.data);
                getExpenseList(res.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    const calculateTransactions = (transactions) => {
        const dailyTransactions = calculateDailyTransactions(transactions);
        setDailyTransactions(dailyTransactions);

        const monthlyTransactions = calculateMonthlyTransactions(transactions);
        setMonthlyTransactions(monthlyTransactions);

        const yearlyTransactions = calculateYearlyTransactions(transactions);
        setYearlyTransactions(yearlyTransactions);
    };

    const calculateDailyTransactions = (transactions) => {
        const dailyTransactions = {};

        transactions.forEach(transaction => {
            const date = new Date(transaction.date).toISOString().slice(0, 10); // Lấy ngày (YYYY-MM-DD)

            if (!dailyTransactions[date]) {
                dailyTransactions[date] = { income: 0, expense: 0 };
            }

            if (transaction.category.type === "INCOME") {
                dailyTransactions[date].income += transaction.amount;
            } else if (transaction.category.type === "EXPENSE") {
                dailyTransactions[date].expense += transaction.amount;
            }
        });

        return dailyTransactions;
    };

    const calculateMonthlyTransactions = (transactions) => {
        const monthlyTransactions = {};

        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;

            if (!monthlyTransactions[yearMonth]) {
                monthlyTransactions[yearMonth] = { income: 0, expense: 0 };
            }

            if (transaction.category.type === "INCOME") {
                monthlyTransactions[yearMonth].income += transaction.amount;
            } else if (transaction.category.type === "EXPENSE") {
                monthlyTransactions[yearMonth].expense += transaction.amount;
            }
        });

        return monthlyTransactions;
    };

    const calculateYearlyTransactions = (transactions) => {
        const yearlyTransactions = {};

        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const year = date.getFullYear();

            if (!yearlyTransactions[year]) {
                yearlyTransactions[year] = { income: 0, expense: 0 };
            }

            if (transaction.category.type === "INCOME") {
                yearlyTransactions[year].income += transaction.amount;
            } else if (transaction.category.type === "EXPENSE") {
                yearlyTransactions[year].expense += transaction.amount;
            }
        });

        return yearlyTransactions;
    };
    const getIncomeList = (transactions) => {
        const incomeCat = [];
        let incomeAmt = 0;

        transactions.forEach(transaction => {
            if (transaction.category.type === "INCOME") {
                const index = incomeCat.indexOf(transaction.category.name);
                if (index === -1) {
                    incomeCat.push(transaction.category.name);
                    incomeAmt += transaction.amount;
                } else {
                    incomeAmt += transaction.amount;
                }
            }
        });

        setIncomeCategory(incomeCat);
        setIncomeAmount(incomeAmt);
    }

    const getExpenseList = (transactions) => {
        const expenseCat = [];
        let expenseAmt = 0;
        transactions.forEach(transaction => {
            if (transaction.category.type === "EXPENSE") {
                const index = expenseCat.indexOf(transaction.category.name);
                if (index === -1) {
                    expenseCat.push(transaction.category.name);
                    expenseAmt += transaction.amount;
                } else {
                    expenseAmt += transaction.amount;
                }
            }
        });

        setExpenseCategory(expenseCat);
        setExpenseAmount(expenseAmt);
    }

    const data = [
        {
            name: expenseCategory,
            income: incomeAmount,
            expense: -expenseAmount,
        }
    ];
    function Barchart({ listTransaction }) {
        return (
            <Table variant='simple'>
                <div style={{marginLeft:'37vh',}}>
                    <Tbody>
                        {listTransaction.map((transactions) => (
                            <Tr key={transactions.id}>
                                <Td style={{ display: 'flex', alignItems: 'center' }}>
                                    <Image
                                        borderRadius='full'
                                        boxSize='50px'
                                        src={transactions.category.image}
                                        alt=""
                                    />
                                    <span style={{ marginLeft: '90vh' }}>{transactions.category.name}</span>
                                </Td>
                                <Td style={{ textAlign: 'right' }}>{transactions.amount} vnd</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </div>
            </Table>

        );
    }

    Barchart.propTypes = {
        listTransaction: PropTypes.array.isRequired
    };
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '42vh' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Tổng Cộng:
                </div>
                <div style={{ marginLeft: '20px', color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
                    <span variant="h2" color="textSecondary">
              Income: {incomeAmount}  Expense: {expenseAmount}
        </span>
                </div>
            </div>
            <div>
                <BarChart
                    width={1500}
                    height={400}
                    data={data}
                    margin={{
                        top: 40,
                        right: 50,
                        left: 500,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 'dataMax']} />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="income" fill='#2E8B57 ' barSize={60} left={20} />
                    <Bar dataKey="expense" fill="red"  barSize={60} />
                </BarChart>
                <Barchart listTransaction={listTransaction} />
            </div>
        </div>
    );
};

export default ApexChart;
