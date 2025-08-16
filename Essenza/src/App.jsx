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

import AdminDashboard from './pages/AdminDashboard';
import BookingForm from './pages/BookingForm';
import PaymentPage from './pages/PaymentPage';
import ServiceMgt from './pages/ServiceMgt';
import StaffsMgt from './pages/StaffMgt';
import ConfirmPage from './pages/ConfirmPage';
import UserMgt from './pages/UserMgt';
import StaffAvailability from './pages/StaffAvailabilty';
import { ToastContainer } from 'react-toastify';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';



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
       <Route path='/admin' element={<AdminDashboard/>}/>
       <Route path='/booking' element={<BookingForm/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
        <Route path='/confirm' element={<ConfirmPage/>}/>


          <Route path='/servicesmgt' element={<ServiceMgt/>}/>
           <Route path='/staffsmgt' element={<StaffsMgt/>}/>
            <Route path='/usermgt' element={<UserMgt/>}/>
             <Route path='/staff_avilablity' element={<StaffAvailability/>}/>
    </Routes>
<Footer/>
    </div>
  )
}

export default App
