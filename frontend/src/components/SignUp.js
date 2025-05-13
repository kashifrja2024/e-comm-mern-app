// import React from "react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Form, Button } from "react-bootstrap";
// const SignUp = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("")
//     const Navigate = useNavigate()
//     const navigate = useNavigate()
//     useEffect(() => {
//         const auth = localStorage.getItem('user');
//         if (auth) {
//             navigate('/')
//         }
//     })
//     const collectData = async () => {

//         console.log(name, email, password);
//         let result = await fetch("http://localhost:5000/register", {
//             method: "post",
//             body: JSON.stringify({ name, email, password }),
//             headers: {
//                 'Content-Type': "application/json"
//             }
//         })
//         result = await result.json()
//         console.log("result", result);
//         localStorage.setItem("user", JSON.stringify(result));

//         // if (result) {
//         Navigate('/')
//         // }
//     }
//     return (
//         // <div className="register">
//         //     <input className="inputBox" type="text" value={name} placeholder="Enter name " onChange={(e) => { setName(e.target.value) }} />
//         //     <input className="inputBox" type="email" value={email} placeholder="Enter email " onChange={(e) => { setEmail(e.target.value) }} />
//         //     <input className="inputBox" type="password" value={password} placeholder="Enter Password " onChange={(e) => { setPassword(e.target.value) }} />
//         //     <button type="button" className="appbutton" onClick={collectData}>Sign Up</button>
//         // </div>


//         <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
//             <h3 className="mb-4">Sign Up</h3>
//             <Form>
//                 <Form.Group className="mb-3" controlId="formName">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                         type="email"
//                         placeholder="Enter email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-4" controlId="formPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </Form.Group>

//                 <Button
//                     variant="primary"
//                     type="button"
//                     onClick={collectData}
//                     style={{ backgroundColor: "#135874", borderColor: "#135874" }}
//                 >
//                     Sign Up
//                 </Button>
//             </Form>
//         </Container>
//     );

// }

// export default SignUp;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Form, Button } from "react-bootstrap";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })
    const fnameregex = /^[a-zA-Z][a-zA-Z ]*$/;
    const hasSpecialCharacter = /[!@#$%^&*;,<>'"|+]/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const validate = () => {
        const newErrors = {};

        // Name validation
        if (!name) {
            newErrors.name = "Name is required.";
        } else if (!fnameregex.test(name)) {
            newErrors.name = "Name should start with a letter and only contain letters and spaces.";
        } else if (hasSpecialCharacter.test(name)) {
            newErrors.name = "Name should not contain special characters.";
        }

        // Email validation
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email.";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Password must be at least 8 characters, include one uppercase letter and one special character.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const collectData = async () => {
        if (validate()) {
            console.log(name, email, password);
            let result = await fetch(`${baseUrl}/register`, {
                method: "post",
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': "application/json"
                }
            })
            result = await result.json()
            console.log("result", result);
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.auth));



            // if (result) {
            navigate('/')
            // }
        }
    }

    return (
        <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
            <h3 className="mb-4 text-color">Sign Up</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button
                    variant="primary"
                    type="button"
                    onClick={collectData}
                    style={{ backgroundColor: "#135874", borderColor: "#135874" }}
                >
                    Sign Up
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;
