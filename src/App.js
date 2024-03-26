import { useState, useEffect, createContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import UserhomePage from './components/users/UserhomePage';
import UserProfile from './components/users/UserProfile';
import AdminLogin from './components/admin/AdminLogin';
import AdminRegister from './components/admin/AdminRegister';
import AdminHomePage from './components/admin/AdminHomePage';
import AdminProfile from './components/admin/AdminProfile';
import AdminProducts from './components/admin/AdminProducts';
import AdminAddProducts from './components/admin/AdminAddProducts';
import AdminCategories from './components/admin/AdminCategories';
import UserProductDetails from './components/users/UserProductDetails';
import UserCartPage from './components/users/UserCartPage';
import UserAddress from './components/users/UserAddress';
import UserAddressView from './components/users/UserAddressView';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import UserPlaceOrder from './components/users/UserPlaceOrder';
import Success from './components/users/Success';
import Failure from './components/users/Failure';
import UserTransactions from './components/users/UserTransactions';
import AdminTransactions from './components/admin/AdminTransactions';
import AdminEditTransactions from './components/admin/AdminEditTransactions';
import UserRatings from './components/users/UserRatings';
import UserOrderInfo from './components/users/UserOrderInfo';

export const store = createContext()

function App() {

  const [token, setToken] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem("users")
    if (data) {
      const parseData = JSON.parse(data)
      setToken(parseData.token)
    }
  }, [])

  return (
    <>
      <store.Provider value={[token, setToken]}>

        <Routes>

          <Route path='*' element={<NotFound />} />

          <Route path='/' element={<Home />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contactus' element={<ContactUs />} />

          {/* User Routes */}
          
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/userhomepage' element={<UserhomePage />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/useraddress' element={<UserAddress />} />
          <Route path='/userproductdetails/:id' element={<UserProductDetails />} />
          <Route path='/usercart' element={<UserCartPage />} />
          <Route path='/useraddressview' element={<UserAddressView />} />
          <Route path='/placeorder' element={<UserPlaceOrder />} />
          <Route path='/success' element={<Success />} />
          <Route path='/failure' element={<Failure />} />
          <Route path='/userorders' element={<UserTransactions />} />
          <Route path='/orderinfo/:id' element={<UserOrderInfo />} />
          <Route path='/userrating/:id' element={<UserRatings />} />

          { /* Admin Routes */}

          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/adminregister' element={<AdminRegister />} />
          <Route path='/adminhomepage' element={<AdminHomePage />} />
          <Route path='/adminprofile' element={<AdminProfile />} />
          <Route path='/admincategories' element={<AdminCategories />} />
          <Route path='/adminproducts' element={<AdminProducts />} />
          <Route path='/adminaddproducts' element={<AdminAddProducts />} />
          <Route path='/admintrans' element={<AdminTransactions />} />
          <Route path='/adminedittrans/:id' element={<AdminEditTransactions />} />

        </Routes>

      </store.Provider>
    </>
  );
}

export default App;
