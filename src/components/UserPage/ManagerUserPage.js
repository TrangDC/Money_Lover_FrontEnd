import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [users, setUser] = useState({}); // Khởi tạo state users với giá trị ban đầu là một object trống
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("user"))
        // console.log(user);
        setUser(users);
    }, [users]);

    return (
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                />
                <Button
                    variant="outline-secondary"
                    onClick={toggleShowPassword}
                    className="input-group-append"
                >
                    {showPassword ? 'Hide' : 'Show'}
                </Button>
            </div>
        </Form.Group>
    );
};

const ManagerUserPage = () => {
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <PasswordInput />
            </Form>
        </>
    );
};

export default ManagerUserPage;