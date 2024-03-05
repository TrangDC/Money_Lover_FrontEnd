import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import LoginPage from "./components/LoginPage/LoginPage";
import Layout from "./layout/Layout";
import Dashboard from "./components/HomePage/Dashboard";
import WalletPage from "./components/UserPage/wallet/WalletPage";
import UploadImage from "./components/FireBase/Upimage";
import Error from "./components/Error";
import {useState} from "react";
import ActiveAccount from "./components/UserPage/ActiveAccount";
import CategoriesPage from "./components/UserPage/category/CategoriesPage";
import SideBar from "./layout/SideBar/SideBar";
import Transactions from "./components/TransactionPage/Transactions";
import Detail from "./components/Detail/Detail";
import TransactionList from "./components/Detail/TransactonsDetail";
import BasicExample from "./components/Detail/BasicExample";

function DetailPage() {
    return null;
}

function TransactionsDetail() {
    return null;
}

function App() {
    const [isAuth, setIsAuth] = useState(false);

    const user = window.localStorage.getItem('user')

    const handleLoginSuccess = () => {
        setIsAuth(true);
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Error/>}></Route>
                    <Route path='/auth/*' element={(isAuth || user) ? <Layout/> : <Error/>}>
                        <Route path='trans' element={<Transactions/>}/>
                        <Route path="home" element={(isAuth || user) ? <Dashboard/> : <Error/>}/>
                        <Route path="wallets" element={(isAuth || user) ? <WalletPage/> : <Error/>}/>
                        {/*<Route path="profile" element={(isAuth || user) ? <InformationUser/> : <Error/>}/>*/}
                        <Route path="categories" element={(isAuth || user) ? <CategoriesPage/> : <Error/>}/>
                    </Route>
                    <Route path='/login'
                           element={<LoginPage handleLoginSuccess={handleLoginSuccess} isAuth={isAuth}/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/upload' element={<UploadImage/>}/>
                    <Route path='/active' element={<ActiveAccount/>}/>
                    <Route path='/sidebar' element={<SideBar/>}/>
                    <Route path='/trans' element={<Transactions/>}/>
                    <Route path={'basic'} element={<BasicExample/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;