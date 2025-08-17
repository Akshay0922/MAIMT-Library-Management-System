import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


// REUSABLE COMPONENTS

import { Header } from './components/header/Header.jsx';
import { Footer } from './components/footer/Footer.jsx';
import { ScrollToTop } from './components/scrollToTop/ScrollToTop.jsx';


// OPAC- Online Public Access Catalog

import { Home } from './pages/home/Home.jsx';

import { Mca } from "./pages/home/departments/Mca";
import { Mba } from "./pages/home/departments/Mba";
import { Bba } from "./pages/home/departments/Bba";
import { Bca } from "./pages/home/departments/Bca";

import { About } from './pages/about/About.jsx';
import { Rules } from './pages/rules/Rules.jsx';
import { Books } from './pages/books/Books.jsx';


// ACCOUNTS

import { StudentSignUp } from './pages/studentDashboard/studentSignup/StudentSignup.jsx';
import { StudentLogin } from './pages/studentDashboard/studentLogin/StudentLogin.jsx';
import { AdminLogin } from './pages/adminDashboard/adminLogin/AdminLogin.jsx';

import { ForgotPassword } from './pages/forgotPassword/ForgotPassword.jsx';
import { OtpVerify } from './pages/otpVerify/OtpVerify.jsx';
import { ResetPassword } from './pages/resetPassword/ResetPassword.jsx';
import { ChangePassword } from './pages/changePassword/ChangePassword.jsx';
import { EditProfile } from './pages/adminDashboard/adminSidebarRoutes/adminProfile/editProfile/EditProfile.jsx';


// ADMIN

import { AdminDashboard } from './pages/adminDashboard/adminDashboard.jsx';
import { AdminProfile } from './pages/adminDashboard/adminSidebarRoutes/adminProfile/AdminProfile.jsx';
import { NewAdmin } from './pages/adminDashboard/adminSidebarRoutes/newAdmin/NewAdmin.jsx';
import { NewAdminLogin } from './pages/adminDashboard/adminSidebarRoutes/newAdmin/newAdminLogin/NewAdminLogin.jsx';
import { ManageUsers } from './pages/adminDashboard/adminSidebarRoutes/manageUsers/ManageUsers.jsx';
import { ManageBooks } from './pages/adminDashboard/adminSidebarRoutes/manageBooks/ManageBooks.jsx';
import { AddNewBook } from './pages/adminDashboard/adminSidebarRoutes/manageBooks/addNewBook/AddNewBook.jsx';
import { IssueBook } from './pages/adminDashboard/adminSidebarRoutes/manageBooks/issueBook/IssueBook.jsx';
import { ReturnBook } from './pages/adminDashboard/adminSidebarRoutes/manageBooks/returnBook/ReturnBook.jsx';
import { Reports } from './pages/adminDashboard/adminSidebarRoutes/reports/Reports.jsx';
import { AdminLogout } from './pages/adminDashboard/adminSidebarRoutes/adminLogout/AdminLogout.jsx';

import { VendorPage } from './pages/adminDashboard/adminSidebarRoutes/manageBooks/vendorForm/VendorPage.jsx';






// USER

import { StudentDashboard } from './pages/studentDashboard/StudentDashboard.jsx';
import { StudentProfile } from './pages/studentDashboard/studentSidebarRoutes/studentProfile/StudentProfile.jsx';
import { StudentMyBooks } from './pages/studentDashboard/studentSidebarRoutes/studentMyBooks/StudentMyBooks.jsx';
import { StudentNotices } from './pages/studentDashboard/studentSidebarRoutes/studentNotices/StudentNotices.jsx';
import { StudentLogout } from './pages/studentDashboard/studentSidebarRoutes/studentLogout/StudentLogout.jsx';







// WRONG ROUTE

import { NotFound } from './pages/notFound/NotFound.jsx';



import './App.css';
import { BookReviewPage } from './pages/adminDashboard/adminSidebarRoutes/manageBooks/reviewBook/BookReview.jsx';

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Router>
        <Header />
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/home" element={<Home />} />

          <Route path="/departments/mca" element={<Mca />} />
          <Route path="/departments/mba" element={<Mba />} />
          <Route path="/departments/bba" element={<Bba />} />
          <Route path="/departments/bca" element={<Bca />} />

          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/books" element={<Books />} />



          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-signup" element={<StudentSignUp />} />
          <Route path='/admin-login' element={<AdminLogin />} />



          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/edit-profile" element={<EditProfile />} />




          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/new-admin" element={<NewAdmin />} />
          <Route path="/new-admin-login" element={<NewAdminLogin />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-books" element={<ManageBooks />} />
          <Route path="/add-new-book" element={<AddNewBook />} />
          <Route path="/issue-book" element={<IssueBook />} />
          <Route path="/return-book" element={<ReturnBook />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin-logout" element={<AdminLogout />} />
          <Route path="/vendor-detail" element={<VendorPage />}></Route>
          <Route path="/review-books" element={<BookReviewPage />}></Route>




          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/student-books" element={<StudentMyBooks />} />
          <Route path="/student-notices" element={<StudentNotices />} />
          <Route path="/student-logout" element={<StudentLogout />} />



          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer />
        <ScrollToTop />
      </Router>
    </>
  );
}

export default App;