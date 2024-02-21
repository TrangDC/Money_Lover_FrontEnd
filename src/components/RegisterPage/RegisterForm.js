import React, {useState} from 'react';
import {
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
}
from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import YupPassword from 'yup-password';
YupPassword(Yup);


const RegisterForm = () => {
    // const initialValues = {
    //     email: '',
    //     password: '',
    // };

    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = (values, { setSubmitting }) => {
        // Xử lý logic khi submit form
        console.log(values);
        setSubmitting(false);
    };

    const SignupSchema = Yup.object().shape({
        email: Yup.string().required('Email is a required field.').email(),
        password: Yup.string()
            .required('Password is a required field.')
            .min(8,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
            )
            .minLowercase(1, 'password must contain at least 1 lower case letter')
            .minUppercase(1, 'password must contain at least 1 upper case letter')
            .minNumbers(1, 'password must contain at least 1 number')
            .minSymbols(1, 'password must contain at least 1 special character')
    });
    return (

        <Formik initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <MDBCard
                        className='shadow-5 text-center'
                        style={{
                            marginTop: '-130px',
                            marginLeft: '365px',
                            backdropFilter: 'blur(30px)',
                            borderRadius: '1rem',
                            maxWidth: '650px',
                        }}
                    >
                        <MDBCardBody className='p-5 text-center'>
                            <h2 className='fw-bold text-black mb-5 text-center' style={{ marginTop: '-30px' }}>
                                Register
                            </h2>
                            <MDBRow>
                                <MDBCol col='10' md='6'>
                                    <p className='text-black-50 mb-3'>Using social networking accounts</p>
                                    <MDBBtn className='mb-4 w-100' size='lg' style={{ backgroundColor: '#3b5998' }}>
                                        <MDBIcon className='m-n3' />
                                        Sign in with Facebook
                                    </MDBBtn>

                                    <MDBBtn className='mb-4 w-100' size='lg' color='danger'>
                                        <MDBIcon className='m-n3' />
                                        Sign in with Gmail
                                    </MDBBtn>
                                    <MDBBtn className='mb-4 w-100' size='lg' color='dark'>
                                        <MDBIcon className='m-n3' />
                                        Sign in with Apple
                                    </MDBBtn>
                                </MDBCol>
                                <MDBCol col='6' md='6'>
                                    <p className='text-black-50 mb-3'>Create Money Lover account</p>
                                    <div>
                                        <MDBInput
                                            wrapperClass='mb-4 w-100'
                                            label='Email address'
                                            id='formControlLgs'
                                            type='email'
                                            size='lg'
                                            name='email'
                                            as={Field}
                                        />
                                        <ErrorMessage name='email' component='span' className='text-red-500' />
                                        <MDBInput
                                            wrapperClass='mb-4 w-100'
                                            label='Password'
                                            id='formControlLg'
                                            type='password'
                                            size='lg'
                                            name='password'
                                            as={Field}
                                        />
                                        <ErrorMessage name='password' component='span' className='text-red-500' />
                                    </div>
                                    <MDBBtn className='w-100 mb-4' size='md' color='success' type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Logging in...' : 'REGISTER'}
                                    </MDBBtn>
                                    <p style={{color: 'black'}}>
                                        Have you an account? <Link to="/login" style={{color: 'green'}}>Login here</Link>
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

export default RegisterForm;