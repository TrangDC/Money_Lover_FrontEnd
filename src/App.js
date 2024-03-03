
import './App.css';
import Transactions from "./components/Transactions";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./layout/SideBar";
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path='/auth/*' element={<SideBar/>}>
                      <Route path='transactions' element={<Transactions/>}/>
                  </Route>
                  <Route path='/transactions' element={<Transactions/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
