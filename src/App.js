
import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import InformationUser from "./components/UserPage/InformationUser";
import WalletPage from "./components/UserPage/wallet/WalletPage";
import CreateWallet from "./components/UserPage/wallet/CreateWallet";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<InformationUser />}></Route>
                <Route path='/user/wallet' element={<WalletPage />}></Route>
                <Route path='/user/createWallet' element={<CreateWallet />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
            </Routes>
        </BrowserRouter>


    </div>
  );
}

export default App;
