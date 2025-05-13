import React, { useState } from "react";
import { Form, Button, Container } from 'react-bootstrap';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

    const addHandler = async () => {
        console.log(name, price, category, company);
        if (!name || !price || !category || !company) {
            setError(true)
            return true;
        }
        const userId = JSON.parse(localStorage.getItem('user')).id;

        let result = await fetch(`${baseUrl}/add-product`, {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });
        result = await result.json();
        console.log(result);
        setName("")
        setPrice("")
        setCompany("")
        setCategory("")
    }
    // return (
    //     <div className="register" >
    //         <h1>Add Product</h1>
    //         <input type="text" placeholder="Enter Name" value={name} onChange={(e) => { setName(e.target.value) }} className="inputBox" />
    //         {error && !name && <span className="invailid-input">Enter vailid name</span>}
    //         <input type="text" placeholder="Enter price" value={price} onChange={(e) => { setPrice(e.target.value) }} className="inputBox" />
    //         <input type="text" placeholder="Enter categaory" value={category} onChange={(e) => { setCategory(e.target.value) }} className="inputBox" />
    //         <input type="text" placeholder="Enter company" value={company} onChange={(e) => { setCompany(e.target.value) }} className="inputBox" />
    //         <button className="appbutton" onClick={addHandler}>Add product</button>
    //     </div>
    // )

    return (
        <Container className="mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4 " style={{ color: '#135874' }}>Add Product</h2>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" style={{ backgroundColor: "#135874" }}
                    onClick={async () => {
                        const success = await addHandler(); // if this is async and returns true/false

                        // if (success) {
                        MySwal.fire({
                            title: 'Success!',
                            text: 'Item added successfully.',
                            icon: 'success',
                            confirmButtonColor: '#135874',
                            confirmButtonText: 'OK'
                        });
                        // }
                    }}
                >
                    Add Product
                </Button>
            </Form>
        </Container>
    );
}
export default AddProduct;