import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Services from './pages/Services'
import Staffs from './pages/Staffs'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import AccountCreated from './pages/AccountCreated';
import AdminDashboard from './pages/AdminDashboard';
import BookingForm from './pages/BookingForm';
import PaymentPage from './pages/PaymentPage';


function App() {
  

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/contactus' element={<ContactUs/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/staffs' element={<Staffs/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
        <Route path='/account-created' element={<AccountCreated/>}/>
       <Route path='/profile' element={<UserProfile/>}/>
       <Route path='/admin' element={<AdminDashboard/>}/>
       <Route path='/booking' element={<BookingForm/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
    </Routes>
<Footer/>
    </BrowserRouter>
  )
}

export default App
