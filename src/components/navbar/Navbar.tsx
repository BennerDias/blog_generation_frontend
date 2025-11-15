import { useContext, useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  const [menuAberto, setMenuAberto] = useState(false);
  const [mobileMenuAberto, setMobileMenuAberto] = useState(false); // <--- NOVO

  function logout() {
    handleLogout();
    ToastAlerta("Usuário deslogado com sucesso!", "sucesso");
    navigate("/");
  }

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest(".menu-foto")) setMenuAberto(false);
      if (!target.closest(".mobile-menu")) setMobileMenuAberto(false);
    }

    document.addEventListener("click", handleClickFora);
    return () => document.removeEventListener("click", handleClickFora);
  }, []);

  if (usuario.token === "") return null;

  return (
    <nav className="bg-[var(--mustard)] py-4 px-8 sticky top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">

        {/* LOGO */}
        <Link to="/home">
          <img
            src="https://i.imgur.com/CoQV1E3.png"
            alt="DevBlog"
            className="w-10 h-10 rounded-full"
          />
        </Link>

        {/* BOTÃO HAMBÚRGUER – só aparece no mobile */}
        <button
          className="md:hidden flex flex-col gap-1 mobile-menu"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuAberto(!mobileMenuAberto);
          }}
        >
          <span className="w-8 h-1 bg-white rounded"></span>
          <span className="w-8 h-1 bg-white rounded"></span>
          <span className="w-8 h-1 bg-white rounded"></span>
        </button>

        {/* LINKS – DESKTOP */}
        <ul className="hidden md:flex gap-10 text-white">
          <li><Link className="hover:text-[var(--blood)]" to="/temas">Temas</Link></li>
          <li><Link className="hover:text-[var(--blood)]" to="/sobre">Sobre</Link></li>
          <li><Link className="hover:text-[var(--blood)]" to="/contato">Contato</Link></li>
        </ul>

        {/* FOTO PERFIL */}
        <div className="relative menu-foto hidden md:flex flex-col text-white items-center">
          <img
            onClick={() => setMenuAberto(!menuAberto)}
            className="rounded-full size-12 cursor-pointer hover:scale-105 transition-transform"
            src={usuario.foto || "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"}
            alt={usuario.nome}
          />
          <p className="text-sm">{usuario.nome}</p>

          {menuAberto && (
            <div className="absolute top-16 right-0 bg-[var(--blood)] border border-gray-600 rounded-xl shadow-2xl py-3 px-4 flex flex-col gap-2 w-44">
              <Link to="/perfil" className="hover:text-[var(--mustard)] flex flex-col items-center justify-center">Meu Perfil</Link>
              <button onClick={logout} className="text-red-400 hover:text-[var(--mustard)]">Sair</button>
            </div>
          )}
        </div>
      </div>

      {/* MENU MOBILE */}
      {mobileMenuAberto && (
        <div className="md:hidden flex flex-col gap-4 mt-4 text-white bg-[var(--gray)]  p-4 rounded-xl shadow-xl mobile-menu">
          <Link className="hover:text-xl hover:text-[var(--blood)]" to="/postagens" onClick={() => setMobileMenuAberto(false)}>Postagens</Link>
          <Link className="hover:text-xl hover:text-[var(--blood)]" to="/temas" onClick={() => setMobileMenuAberto(false)}>Categorias</Link>
          <Link className="hover:text-xl hover:text-[var(--blood)]" to="/contato" onClick={() => setMobileMenuAberto(false)}>Contato</Link>
          <Link className="hover:text-xl hover:text-[var(--blood)]" to="/perfil" onClick={() => setMobileMenuAberto(false)}>Perfil</Link>
          <button onClick={logout} className="text-red-400 text-left hover:text-xl hover:text-[var(--blood)]">Sair</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
