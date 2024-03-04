
import './App.css';
import Transactions from "./components/Transactions";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import SubHeaderList from "./components/New_Transactions_Lists/SubHeaderList/SubHeaderList";
import CreateForm from "./components/New_Transactions_Lists/CreateForm/CreateForm";
function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path='/transactions' element={<CreateForm/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
