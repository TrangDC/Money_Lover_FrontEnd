import React, { useState } from 'react';
import './login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { FaApple } from "react-icons/fa";
import {useDisclosure, useToast} from '@chakra-ui/react';
import { jwtDecode } from "jwt-decode";
import Button from 'react-bootstrap/Button';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'


const LoginForm = ({ handleLoginSuccess }) => {
    let navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
    };
    const toast = useToast()
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', values);
            localStorage.setItem("user", JSON.stringify(response.data));
            handleLoginSuccess();
            console.log(response.data);
            toast({
                title: 'Login Successful',
                description: 'You have successfully logged in.',
                status: 'success',
                duration: 1500,
                isClosable: true,
            });
            setTimeout(() => {
                navigate('/auth/home');
            }, 2000);
        } catch (error) {
            console.error('Error during login:', error);
            toast({
                title: 'Login Failed',
                description: 'Please check your credentials and try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        setSubmitting(false);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
            console.log(credentialResponseDecoded);

            // Lấy email từ credentialResponseDecoded và lưu vào state email
            const email = credentialResponseDecoded.email;

            // Tạo một password dựa trên email và lưu vào state password
            const password = generatePasswordFromEmail(email);

            console.log('Email:', email);
            console.log('Password:', password);

            // Lưu credentialResponseDecoded vào localStorage
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    localStorage.setItem('user', JSON.stringify(credentialResponseDecoded));
                    resolve();
                }, 1000);
            });

            handleLoginSuccess();

            // Sau khi lưu vào localStorage và đợi 3 giây, làm mới trang và thực hiện navigate
            setTimeout(() => {
                navigate("/auth/home");
            }, 1000);
            // Sau khi lưu vào localStorage và đợi 3 giây, thực hiện navigate

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const generatePasswordFromEmail = (email) => {
        const username = email.substring(0, email.indexOf('@')); // Lấy phần username của email
        return username + '123'; // Thêm một chuỗi đơn giản vào username
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Formik initialValues={initialValues}
                validationSchema={Yup.object({
                    email: Yup.string().trim().email().required('Email is a required field.'),
                    password: Yup.string()
                        .required('Password is a required field.')
                })}
                onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <MDBCard
                        className='shadow-5 text-center'
                        style={{
                            marginTop: '-130px',
                            margin: 'auto',
                            backdropFilter: 'blur(30px)',
                            borderRadius: '1rem',
                            maxWidth: '650px',
                        }}
                    >

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>GET PASSWORD</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input placeholder='Enter Email' />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Verification</FormLabel>
                                        <Input placeholder='Confirmation code has been sent to email' />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3}>
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <MDBCardBody className='p-5 text-center'>
                            <h2 className='fw-bold text-black mb-5 text-center' style={{ marginTop: '-30px' }}>
                                Log In
                            </h2>
                            <MDBRow>
                                <MDBCol col='10' md='6'>
                                    <p className='text-black-50 mb-3'>Using social networking accounts</p>

                                    <MDBBtn outline rounded className='mb-3 w-100' color='danger'>
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                        />
                                    </MDBBtn>

                                    <MDBBtn outline rounded className='mb-3 w-100' size='lg'>
                                        <FaFacebook className="mb-1" style={{ width: '25px', height: '25px', marginLeft: '-40px' }}
                                                    appId="1320486661979779"
                                                    onSuccess={(response) => {
                                                        console.log('Login Success!', response);
                                                        navigate("/");
                                                        window.location.reload();
                                                    }}
                                                    onFail={(error) => {
                                                        console.log('Login Failed!', error);
                                                    }}
                                                    onProfileSuccess={(response) => {
                                                        console.log('Get Profile Success!', response);
                                                    }}
                                        />
                                        <span className="social-text">Sign in with Facebook</span>
                                    </MDBBtn>

                                    <MDBBtn outline rounded className='mb-3 w-100' size='lg' color='dark'>
                                        <FaApple className="mb-1" style={{ width: '25px', height: '25px', marginLeft: '-65px' }}/>
                                        <span className="social-text">Sign in with Apple</span>
                                    </MDBBtn>
                                </MDBCol>
                                <MDBCol col='6' md='6'>
                                    <p className='text-black-50 mb-3'>Using Money Lover account</p>
                                    <div>
                                        <Field
                                            as={MDBInput}
                                            wrapperClass='mb-4 w-100'
                                            label='Email address'
                                            id='formControlLgs'
                                            type='email'
                                            size='lg'
                                            name='email'
                                        />
                                        <div className=" small" style={{color: 'red',marginTop: '-20px'}}>
                                            <ErrorMessage name='email' component='span' />
                                        </div>

                                        <div>
                                            <Field
                                                as={MDBInput}
                                                wrapperClass='mb-4 w-100'
                                                label='Password'
                                                id='formControlLg'
                                                type={showPassword ? 'text' : 'password'}
                                                size='lg'
                                                name='password'
                                            />
                                            <div className=" small" style={{color: 'red',marginTop: '-20px'}}>
                                                <ErrorMessage name='password' component='span' />
                                            </div>
                                            <div style={{marginTop: 0,marginLeft: '95px'}}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="showPasswordCheckbox"
                                                    checked={showPassword}
                                                    onChange={togglePasswordVisibility}
                                                />

                                                <label className="form-check-label" htmlFor="showPasswordCheckbox">
                                                    Show Password
                                                </label>
                                            </div>
                                        </div>
                                        <div className="m-3" style={{ marginRight: 'auto' }}>
                                            <Link onClick={onOpen} style={{ color: 'green' }}>Forgot password?</Link>
                                        </div>
                                    </div>
                                    <MDBBtn className='w-100 mb-4' size='md' color='success' type='submit' disabled={isSubmitting}>
                                        {isSubmitting ? 'Logging in...' : 'LOGIN'}
                                    </MDBBtn>
                                    <p style={{ color: 'black' }}>
                                        Don't have an account? <Link to='/register' style={{ color: 'green' }}>Register here</Link>
                                    </p>

                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
