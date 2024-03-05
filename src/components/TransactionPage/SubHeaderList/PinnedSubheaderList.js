import * as React from 'react';
import './PinnedSubheaderList.css';
import {useEffect, useState} from "react";
import OutlinedCard from "../OutlinedCard/OutlinedCard";
import TransactionService from "../../../services/transactions.services";
import {Button, Checkbox, Input, Navbar, TabsHeader} from "@material-tailwind/react";
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@material-tailwind/react";
import {Divider} from "antd";
import Form from "react-bootstrap/Form";
export default function PinnedSubheaderList() {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [totalInflow, setTotalInflow] = useState(0);
    const [totalOutflow, setTotalOutflow] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await TransactionService.fetchTransactions();
            setTransactions(data);
            localStorage.setItem("transactions", JSON.stringify(data))
        };

        fetchData();
    }, [currentMonthIndex]);

    useEffect(() => {
        const inflow = TransactionService.calculateTotalInflow(transactions);
        const outflow = TransactionService.calculateTotalOutflow(transactions);
        setTotalInflow(inflow);
        setTotalOutflow(outflow);
    }, [currentMonthIndex, transactions]);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handlePrevNextMonths = (currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment) => {
        TransactionService.handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment)
    };

    const handleCurrentMonth = (setCurrentMonthIndex, setCurrentYear) => {
        TransactionService.handleCurrentMonth(setCurrentMonthIndex, setCurrentYear);
    };

    const groupTransactionsByDate = () => {
        return TransactionService.groupTransactionsByDate(transactions, currentMonthIndex, currentYear);
    };

    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseClick = () => {
        setSelectedTransaction(null);
    };

    const groupedTransactions = groupTransactionsByDate();

    const [isFormVisible, setIsFormVisible] = useState(false);

    // Function to handle click on the button to toggle form visibility
    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };


    return (
        <div className="root flex justify-center mt-32">
            <div style={{ width: "800px" }}>
                <nav>
                    <div className="flex justify-between items-center">
                        <div className="space-x-4 flex items-center">
                            <Button onClick={toggleFormVisibility} variant="outlined">Toggle Form</Button>
                            <Button
                                variant="outlined"
                                class="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                                onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, -1)}>
                                {currentMonthIndex === 0 ? months[11] : months[currentMonthIndex - 1]} {currentMonthIndex === 0 ? currentYear - 1 : currentYear}
                            </Button>
                            <Button
                                variant="outlined"
                                class="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}>
                                {months[currentMonthIndex]} {currentYear}</Button>
                            <Button
                                variant="outlined"
                                class="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                                onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, 1)}>
                                {currentMonthIndex === 11 ? months[0] : months[currentMonthIndex + 1]} {currentMonthIndex === 11 ? currentYear + 1 : currentYear}
                            </Button>
                        </div>
                        <div>
                            Header
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg mt-4 overflow-hidden">
                        <Card class="w-full">
                            {groupedTransactions.length === 0 ? (
                                <div style={{ height: "450px" }}>
                                    <ListItem>
                                        No transactions for this month
                                    </ListItem>
                                    <Button variant="outlined" onClick={() => handleCurrentMonth(setCurrentMonthIndex, setCurrentYear)}>
                                        Back to the current month
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <List>
                                        {groupedTransactions.map(({ date, transactions }) => (
                                            <List key={date} class="border-t border-gray-200">
                                                <ListItem className="sticky-top bg-white z-10">
                                                    {date.toDateString()}
                                                </ListItem>
                                                {transactions.map((transaction) => (
                                                    <ListItem
                                                        class="flex items-center py-2 px-4 border-t border-gray-200"
                                                        key={transaction.id}
                                                        onClick={() => handleTransactionClick(transaction)}>
                                                        <ListItemPrefix>
                                                            <Avatar variant="circular" alt="candice"
                                                                    src="https://docs.material-tailwind.com/img/face-1.jpg" />
                                                        </ListItemPrefix>
                                                        <div className="flex justify-between w-full">
                                                            <div>
                                                                <Typography variant="h6" color="blue-gray">
                                                                    {transaction.category.name}
                                                                </Typography>
                                                            </div>
                                                            <div>
                                                                <Typography variant="h5"
                                                                            style={{ color: transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? 'blue' : 'red' }}
                                                                            class="font-normal">
                                                                    {transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? '+' : '-'}
                                                                    {transaction.amount}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        ))}
                                    </List>
                                </div>
                            )}
                        </Card>
                    </div>
                </nav>
            </div>
            {selectedTransaction && (
                <>
                    <OutlinedCard transaction={selectedTransaction} onClose={handleCloseClick}/>
                </>
            )}
            {/* Conditional rendering of the form component */}
            {isFormVisible && (
                <div className="form-container">
                    <Card color="transparent" shadow={false}>
                        <Typography variant="h4" color="blue-gray">
                            Sign Up
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Nice to meet you! Enter your details to register.
                        </Typography>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Your Name
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="name@mail.com"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Your Email
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="name@mail.com"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Password
                                </Typography>
                                <Input
                                    type="password"
                                    size="lg"
                                    placeholder="********"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                            <Checkbox
                                label={
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="flex items-center font-normal"
                                    >
                                        I agree the
                                        <a
                                            href="#"
                                            className="font-medium transition-colors hover:text-gray-900"
                                        >
                                            &nbsp;Terms and Conditions
                                        </a>
                                    </Typography>
                                }
                                containerProps={{ className: "-ml-2.5" }}
                            />
                            <Button className="mt-6" fullWidth>
                                sign up
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Already have an account?{" "}
                                <a href="#" className="font-medium text-gray-900">
                                    Sign In
                                </a>
                            </Typography>
                        </form>
                    </Card>
                </div>
            )}
        </div>

    );
}
