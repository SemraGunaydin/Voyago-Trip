import type { FC } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Header from "./componentes/header";
import Form from "./pages/form";

const App:FC = () => {
  return (
    <BrowserRouter>
    <Header/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/place/:id" element={<Detail/>}/>
      <Route path="/form/create" element={<Form/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;

