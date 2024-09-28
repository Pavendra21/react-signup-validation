import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const List = ({setLogedIn}) => {
    const navigate = useNavigate();

    const { index } = useParams();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const localData = localStorage.getItem('signupData');
        if (localData) {
            const parsedData = JSON.parse(localData);
            setUsers(parsedData[index]);
        } else {
            console.error('No data found in local storage');
        }
    }, [index]);

 

    const handleDelete = (email) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
if (confirmDelete){
    // setLogedIn(false)
    const localData = JSON.parse(localStorage.getItem('signupData'));
    const filteredUsers = localData.filter(user => user.email !== email); // Filter out the user to be deleted
    localStorage.setItem('signupData', JSON.stringify(filteredUsers));
    setUsers(filteredUsers);
    navigate('/excellist')
    
}
    };

    // edit function 

    const edit =() => {

      return  navigate(`/user/${index}`);

    }

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">User</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Below is the User Data .
                        </p>
                    </div>
                    <div className="flex flex-wrap -m-2">
                        
                            <div className="p-2 lg:w-1/3 md:w-1/2 w-full"  >
                                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                    <img
                                        alt="team"
                                        className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                        src="https://dummyimage.com/80x80"
                                    />
                                    <div className="flex-grow">
                                        <h2 className="text-gray-900 title-font font-medium">Name: {users.name}</h2>
                                        <p className="text-gray-900"><b>Email:</b> {users.email}</p>
                                        <p className="text-gray-900"><b>Phone Number:</b> {users.phone}</p>
                                        <p className="text-gray-900"><b>Password:</b> {users.password}</p>
                                        <button
                                            className="inline-flex text-white bg-red-500 mt-4 border-0 px-2 focus:outline-none hover:bg-red-600 rounded text-lg"
                                            onClick={() => handleDelete(users.email)}
                                        >
                                            Delete
                                        </button>
                                        <button onClick={edit}
                                            className="inline-flex text-white bg-blue-500 mt-4 border-0 px-2 mx-2 focus:outline-none hover:bg-blue-600 rounded text-lg"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </section>
        </>
    );
};

export default List;
