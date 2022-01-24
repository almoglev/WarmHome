import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Category from './pages/Category';
import AddNewListing from './pages/AddNewListing';
import { PrivateRoute } from './components/PrivateRoute';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/category/:categoryName' element={<Category />} />
        <Route path='/profile' element={<PrivateRoute />} >
            <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/create-listing' element={<PrivateRoute />} >
            <Route path='/create-listing' element={<AddNewListing />} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
      <NavBar />
    </Router>

    <ToastContainer />
    </>
  );
}

export default App;
