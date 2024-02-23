import React from 'react';
import './login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import {Link, useNavigate} from 'react-router-dom';
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import FacebookLogin from "@greatsumini/react-facebook-login";


const LoginForm = () => {


    let navigate = useNavigate();


    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', values);
            console.log(response.data);

            // Hiển thị toast thông báo đăng nhập thành công
            toast.success('Login successful!', {
                position: toast.POSITION.TOP_CENTER
            });
        } catch (error) {
            console.error('Error during login:', error);

            // Hiển thị toast thông báo đăng nhập không thành công
            toast.error('Login failed. Please check your credentials.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        setSubmitting(false);
    };

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
                        <MDBCardBody className='p-5 text-center'>
                            <h2 className='fw-bold text-black mb-5 text-center' style={{ marginTop: '-30px' }}>
                                Log In
                            </h2>
                            <MDBRow>
                                <MDBCol col='10' md='6'>
                                    <p className='text-black-50 mb-3'>Using social networking accounts</p>
                                    <MDBBtn className='mb-4 w-100' size='lg' style={{ backgroundColor: '#3b5998' }}>
                                        <FacebookLogin
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
                                    </MDBBtn>

                                    <MDBBtn className='mb-4 w-100' size='lg' color='red'>
                                        <GoogleLogin
                                            onSuccess={credentialResponse => {
                                                const credentialResponseDecoded = jwtDecode(credentialResponse.credential)
                                                console.log(credentialResponseDecoded);
                                                navigate("/home");
                                                window.location.reload();
                                            }}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                        />
                                    </MDBBtn>
                                    <MDBBtn className='mb-4 w-100' size='lg' color='dark'>
                                        <MDBIcon className='m-n3' />
                                        Sign in with Apple
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
                                        <ErrorMessage name='email' component='span' className='text-red-500' />
                                        <Field
                                            as={MDBInput}
                                            wrapperClass='mb-4 w-100'
                                            label='Password'
                                            id='formControlLg'
                                            type='password'
                                            size='lg'
                                            name='password'
                                        />
                                        <ErrorMessage name='password' component='span' className='text-red-500' />
                                        <p className='small mb-3 pb-lg-2'>
                                            <a className='text-green-50' href='#!'>
                                                Forgot password?
                                            </a>
                                        </p>
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
