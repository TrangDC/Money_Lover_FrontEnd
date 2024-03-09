import React from 'react';
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
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

function ProgressCircle({ value, maxValue }) {
    const percentage = Math.min((value / maxValue) * 100, 100);

    return (
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
            <div style={{marginTop: '10px',width: '350px'}}>
                <TableContainer style={{marginLeft: '-45%'}}>
                    <Table variant='simple' style={{width: '350px'}}>
                        <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                            </Tr>
                        </Tbody>

                    </Table>
                </TableContainer>
            </div>

        </div>
    );
}

export default ProgressCircle;
