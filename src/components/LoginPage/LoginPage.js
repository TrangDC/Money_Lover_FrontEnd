import React, {useEffect, useState} from 'react';
import LoginForm from "./LoginForm";
import './login.css';
import {
    MDBContainer
}
    from 'mdb-react-ui-kit';

const LoginPage = () => {

    const [users, setUser] = useState({}); // Khởi tạo state users với giá trị ban đầu là một object trống
    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log(user);
        setUser(user);
    }, [users]);

    return (
        <div>
            <MDBContainer fluid>
                <div className="p-5 bg-image" style={{background:"green", height: '350px'}}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/fir-2c9ce.appspot.com/o/Money-Lover---Logo.png?alt=media&token=01ddbb3b-dddb-4e07-b494-c4b4cdde884d"
                         style={{width: '350px',marginLeft: '720px'}}
                         alt="" fluid/>
                </div>
                <LoginForm />
            </MDBContainer>
        </div>
    );
};

export default LoginPage;