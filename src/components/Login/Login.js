import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
    useAuthState,
    useSendPasswordResetEmail,
    useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Loading/Loading";
import './Login.css'

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const emailRef = useRef("");
    const [signInWithEmailAndPassword, regUser, regLoading, error] =
        useSignInWithEmailAndPassword(auth);
    const [user, loading] = useAuthState(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const navigate = useNavigate();

    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (loading || sending) {
        return <Loading></Loading>;
    }
    if (user) {
        navigate(from, { replace: true });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        await signInWithEmailAndPassword(email, password);

    };

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast("Email Sent. Please check!");
        } else {
            toast("Please input your email");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center height-control">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div>
                            <h2 className="text-center">Login</h2>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        ref={emailRef}
                                        placeholder="Enter email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        name="password"
                                        type={!showPass ? "password" : "text"}
                                        placeholder="Password"
                                        required
                                    />
                                </Form.Group>
                                <p className="text-danger fw-bold">
                                    {error ? error.message : ""}
                                </p>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check
                                        type="checkbox"
                                        label="Show Password"
                                        onClick={() => setShowPass(!showPass)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="px-5">
                                    Login
                                </Button>
                            </Form>
                            <div className="mt-4">
                                <p>New to Todock? <Link className="form_link" to="/register">Create a new account</Link></p>
                                <p>Forget Password? <button className='btn-link btn pe-auto' onClick={resetPassword}>Reset Password</button> </p>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
