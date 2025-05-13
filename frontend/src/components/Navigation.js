// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// const Nav = () => {
//     const auth = localStorage.getItem("user");
//     const navigate = useNavigate()
//     const logout = () => {
//         localStorage.clear();
//         navigate("/signUp")
//     }
//     return (
//         // <div>
//         //     {auth ?
//         //         <ul className="nav-ul">
//         //             <li><Link to="/" >Products</Link></li>
//         //             <li><Link to="/add" >Add Products</Link></li>
//         //             <li><Link to="/update/:id" >Update Products</Link></li>
//         //             <li><Link to="/profile" >Profile</Link></li>
//         //             <li> <Link to="/signUp" onClick={logout}>logout ({JSON.parse(auth).name})</Link> </li>
//         //         </ul> :
//         //         <ul className="nav-ul nav-login">
//         //             <li>
//         //                 <Link to="/signUp" >SignUp</Link></li>
//         //             <li><Link to="/login" >Login</Link></li>

//         //         </ul>
//         //     }
//         // </div>




//     )
// }


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/signUp");
    };

    return (
        <>
            <Navbar style={{ backgroundColor: "#135874" }} data-bs-theme="dark">
                <Container>
                    {auth ? (
                        // <>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Products</Nav.Link>
                            <Nav.Link as={Link} to="/add">Add Products</Nav.Link>
                            {/* <Nav.Link as={Link} to="/update/:id">Update Products</Nav.Link> */}
                            <Nav.Link as={Link} to="/signUp" onClick={logout}>Logout ({JSON.parse(auth).name})</Nav.Link>

                            {/* <Link to="/">Products</Link>
                            <Link to="/add">Add Products</Link>
                            <Link to="/update/:id">Update Products</Link>
                            <Link to="/signUp" onClick={logout}>Logout ({JSON.parse(auth).name})</Link> */}
                        </Nav>
                        // </>
                    ) : (
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/signUp">SignUp</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>


                        </Nav>
                    )}
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;

