import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [login, setlogin] = useState(false)

    useEffect(() => {

        const userLogin = localStorage.getItem('login');
        const loginUser = JSON.parse(userLogin)
        setlogin(loginUser)


    }, [])

    // Handle delete
    

   const  handleProfile = () => {

    localStorage.setItem("login", false);

    
   }

    return (
        <>

            <header className="text-white bg-black body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link to="/home" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">

                        <span className="ml-3 text-xl">IMPETROSYS</span>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center space-x-">

                        {login ? (
                            <>
                            <Link to="/excellist" className="mr-5">List</Link>
                            <Link to="/" onClick={handleProfile} className="mr-5">Log Out</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="mr-5">Login</Link>
                                <Link to="/" className="mr-5">Signup</Link>
                            </>
                        )}

                    </nav>


                </div>
            </header>


        </>
    )
}

export default Navbar
