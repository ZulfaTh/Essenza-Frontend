import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Services from './pages/Services'
import Staffs from './pages/Staffs'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';

import UserProfile from './pages/UserProfile';


import BookingForm from './pages/BookingForm';
import PaymentPage from './pages/PaymentPage';

import ConfirmPage from './pages/ConfirmPage';


import { ToastContainer } from 'react-toastify';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Appointment from './pages/Appointment';



function App() {
  

  return (
    <div>
    <Navbar/>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/contactus' element={<ContactUs/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/staffs' element={<Staffs/>}/>
       <Route path='/login' element={<Login/>}/>
     
       <Route path='/email-verify' element={<EmailVerify/>}/>
       <Route path='/reset-password' element={<ResetPassword/>}/>
        
       <Route path='/profile' element={<UserProfile/>}/>

       <Route path='/staff/:staffId' element={<Appointment/>}/>
      
       <Route path='/booking' element={<BookingForm/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
        <Route path='/confirm' element={<ConfirmPage/>}/>


          
            
    </Routes>
<Footer/>
    </div>
  )
}

export default App
