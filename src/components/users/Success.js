import React, { useState, useEffect } from 'react'
import UserNavbar from '../../screens/UserNavbar'
import { useNavigate } from 'react-router-dom'

function Success() {

    const [count, setCount] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount - 1);
        }, 1000);
        count === 0 && navigate("/userhomepage");
        return () => clearInterval(interval);
    }, [count, navigate]);

    return (
        <>
            <UserNavbar />
            <div className='success-container'>
                <div className='container'>
                    <span class="material-symbols-outlined icon">
                        done
                    </span>
                    <h3>Order Placed Successfully</h3>
                    <h6>Your Order is Being Processed shortly...</h6>
                    <p>Redirect to Order Page in {count} seconds....</p>
                </div>
            </div>
        </>
    )
}

export default Success