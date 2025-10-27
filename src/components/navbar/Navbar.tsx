import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("O usuário foi desconectado com sucesso!");
    navigate("/");
  }
  return (
    <>
      <div className='w-full flex justify-center py-4 bg-indigo-900 text-white'>
        <div className='container flex justify-between mx-8 text-2xl font-bold'>
          <Link to='/' className='text-2x1 font-bold'>
            Blog Pessoal
          </Link>
          <div className='flex gap-4'>
            <span className='hover:text-gray-300 cursor-pointer'>
              Postagens
            </span>
            <span>Temas</span>
            <span>
              <Link to='/cadastro'>Cadastrar tema</Link>
            </span>
            <span>Perfil</span>
            <span><Link to='' onClick={logout} className="hover:underline">Sair</Link></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
