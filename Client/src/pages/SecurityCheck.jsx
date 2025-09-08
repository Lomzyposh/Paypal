import React, { useContext } from 'react'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { LoaderContext } from '../contexts/LoaderContext';

const SecurityCheck = () => {
    const navigate = useNavigate();
    const { showLoader, setShowLoader } = useContext(LoaderContext);

    const useLoader = async (mil) => {
        setShowLoader(true);

        await new Promise((resolve) => setTimeout(resolve, mil));

        setShowLoader(false);
    };

    const goToCode = async () => {
        await useLoader(1500);
        navigate('/InputCode');
    }

    return (
        <div className="w-100 min-h-screen flex flex-col gap-2 items-center justify-center">

            <img src='/images/payLogo.png' className='w-32 object-cover' />
            <h2 className='font-extrabold text-2xl font-[Inter]'>Quick Security Check</h2>
            <p className='text-sm'>This helps us protect ur account</p>
            <div className="space-y-7">
                <label className="p-3 flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="tier" defaultChecked className="peer sr-only" />
                    <span
                        className="
            relative inline-flex h-5 w-5 rounded-full border border-gray-400
            peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2
            peer-checked:border-blue-600
            after:content-[''] after:absolute after:inset-1 after:rounded-full after:bg-blue-600 after:scale-0
            peer-checked:after:scale-100 after:transition-transform
          "
                        aria-hidden="true"
                    />
                    <span className="font-bold text-blue-600">Receive a security code via email or text</span>
                </label>

                <p className='text-sm text-gray-600 font-[roboto]'>By continuing, you confirm that you are authorized to use the email and phone number and agree to receive text messages to confirm your identity in this session. Carrier fees may apply.</p>
                <button onClick={goToCode} className="w-full bg-blue-700 text-white py-3 rounded-3xl font-medium hover:bg-blue-600 transition cursor-pointer">
                    Next
                </button>
            </div>

        </div>
    )
}

export default SecurityCheck