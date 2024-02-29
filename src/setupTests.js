// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";
import {FaUserEdit} from "react-icons/fa";
import {HiMiniWallet} from "react-icons/hi2";
import {BiLogOut, BiSolidCategory} from "react-icons/bi";
import React from "react";









<div style={{marginTop: '30px',backgroundColor:'lightyellow',height:'795px'}}>
    <ListGroup style={{width:'500px',height: '600px',margin: 'auto'}}>
        <ListGroup.Item className="d-flex align-items-center">
            <Link  onClick={handleShow} className="text-dark d-flex align-items-center">
                <FaUserEdit className="mx-2 text-green-700" style={{ width: '25px', height: '25px' }} />
                <span style={{ fontWeight: 'bold'}}>Account Management</span>
            </Link>
        </ListGroup.Item>

        <ListGroup.Item variant="secondary"><p></p> </ListGroup.Item>

        <ListGroup.Item className="d-flex align-items-center">
            <Link to="/auth/wallets" className="text-dark d-flex align-items-center">
                <HiMiniWallet className="mx-2 text-green-700" style={{ width: '25px', height: '25px' }} />
                <span style={{fontWeight: 'bold'}}>My Wallet</span>
            </Link>
        </ListGroup.Item>
        <ListGroup.Item variant="secondary"><p></p> </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
            <Link to= "/auth/categories" className="text-dark d-flex align-items-center">
                <BiSolidCategory  className="mx-2 text-green-700" style={{width: '25px' ,height: '25px'}}/>
                <span style={{fontWeight: 'bold'}}> Group </span>
            </Link>
        </ListGroup.Item>

    </ListGroup>
</div>