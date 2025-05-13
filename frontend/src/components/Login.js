// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate()
//     useEffect(() => {
//         const auth = localStorage.getItem('user');
//         if (auth) {
//             navigate('/')
//         }
//     })
//     const handleLogin = async () => {
//         console.log(email, password);
//         let result = await fetch("http://localhost:5000/login", {
//             method: "post",
//             body: JSON.stringify({ email, password }),
//             headers: {
//                 'Content-Type': "application/json"
//             }
//         });
//         result = await result.json();
//         console.log(result);

//         if (result.name) {
//             localStorage.setItem("user", JSON.stringify(result));
//             navigate('/')

//         } else {
//             alert("plz enter correct details")
//         }

//     }
//     return (
//         <div className="login">
//             <input className="inputBox" type="email" placeholder="Enter email " onChange={(e) => { setEmail(e.target.value) }} />
//             <input className="inputBox" type="password" placeholder="Enter Password " onChange={(e) => { setPassword(e.target.value) }} />
//             <button type="button" className="appbutton" onClick={handleLogin}>Login</button>
//         </div>


//     )
// }

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();
            console.log(result);

            if (result.auth) {
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", JSON.stringify(result.auth));
                navigate("/");
            } else {
                setError("Please enter correct email or password.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
        }

        setValidated(true);
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <h3 className="text-color">Login</h3>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                    />
                    <Form.Control.Feedback type="invalid">
                        Password must be at least 6 characters.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button style={{ backgroundColor: "#135874" }} type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Login;

