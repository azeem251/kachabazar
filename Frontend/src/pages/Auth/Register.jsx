import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link, useNavigate } from "react-router-dom"; // useNavigate import karo
import Swal from "sweetalert2"; // sweetalert2 import karo
import KachaBazar from "../../components/kachaBazar/KachaBazar";
import ShoopingTimer from "../../components/ShoopingTimer/ShoopingTimer";
import axios from "axios";
import { BACKEND_URL } from "../../utils/api";
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed")
    .required("Name is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // navigate hook

  const handleRegister = async (values, resetForm) => {
    try {
      const res = await axios.post(
   
        `${BACKEND_URL}/api/auth/register`,
        values,
        { withCredentials: true }
      );
      // Registration successful sweet alert
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message || "Registered successfully",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      resetForm(); // form fields clear karo
      navigate("/auth/login"); // login page par redirect karo
    } catch (error) {
      // Agar email already exist ka error aaye to show karo
      const errorMessage = error.response?.data?.message || "Registration failed";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    //   console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleRegister(values, resetForm);
    },
  });
 const handleGoogleLogin = () => {
       
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
            bgcolor: "#fff",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            mb={3}
            color="#10b981"
          >
            Register
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" mb={3}>
            Create an account by sign up with provider or email, password
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              margin="normal"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{
                "& label.Mui-focused": { color: "#10b981" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#10b981" },
                },
              }}
            />

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
                "& label.Mui-focused": { color: "#10b981" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#10b981" },
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
                "& label.Mui-focused": { color: "#10b981" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#10b981" },
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
            <Box display="flex" justifyContent="flex-end">
              <Link
                to="/auth/login"
                style={{ color: "#10b981", fontSize: "14px", textDecoration: "underline" }}
              >
                Already have account ?
              </Link>
            </Box>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
                bgcolor: "#10b981",
                "&:hover": { bgcolor: "#0e9e6e" },
                fontWeight: "bold",
              }}
              className="h-[40px]"
            >
              Register
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
                "&:hover": { backgroundColor: "#9a0505" },
                height: "44px",
              }}
            >
              Register with Google
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<FacebookIcon />}
              sx={{
                backgroundColor: "#1174cb",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#025196" },
                height: "44px",
              }}
            >
              Register with Facebook
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GitHubIcon />}
              sx={{
                backgroundColor: "#454749",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#2e3031" },
                height: "44px",
              }}
            >
              Register with GitHub
            </Button>
          </Box>
          <p className="text-center pt-3 text-sm text-slate-400">
            Already have an account?{" "}
            <Link to={"/auth/login"} className="hover:text-green-500 text-slate-700">
              {" "}
              Sign In
            </Link>
          </p>
        </Box>
      </div>
      <KachaBazar />
      <ShoopingTimer />
    </>
  );
};

export default Register;
