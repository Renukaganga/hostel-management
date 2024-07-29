'use client'
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleSendOtp = async () => {
        const res = await fetch('/api/otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, action: 'send' })
        });

        if (res.ok) {
            setOtpSent(true);
        } else {
            console.error('Failed to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        const res = await fetch('/api/otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, action: 'verify' })
        });

        if (res.ok) {
            setOtpVerified(true);
        } else {
            console.error('Invalid OTP');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-semibold mb-4">Student Login</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                {!otpSent ? (
                    <button
                        onClick={handleSendOtp}
                        className="w-full p-2 bg-blue-500 text-white rounded"
                    >
                        Send OTP
                    </button>
                ) : (
                    <div>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleVerifyOtp}
                            className="w-full p-2 bg-green-500 text-white rounded"
                        >
                            Verify OTP
                        </button>
                    </div>
                )}
                {otpVerified && <p className="text-green-500 mt-4">OTP Verified Successfully!</p>}
            </div>
        </div>
    );
};

export default Login;
