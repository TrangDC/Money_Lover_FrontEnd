import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import LoginPage from "./components/LoginPage/LoginPage";
import UploadImage from "./components/FireBase/Upimage";
import Error from "./components/Error";
import {useState} from "react";
import ActiveAccount from "./components/UserPage/ActiveAccount";
import CategoriesPage from "./components/UserPage/category/CategoriesPage";
import Wallet from "./components/WalletPage/Wallet";
import SideBar from "./layout/SideBar/SideBar";
import TransactionPage from "./components/TransactionPage/TransactionPage";
import CreateTransaction from "./components/TransactionPage/CreateTransaction";
import IncomePiechart from "./components/IncomePiechart/IncomePiechart";
import PinnedSubheaderList from "./components/TransactionPage/SubHeaderList/PinnedSubheaderList";
import EditTransaction from "./components/TransactionPage/EditTransaction";
import {WalletProvider} from "./WalletContext";



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
                    <Route path='/auth/*' element={(isAuth || user) ? <WalletProvider><SideBar/></WalletProvider> : <Error/>}>
                        <Route path="wallets" element={(isAuth || user) ? <Wallet/> : <Error/>}/>
                        <Route path="categories" element={(isAuth || user) ? <CategoriesPage/> : <Error/>}/>
                        <Route path="transactions" element={(isAuth || user) ? <PinnedSubheaderList/> : <Error/>}/>
                        <Route path="create_transaction" element={(isAuth || user) ? <CreateTransaction/> : <Error/>}/>
                        <Route path="edit_transaction" element={(isAuth || user) ? <EditTransaction/> : <Error/>}/>
                        <Route path='piechart' element={(isAuth || user) ? <IncomePiechart/> : <Error/>}/>
                    </Route>
                    <Route path='/login'
                           element={<LoginPage handleLoginSuccess={handleLoginSuccess} isAuth={isAuth}/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/upload' element={<UploadImage/>}/>
                    <Route path='/active' element={<ActiveAccount/>}/>
                    <Route path='/tranz' element={<TransactionPage/>}/>
                    <Route path='/piechart' element={<IncomePiechart/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;