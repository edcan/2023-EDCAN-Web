import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Main from "./pages/main"
import AdminPage from "./pages/Admin"
import PortFolio from "./pages/PortFolio"
import NotFound from "./pages/NotFound"
import Educan from "./pages/Educan"
import Join from "./pages/Join"

function App() {

  return (<div className="RealParent">
    {/* <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route path="/portfolio" element={<PortFolio/>}/>
        <Route path="/educan" element={<Educan/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter> */}
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Join/>}/>
        <Route path="/scoreform" element={<AdminPage/>}/>
        <Route path="*" element={<Join/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
