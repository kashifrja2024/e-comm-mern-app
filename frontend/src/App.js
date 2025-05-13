// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />

            <Route path='/logout' element={<h1>Logout</h1>} />
            <Route path='/profile' element={<h1>Profile</h1>} />
            {/* <Route path ="/productList"  element={<ProductList/>} /> */}

            {/* <Route path='/SignUp' element={<h1>SignUp</h1>} /> */}

          </Route>
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
