
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const ProductList = () => {
    const [products, setProducts] = useState([]);
    console.log("products", products);

    const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

    useEffect(() => {
        getProduct();
    }, []);

    // const getProduct = async () => {
    //     let result = await fetch("http://localhost:5000/product");
    //     result = await result.json();
    //     console.log("result", result);

    //     setProducts(result);
    // }

    const getProduct = async () => {
        try {
            const response = await fetch(`${baseUrl}/product`
                // ,
                // {
                //     headers: {
                //         authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                //     }
                //
                //  }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const result = await response.json();
            console.log("Fetched products:", result);
            setProducts(result);
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    // const deleteProduct = async (itemId) => {
    //     console.log(itemId);

    //     let result = await fetch(`http://localhost:5000/product/${itemId}`, {
    //         method: "Delete"
    //     })
    //     result = await result.json();
    //     // if (result) {
    //     // alert("record is deleted");
    //     // call the get functio updated list

    //     await getProduct();

    //     // }

    // }

    const deleteProduct = async (itemId) => {
        try {
            console.log("Deleting item:", itemId);

            const response = await fetch(`${baseUrl}/product/${itemId}`, {
                method: "DELETE",

                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }

            });

            if (!response.ok) {
                console.error("Delete failed");
                return;
            }

            const result = await response.json();
            console.log("Delete response:", result);

            await getProduct();
        } catch (err) {
            console.error("deleteProduct error:", err);
        }
    };

    const searchHandle = async (event) => {
        console.log(event.target.value);
        let key = event.target.value;
        if (key) {


            let result = await fetch(`${baseUrl}/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            result = await result.json();

            if (result) {
                setProducts(result)
            }
        } else {
            getProduct()
        }


    }

    // return (
    //     <div className="product-list">
    //         <h3>Product list</h3>
    //         <input type="text" placeholder="search product" className="search-product-box" onChange={searchHandle} />
    //         <ul>
    //             <li>Sl No</li>
    //             <li>Name</li>
    //             <li>Price</li>
    //             <li>Category</li>
    //             {/* delete functionalty */}
    //             <li>Operation</li>
    //         </ul>
    //         {
    //             products.length > 0 ? products.map((item, index) => (
    //                 <ul key={index}>
    //                     <li>{index + 1}</li>
    //                     <li>{item.name}</li>
    //                     <li>{item.price}</li>
    //                     <li>{item.category}</li>
    //                     <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
    //                         <Link to={`/update/${item._id}`} >Update</Link>
    //                     </li>
    //                 </ul>
    //             ))
    //                 :
    //                 <h1>No result Found</h1>
    //         }
    //     </div>



    // );

    return (

        <>
            <h3 className="product-list">Product list</h3>
            <input type="text" placeholder="search product" className="search-product-box" onChange={searchHandle} />

            <Table striped bordered hover variant="dark" className="text-custom-blue text-center" id="table" >
                <thead>
                    <tr>
                        <th>Sl No. </th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Operation</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 ? products.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>
                                    {/* <Button variant="outline-danger" onClick={() => deleteProduct(item._id)}>Delete</Button> */}
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => {
                                            MySwal.fire({
                                                title: 'Are you sure?',
                                                text: 'You won’t be able to revert this!',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#d33',
                                                cancelButtonColor: '#3085d6',
                                                confirmButtonText: 'Yes, delete it!'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    deleteProduct(item._id);
                                                    Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
                                                }
                                            });
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    <Button variant="outline-info" id="upd-btn"><Link id="upd_link" to={`/update/${item._id}`} >Update</Link></Button>
                                </td>
                            </tr>
                        ))
                            :

                            <tr>
                                <td colSpan="5" className="text-center">
                                    <h4>No result Found</h4>
                                </td>
                            </tr>
                    }


                </tbody>
            </Table>
        </>
    );
}




export default ProductList;

