import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const {Component} = props ;
    const navigate = useNavigate();

    useEffect(() => {
        const login = localStorage.getItem('login');
         

    
            
            if (!login) {
              
                navigate('/login');
            }
            else {
             
                navigate('/excellist')
            }
      
    }, [navigate]);
    
  return (
    <div>
      <Component/>
    </div>
  )
}

export default Protected
