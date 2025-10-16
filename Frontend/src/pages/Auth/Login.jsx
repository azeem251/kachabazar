import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Divider,
    CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link, useNavigate } from "react-router-dom";
import KachaBazar from "../../components/kachaBazar/KachaBazar";
import ShoopingTimer from "../../components/ShoopingTimer/ShoopingTimer";
import axios from "axios"
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../../ReduxSlices/authSlice";

import { BACKEND_URL } from "../../utils/api";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    axios.defaults.withCredentials = true;
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    useEffect(() => {
        console.log("Auth State Changed →", isAuthenticated, user);
    }, [isAuthenticated, user]);



   
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                // 1. Login Request
                console.log(BACKEND_URL)
                await axios.post(`${BACKEND_URL}/api/auth/login`, values, {
                    withCredentials: true,
                });

                // 2. Add an intentional delay to show spinner
                await new Promise((resolve) => setTimeout(resolve, 2000)); // 1 second delay

                // 3. Get User Info
                const res = await axios.get(`${BACKEND_URL}/api/auth/me`, {
                    withCredentials: true,
                });
                
                // 4. Update Redux & LocalStorage
                dispatch(setUser(res.data));
                localStorage.setItem("user", JSON.stringify(res.data));

                // 5. Success Alert
                Swal.fire({
                    icon: "success",
                    title: "Login successful",
                    text: "Welcome!",
                });

                resetForm();
                navigate("/");

            } catch (err) {
                const errorMessage = err.response?.data?.message || "Login failed";
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: errorMessage,
                });
            } finally {
                setLoading(false);
            }
        },
    });

    const handleGoogleLogin = () => {
        // window.open("http://localhost:4747/api/auth/google", "_self");
        window.open(`${BACKEND_URL}/api/auth/google`, "_self");


    };
    return (
        <>
            <div className="mx-4">
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 600,
                        mx: "auto",
                        mt: 8,
                        px: 3,
                        py: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        bgcolor: "#fff", // light background

                    }}
                >
                    <Typography variant="h5" align="center" fontWeight="bold" mb={3} color="#10b981">
                        Login
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" mb={3}>
                        Login with your email and password
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{
                                "& label.Mui-focused": {
                                    color: "#10b981", // Label color on focus
                                },
                                "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#10b981", // Border color on focus
                                    },
                                },
                            }}
                        />

                        <TextField
                            label="Password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{
                                "& label.Mui-focused": {
                                    color: "#10b981", // Label color on focus
                                },
                                "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#10b981", // Border color on focus
                                    },
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {/* 🔗 Forgot Password Link */}
                        <Box display="flex" justifyContent="flex-end">
                            <Link
                                to="/auth/forgot-password"
                                style={{
                                    color: "#10b981",
                                    fontSize: "14px",
                                    textDecoration: "underline",
                                }}
                            >
                                Forgot Password?
                            </Link>

                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={loading}
                            sx={{
                                mt: 2,
                                bgcolor: "#10b981",
                                "&:hover": { bgcolor: "#0e9e6e" },
                                fontWeight: "bold",
                            }}
                            className="h-[40px]"
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: "#fff" }} />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>

                    <Divider sx={{ my: 3 }}>OR</Divider>

                    <Box display="flex" flexDirection="column" gap={1}>
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                            sx={{
                                backgroundColor: "#bb0707",
                                color: "#ffffff",
                                "&:hover": {
                                    backgroundColor: "#9a0505",
                                },
                                height: "44px"
                            }}
                        >
                            Login with Google
                        </Button>

                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<FacebookIcon />}
                            sx={{
                                backgroundColor: "#1174cb",
                                color: "#ffffff",
                                "&:hover": {
                                    backgroundColor: "#025196",
                                },
                                height: "44px"
                            }}
                        >
                            Login with Facebook
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<GitHubIcon />}
                            sx={{
                                backgroundColor: "#454749",
                                color: "#ffffff",
                                "&:hover": {
                                    backgroundColor: "#2e3031",
                                },
                                height: "44px"
                            }}
                        >
                            Login with GitHub
                        </Button>
                    </Box>
                    <p className="text-center pt-3 text-sm text-slate-400">Don't have an account? <Link to={'/auth/register'} className="hover:text-green-500 text-slate-700"> Sign Up</Link></p>
                </Box>
            </div>
            <KachaBazar />
            <ShoopingTimer />
        </>
    );
};

export default Login;
