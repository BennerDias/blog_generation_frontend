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
import FloatingLines from "./components/animated/floatingLines/FloatingLines";
import ListaPostagens from "./components/postagem/listaPostagens/ListaPostagens";
import Perfil from "./pages/perfil/homePerfil/Perfil";
import FormPostagem from "./components/postagem/formPostagem/FormPostagem";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            inset: 0,
            zIndex: -1
          }}
        >
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            // Array - specify line count per wave; Number - same count for all waves
            lineCount={[10, 15, 20]}
            // Array - specify line distance per wave; Number - same distance for all waves
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route>
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/perfil' element={<Perfil />} />
              <Route path='/home' element={<Home />} />
              <Route path='/cadastro' element={<Cadastro />} />
              <Route path='/temas' element={<ListaTemas />} />
              <Route path='/postagens' element={<ListaPostagens />} />
              <Route path='/novapostagem' element={<FormPostagem />} />
              <Route path='/cadastrartema' element={<FormTema />} />
              <Route path='/editartema/:id' element={<FormTema />} />
              <Route path='/deletartema/:id' element={<DeletarTema />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
