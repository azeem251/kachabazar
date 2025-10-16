import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    CircularProgress,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import KachaBazar from '../../components/kachaBazar/KachaBazar';
import { BACKEND_URL } from '../../utils/api';

export default function ForgetPassword() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // for timer (in seconds)

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // 🔁 Countdown Timer Effect
    useEffect(() => {
        let timer;
        if (step === 2 && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [step, timeLeft]);

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),

        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);   
                localStorage.setItem('recoveryEmail', values.email);
                await axios.post(`${BACKEND_URL}/api/auth/forgot-password`, values, { headers });
                Swal.fire('OTP Sent', 'Check your email for the OTP', 'success');
                setStep(2);
                setTimeLeft(60); // start countdown
            } catch (err) {
                Swal.fire('Error', err.response?.data?.message || 'Failed to send OTP', 'error');
            } finally {
                setLoading(false);
            }
        },
    });

    const handleVerifyOtp = async () => {
        if (!otp) {
            return Swal.fire('Required', 'Please enter the OTP', 'warning');
        }

        if (!/^\d{6}$/.test(otp)) {
            return Swal.fire('Invalid', 'OTP must be a 6-digit number', 'error');
        }
        
        try {
            setLoading(true);   
            const email = localStorage.getItem('recoveryEmail');
            await axios.post(`${BACKEND_URL}/api/auth/verify-otp`, { email, otp }, { headers });
             setTimeout(() => {
            Swal.fire('Success', 'OTP verified!', 'success');
            setStep(3);
            setLoading(false); // ✅ stop spinner here
        }, 0);
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Invalid OTP', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!password || password.length < 6) {
            return Swal.fire('Invalid Password', 'Password must be at least 6 characters', 'warning');
        }

        try {
            setLoading(true);  
            const email = localStorage.getItem('recoveryEmail');
            await axios.post(`${BACKEND_URL}/api/auth/reset-password`, { email, password }, { headers });
            Swal.fire('Success', 'Password reset successful!', 'success');
            localStorage.removeItem('token');
            localStorage.removeItem('recoveryEmail');
            // Delay redirect to login
            setTimeout(() => {
                window.location.href = '/auth/login';
            }, 1000); // 1 second delay
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Failed to reset password', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            setLoading(true); 
            const email = localStorage.getItem('recoveryEmail');
            await axios.post(`${BACKEND_URL}/api/auth/resend-otp`, { email }, { headers });
            Swal.fire('Sent', 'OTP resent to your email', 'success');
            setTimeLeft(60); // restart timer
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Failed to resend OTP', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container className='my-4' style={{ maxWidth: '580px' }}>
                <Box
                    sx={{
                        backgroundColor: '#fff',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        marginTop: 2,
                    }}
                >
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Forgot Password
                    </Typography>

                    {step === 1 && (
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Registered Email"
                                variant="outlined"
                                margin="normal"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused': {
                                        '& fieldset': {
                                            borderColor: '#10b981',
                                        },
                                    },
                                    '& label.Mui-focused': {
                                        color: '#10b981',
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#10b981',
                                    '&:hover': { backgroundColor: '#0f766e' },
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Send OTP'}
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <>
                            <TextField
                                fullWidth
                                label="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                variant="outlined"
                                disabled={loading}
                                margin="normal"
                                onPaste={(e) => {
                                    e.preventDefault();
                                    alert('⚠️ Please type the OTP manually. Pasting is not allowed.');
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused': {
                                        '& fieldset': {
                                            borderColor: '#10b981',
                                        },
                                    },
                                    '& label.Mui-focused': {
                                        color: '#10b981',
                                    },
                                }}
                            />
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Button
                                    onClick={handleVerifyOtp}
                                    variant="contained"
                                    disabled={loading}
                                    sx={{
                                        flex: 1, // ✅ fixes width
                                        backgroundColor: '#10b981',
                                        '&:hover': { backgroundColor: '#0f766e' },
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
                                </Button>

                                {timeLeft > 0 ? (
                                    <Typography variant="body2" sx={{ flex: 1, textAlign: 'center' }}>
                                        Reset OTP in: {timeLeft}s
                                    </Typography>
                                ) : (
                                    <Button
                                        onClick={handleResend}
                                        variant="outlined"
                                        disabled={loading}
                                        sx={{ flex: 1 }} // ✅ fixes width
                                    >
                                        Resend OTP
                                    </Button>
                                )}
                            </Box>

                        </>
                    )}

                    {step === 3 && (
                        <>
                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                label="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused': {
                                        '& fieldset': {
                                            borderColor: '#10b981',
                                        },
                                    },
                                    '& label.Mui-focused': {
                                        color: '#10b981',
                                    },
                                }}
                            />
                            <Button
                                onClick={handleResetPassword}
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#10b981',
                                    '&:hover': { backgroundColor: '#0f766e' },
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                            </Button>
                        </>
                    )}
                </Box>
            </Container>
            <KachaBazar />
        </>
    );
}
