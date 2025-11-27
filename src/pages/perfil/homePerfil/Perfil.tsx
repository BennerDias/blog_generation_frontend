import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import EditarPerfil from "../editarPerfil/EditarPerfil";

function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (usuario.token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <>
      <div className='flex min-h-180'>
        <div className='relative w-[300px] h-[420px] rounded-2xl overflow-hidden shadow-xl m-auto bg-gray-200'>
          <img
            src={usuario.foto}
            className='absolute inset-0 w-full h-full object-cover'
          />
          <div className='absolute inset-0 from-black/50 via-black/0'></div>
          <div className='relative flex flex-col items-center justify-start h-full p-4 text-white'>
            <h2 className='text-xl font-semibold mt-4 drop-shadow'>
              {usuario.nome}
            </h2>
            <p className='flex items-center gap-1 text-sm opacity-90 text-b'>
              <span className='animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full'></span>
              Conectando...
            </p>
            <div className='flex flex-col items-center justify-end gap-3 absolute bottom-4 left-0 right-0 px-4'>
              <div className='flex items-center gap-3 bg-white/80 text-black rounded-xl px-4 py-2 backdrop-blur-md cursor-pointer'>
                <img src={usuario.foto} className='w-8 h-8 rounded-full' />
                <button className='font-medium text-sm' >Editar perfil</button>

                {openEdit === true ? <EditarPerfil {...usuario}/> : openEdit === false}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
