import { useContext, useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { NotePencil, SignOut, Tag } from "@phosphor-icons/react";

function Navbar() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O usuário foi desconectado com sucesso!", "sucesso");
    navigate("/");
  }

    useEffect(() => {
    function handleClickFora(event: any) {
      const target = event.target;
      if (!target.closest(".menu-foto") && !target.closest(".mobile-menu") && !target.closest(".hamburger-btn")) {
        setMenuAberto(false);
        setMenuMobileOpen(false);
      }
    }

    document.addEventListener("click", handleClickFora);
    return () => document.removeEventListener("click", handleClickFora);
  }, []);

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <>
      <div className='w-full h-20 flex justify-center py-4 bg-transparent text-(--ElectricIndigo)'>
        <div className='container flex justify-between items-center text-xl '>
          <Link
            to='/'
            className='mx-10 font-bold hover:bg-(--NeonViolet) hover:text-(--Cream) transition-colors duration-300 relative group rounded-lg min-w-contain p-3 text-center '
          >
            Blog
          </Link>
          <div className='w-1/2 hidden md:flex lg:flex justify-end'>
            <span className='flex hover:bg-(--NeonViolet) hover:text-(--Cream) transition-colors duration-300 relative group rounded-lg min-w-contain p-3 text-center cursor-pointer gap-2'>
              <NotePencil size={32} />
              <Link to='/postagens'>Postagens</Link>
            </span>

            <span className='flex hover:bg-(--NeonViolet) hover:text-(--Cream) transition-colors duration-300 relative group rounded-lg min-w-contain p-3 text-center cursor-pointer gap-2'>
              <Tag size={32} />
              <Link to='/temas'>Temas</Link>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end h-full w-full lg:w-1/9 mr-10 gap-4">
          <button
            className="hamburger-btn md:hidden p-2 rounded-md focus:outline-none"
            aria-label="Alternar menu"
            aria-expanded={menuMobileOpen}
            onClick={(e) => {
              e.stopPropagation();
              setMenuMobileOpen((s) => !s);
            } }
          >
            <svg className="w-6 h-6 text-(--ElectricIndigo)" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          <div className="relative menu-foto flex flex-col items-center text-(--ElectricIndigo) ">
            <img
              onClick={(e) => {
                e.stopPropagation();
                setMenuAberto((s) => !s);
              } }
              className="rounded-full w-15 h-15 lg:w-12 lg:h-11 lg:pt-1 cursor-pointer hover:scale-105 transition-transform duration-300"
              src={usuario.foto || "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"}
              alt={usuario.nome} />
            <p className="text-sm hidden md:block">{usuario.nome}</p>

            {menuAberto && (
              <div className="absolute top-16 right-0 bg-blue bg-opacity-95 border border-gray-600 rounded-xl shadow-2xl py-3 px-4 flex flex-col gap-2 w-44 animate-fadeIn ">
                <Link to="/perfil" className="text-(--ElectricIndigo) hover:text-(--NeonViolet) transition" onClick={() => setMenuAberto(false)}>
                  Meu Perfil
                </Link>
                <button onClick={logout} className="flex gap-2 items-center text-red-400 hover:text-red-600 transition text-left">
                  <SignOut size={20}/>
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={`mobile-menu md:hidden ${menuMobileOpen ? "block" : "hidden"}`}>
          <div className="px-6 pb-4 pt-2 border-t border-gray-700 bg-transparent shadow-2xl">
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              <li>
                <Link to="/categorias" onClick={() => setMenuMobileOpen(false)} className="block text-(--ElectricIndigo) text-base font-medium hover:text-(--NeonViolet) transition-colors duration-200">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/servicos" onClick={() => setMenuMobileOpen(false)} className="block text-(--ElectricIndigo) text-base font-medium hover:text-(--celadon) transition-colors duration-200">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/sobre" onClick={() => setMenuMobileOpen(false)} className="block text-(--ElectricIndigo) text-base font-medium hover:text-(--celadon) transition-colors duration-200">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contato" onClick={() => setMenuMobileOpen(false)} className="block text-(--ElectricIndigo) text-base font-medium hover:text-(--celadon) transition-colors duration-200">
                  Contato
                </Link>
              </li>
              <li className="pt-2 border-t border-gray-700">
                <Link to="/perfil" onClick={() => setMenuMobileOpen(false)} className="block text-(--ElectricIndigo) font-medium hover:text-(--celadon)">
                  Meu Perfil
                </Link>
              </li>
              <li>
                <button onClick={logout} className="w-full text-left text-(--HyperMagenta) click:text-(--NeonViolet) hover:text-yellow-600 transition py-2">Sair</button>
              </li>
            </ul>
          </div>
        </div></>
    );
  }
  return <>{component}</>;
}

export default Navbar;
