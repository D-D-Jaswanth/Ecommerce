import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../screens/UserNavbar';

function Failure() {

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
            <div className='failure-container'>
                <div className='container'>
                    <span class="material-symbols-outlined icon">
                        close
                    </span>
                    <h3>Order Placed Failed</h3>
                    <p>Redirect to Order Page in {count} seconds.....</p>
                </div>
            </div>
        </>
    )
}

export default Failure