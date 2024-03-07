
import React, {useEffect, useState} from "react";
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
import {List, ListItem, Typography} from "@material-tailwind/react";
import {Card} from "react-bootstrap";
import axios from "axios";
import error from "../Error";
const data = [
    {
        name: "Jan",
        uv: 4000,
        pv: -2000,
        amt: 200,

    }
];

const ApexChart = () => {

    const [data, setData] = useState([]);
    const userdata = JSON.parse(localStorage.getItem("user"));
    const [incomeCategory, setIncomeCategory] = useState([])
    const [listTransaction, setListTransaction] = useState([])
    const [user, setUser] = useState({})
    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("user"));
        setUser(userdata)
        transactions(userdata)
    }, []);

    const transactions = (userdata) => {
        axios.get('http://localhost:8080/api/transactions/user/'+userdata?.id+'/income_transaction/7')
            .then((res) => {
                // window.localStorage.setItem("transactions", JSON.stringify(res.data));
                // const transactions = JSON.parse(localStorage.getItem("transactions"));
                // setListTransaction(transactions)
                setListTransaction(res.data);

            })
            .catch((error)=>{
               console.error("Error")
            });

    }

    function getlist(transactions) {
        const incomeCategory = [];
        const incomeAmount = [];
        transactions.forEach(transaction => {
            // nếu transaction thuộc type income
            if (transaction.category.type === "INCOME") {
                const index = incomeCategory.indexOf(transaction.category.name)
                if (index === -1) {
                    incomeCategory.push(transaction.category.name);
                    incomeAmount.push(transaction.amount)
                }
                incomeAmount[index] += transaction.amount
            }
        })
    }


    return (
        <div>
            { listTransaction.map((transaction) => (
                <div>{transaction.amount}</div>
            ))}

            <div style={{ display: 'flex' }}>
                <div>
                    <Typography variant="h2" color="primary">
                       Tổng Cộng:
                    </Typography>
                </div>
                <div style={{marginLeft:'20px',color:'red'}}>
                    <Typography variant="h2" color="textSecondary">
                        Tiền
                    </Typography>
                </div>
            </div>
            <BarChart
                width={1300}
                height={500}
                data={listTransaction.amount}
                margin={{top: 15, right: 80, left: 102, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </div>
    );
};
export default ApexChart;

