import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ListaTemas from "./components/tema/listaTemas/ListaTemas";
import FormTema from "./components/tema/formTema/FormTema";
import DeletarTema from "./components/tema/deletarTema/DeletarTema";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer/>
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route>
                <Route path='/' element={<Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/temas' element={<ListaTemas />} />
                <Route path='/cadastrartema' element={<FormTema />} />
                <Route path='/editartema/:id' element={<FormTema />} />
                <Route path='/deletartema/:id' element={<DeletarTema />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
