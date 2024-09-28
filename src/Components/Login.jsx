import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

// validation schema


const validationSchema = Yup.object().shape({



  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[A-Za-z0-9._%+-]+@gmail\.com$/, 'Email address must be a valid Gmail address'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 to 8 characters')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('password is required')


})



const Login = () => {

  const [data, setData] = useState({

    email: "",
    password: "",

  })

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


  const navigate = useNavigate();

  const handleChange = (event) => {

    const { name, value } = event.target
    setData({
      ...data,
      [name]: value

    })
  }


  // const login = async () => {
  //   localStorage.setItem('login', true)

  //   setLogedIn(true);


  // }

  // toggel hide unhide

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };



  const onSubmit = async (event) => {

    event.preventDefault()
    console.log(data);
    const isValid = await validateForm();

    if (isValid) {
      const retriveData = localStorage.getItem('signupData');
      if (retriveData) {
        const userData = JSON.parse(retriveData);

        const user = userData.find(user => data.email === user.email && data.password === user.password)
        if (user) {
          toast.success("Login successful")
          localStorage.setItem("login", true);
          navigate('/home');
          
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }

        else {
          toast.error("Invalid Email or password")

        }

      }

    }

  }




  return (

    <>
      <ToastContainer />

      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">

          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md-auto w-full mt-10 md:mt-0 ">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>

            <form onSubmit={onSubmit}>

              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email" value={data.email} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              </div>

              <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                <input type={passwordVisible ? 'text' : "password"} id="password" name="password" value={data.password} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
                <button className="text-white bg-indigo-500 border-0 py-2  px-8 focus:outline-none w-full hover:bg-indigo-600 rounded text-lg mt-2" >Login</button>

              </div>

            </form>

            <p className='flex justify-center mt-8'><Link to="/" className='text-indigo-500 underline underline-offset-2 mr-2'> Signup   </Link> If you are not Registered</p>

          </div>
        </div>
      </section>




    </>
  )
}

export default Login
