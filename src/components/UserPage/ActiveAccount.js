import React, {useState} from 'react';

import {
    MDBInput,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';
import axios from "axios";
const ActiveAccount = () => {

    const [authCode, setAuthCode] = useState('');
    const [activeSuccess, setActiveSuccess] = useState(false);

    const handleAuthCodeChange = (event) => {
        setAuthCode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/users/process_active/${authCode}`);
            console.log(response.data);

            setActiveSuccess(true);

            setTimeout(() => {
                window.location.replace('/login');
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{position: "relative",backgroundColor: '#ffffcc',height :'100vh'}}>


            <img src="https://note.moneylover.me/content/images/2017/05/Money-Lover---Logo.png" style={{ margin: 'auto'}}/>
            {activeSuccess ? (
                <h5 style={{position: "absolute", top: "250px", left: "50%", transform: "translateX(-50%)", textAlign: "center"}}>
                    Active successful! Redirect to login...
                </h5>
            ) : (
                <div>
                <div  style={{width: '400px',height: '250px',backgroundColor: '#ffffcc',margin:'auto'}}>
                <form style={{position:"relative", textAlign: 'center', margin: 'auto'}} onSubmit={handleSubmit}>
                    <h3 style={{margin: "auto"}}>Wait a minute!</h3>
                    <h5 style={{margin: "auto"}}>An active code has been sent to your email.</h5>
                    <h5 style={{margin: "auto"}}>Enter Auth Code</h5>
                    <MDBCol col='12' md='12' >
                        <MDBInput style={{backgroundColor: "white"}} className='mb-4' type='password' id='form1Example2' label='Enter Auth Code' value={authCode} onChange={handleAuthCodeChange} />
                        <MDBBtn type='submit' block>
                            Submit
                        </MDBBtn>
                    </MDBCol>
                </form>
                </div>
                </div>
            )}

        </div>

    );
};

export default ActiveAccount;