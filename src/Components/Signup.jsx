import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

// validation schema

const validationSchema = Yup.object().shape({

    name: Yup.string().required('name is required'),

    phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('phone is required'),

    email: Yup.string()
        .email("Invalid email address")
        .matches(/^[A-Za-z0-9._%+-]+@gmail\.com$/, 'Email address must be a valid Gmail address'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 to 8 characters')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
        .required('password is required')


})



const Signup = () => {

    const navigate = useNavigate();

    //  Usestate
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);



    //Validation

    const validateForm = async () => {
        try {
            await validationSchema.validate(data, { abortEarly: false });
            setErrors({});
            return true;

        }
        catch (err) {
            const newErrors = {};
            err.inner.forEach((err) => {

                newErrors[err.path] = err.message;

            })
            setErrors(newErrors);
            return false;

        }

    }


    //  Emty array
    const [array, setArray] = useState(() => {
        const localData = localStorage.getItem('signupData')
        if (localData) {
            return JSON.parse(localData);
        } else {
            return [];
        }
    });

    // Handle input values 
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            // Convert email to lowercase before updating the state
            setData({
                ...data,
                [name]: value.toLowerCase()
            });
        } else {
            setData({
                ...data,
                [name]: value
            });
        }
    };

    // Handle onSubmit
    const onSubmit = async (event) => {
        event.preventDefault();
        const isValid = await validateForm();
        const filterdData = array.filter((item) => {
            return item.email === data.email
        })

        if (filterdData.length > 0) {
            toast.error('Account already exists with this email!');

        } else {
            if (isValid) {
                setArray([...array, data]);
                toast.success("Sign-up successfully!")
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
                document.getElementById("signupForm").reset();
            }
        }

    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Set data in localStorage
    useEffect(() => {
        localStorage.setItem('signupData', JSON.stringify(array)); // Store the updated array back in localStorage
    }, [array])

    return (
        <>
            <ToastContainer />
            <section className="text-gray-600 body-font ">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">

                    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md-auto w-full mt-10 md:mt-0 ">
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>

                        <form id='signupForm' autoComplete="off" onSubmit={onSubmit}>

                            <div className="relative mb-4">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Full Name</label>
                                <input type="text" id="name" name="name" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" id="email" name="email" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                                <input type="text" id="phone" name="phone" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                <input type={passwordVisible ? 'text' : 'password'} id="password" name="password" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}



                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                >
                                    {passwordVisible ? (
                                        <svg className="h-5 w-5 mt-4
          " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19.5c-5.523 0-10-4.477-10-10 0-1.316.254-2.574.716-3.716m3.716-.716A9.95 9.95 0 0112 4.5c5.523 0 10 4.477 10 10 0 1.315-.254 2.573-.716 3.716m-3.716.716A9.95 9.95 0 0112 19.5c-5.523 0-10-4.477-10-10 0-1.316.254-2.574.716-3.716" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 mt-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12s3-5 9-5 9 5 9 5-3 5-9 5-9-5-9-5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12s3-5 9-5 9 5 9 5-3 5-9 5-9-5-9-5z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className='flex justify-center'>

                                <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8  w-full  focus:outline-none hover:bg-indigo-600 rounded text-lg">Signup</button>
                            </div>

                        </form>
                        <p className='flex justify-center mt-8'><Link to="/login" className='text-indigo-500 underline underline-offset-2 mr-2'> Login   </Link>{' '}If you alredy Registered</p>

                    </div>

                </div>
            </section>




        </>
    )
}

export default Signup
