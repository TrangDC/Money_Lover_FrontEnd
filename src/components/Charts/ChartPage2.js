import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";
import axios from "axios";
import {
    Image,
    Table,
    Tbody,
    Td,
    Tr,
    FormControl,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import { useWallet } from "../WalletContext";

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
    const { selectedWalletId } = useWallet();
    const userdata = JSON.parse(localStorage.getItem("user"));
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');



    useEffect(() => {
        setUser(userdata);
        getTransactionsByDateRange(userdata, selectedWalletId, startDate, endDate);

    }, [selectedWalletId, startDate, endDate]);

    const getTransactionsByDateRange = (userdata, selectedWalletId, startDate, endDate) => {
        if (selectedWalletId && startDate && endDate) {
            axios.get(`http://localhost:8080/api/transactions/user/${userdata.id}/transactions/${selectedWalletId}/dateRange/${startDate}/${endDate}`)
                .then((res) => {
                    setListTransaction(res.data);
                    getIncomeList(res.data);
                    getExpenseList(res.data);
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
        }
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
    };

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
    };

    const data = [
        {
            name: expenseCategory,
            income: incomeAmount,
            expense: -expenseAmount,
        }
    ];

    const calculateNetIncome = () => {
        return incomeAmount - expenseAmount;
    };

    return (
        <div>
            <div>
                <FormControl>
                    <FormLabel>From</FormLabel>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>To</FormLabel>
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </FormControl>
                <Button onClick={() => getTransactionsByDateRange(userdata, selectedWalletId, startDate, endDate)}>Filter</Button>
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
            </div>
        </div>
    );
};

export default ApexChart;
