import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

  name: Yup.string().required('name is required'),

  phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('phone is required'),

  email: Yup.string()
      .email("Invalid email address")
      .matches(/^[a-z0-9._%+-]+@gmail\.com$/, 'Email address must be gmail address and in lowecase'),

  password: Yup.string()
      .min(6, 'Password must be at least 6 to 8 characters')
      .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
      .required('password is required')


})




const Edit = () => {
  const navigate = useNavigate ();
  const { index } = useParams();
  const [userData, setUserData] = useState({

    name: " ",
    email: " ",
    password: " ",
    phonway: " ",


  })

  const [errors, setErrors] = useState({});


      //Validation

      const validateForm = async () => {
        try {
            await validationSchema.validate(userData, { abortEarly: false });
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



  useEffect(() => {

    const userList = localStorage.getItem('signupData');

    if (userList) {

      const userInfo = JSON.parse(userList);
      setUserData(userInfo[index]);

    }

    else {
      console.error('No data found in local storage');

    }

  }, [index])


  // handleChange

  const handleChange = async (event) => {
     

      const { name, value } = event.target;
      
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

     

  };


  //  Save Data

  const handleSave = async() => {
    const isValid = await validateForm();
if (isValid) {
    const userList = JSON.parse(localStorage.getItem('signupData'));
    userList[index] = userData; // Update the specific user data
    localStorage.setItem('signupData', JSON.stringify(userList)); // Save updated data to localStorage
    navigate('/excellist'); // Navigate back to the list after saving
}
  };


  return (
    <>


      <div className="container mx-auto p-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-800 text-white text-center">
            <h1 className="text-2xl font-bold">Edit User Profile</h1>
          </div>
          <div className="p-6">
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700   mb-2"><span className='font-bold'>Name:</span></label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}



              <label className="block text-gray-700  mb-2"><span className='font-bold'>Email:</span></label>
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled
                className="w-full px-3 py-2 border rounded"
              />

              <label className="block text-gray-700   mb-2"><span className='font-bold'>Phone:</span></label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

              <label className="block text-gray-700   mb-2"><span className='font-bold'>Password:</span> </label>
              <input
                type="text"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSave}
              >                Save

                </button>

                </div>


          </div>
        </div>
      </div>


    </>

  )
}

export default Edit
