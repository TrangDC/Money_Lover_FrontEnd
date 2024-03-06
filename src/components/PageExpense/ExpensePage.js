import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React from 'react';
import {Doughnut} from 'react-chartjs-3';
import {
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
import { Image } from '@chakra-ui/react';
import { CgCalendarDates } from "react-icons/cg";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CiCalendarDate } from "react-icons/ci";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsCalendar2Week } from "react-icons/bs";
import { LiaCalendarWeekSolid } from "react-icons/lia";

const data = {
    labels: [
        'Red',
        'Green',
        'Yellow',
        'Blue'
    ],
    datasets: [{
        data: [300, 50, 100,300],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#CDCDCD'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#CDCDCD'
        ]
    }]
};

const DoughnutChart = () => (
    <div>
        <Doughnut data={data} />
    </div>
);

const ExpensePage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <div style={{width: '50%',height: '50%',margin: 'auto'}}>

                <Tabs isFitted variant='enclosed'>
                    <CgCalendarDates style={{width: '30px',height: '30px',marginLeft: '100%'}} onClick={handleShow} />
                    <TabList mb='1em'>
                        <Tab>One</Tab>
                        <Tab>Two</Tab>
                        <Tab>Three</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <DoughnutChart />
                            <div style={{height: '50%',margin: 'auto'}}>
                                <TableContainer>
                                    <Table variant='simple'>
                                        <Tbody>
                                            <Tr>
                                                <Td style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_139.png'
                                                        alt=""
                                                    />
                                                    <span style={{ marginLeft: '5px' }}>Gas Bill</span>
                                                </Td>
                                                <Td style={{ textAlign: 'right' }}>-1000000000 vnd</Td>
                                            </Tr>
                                            <Tr>
                                                <Td style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_139.png'
                                                        alt=""
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Gas Bill</span>
                                                </Td>
                                                <Td style={{ textAlign: 'right' }}>-1000000000 vnd</Td>
                                            </Tr>
                                            <Tr>
                                                <Td style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_139.png'
                                                        alt=""
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Gas Bill</span>
                                                </Td>
                                                <Td style={{ textAlign: 'right' }}>-1000000000 vnd</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
            <Offcanvas style={{height: '50%'}} show={show} onHide={handleClose} placement="bottom">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Select time range</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div style={{ display: 'flex', alignItems: 'center',marginTop: '-10px' }}>
                        <CiCalendarDate style={{ height: '40px', width: '40px' }} /> <span style={{ marginLeft: '5px' }}>Day</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <BsCalendar2Week style={{ height: '30px', width: '30px',marginLeft: '5px' }} /> <span style={{ marginLeft: '10px' }}>Week</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <IoCalendarNumberOutline style={{ height: '30px', width: '30px',marginLeft: '5px'  }} /> <span style={{ marginLeft: '10px' }}>Month</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <LiaCalendarWeekSolid style={{ height: '40px', width: '40px' }} /> <span style={{ marginLeft: '5px' }}>Year</span>
                    </div>
                </Offcanvas.Body>


            </Offcanvas>

        </div>
    );
};

export default ExpensePage;
