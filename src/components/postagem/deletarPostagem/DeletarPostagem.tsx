import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);  

  const [showModal, setShowModal] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token
        }
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token
        }
      });

      ToastAlerta("Postagem apagada com sucesso", 'sucesso');
      retornar()
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/postagens");
  }

  return (
    <div className='flex h-screen justify-center items-center text-black '>
      <div className='relative z-10 flex flex-col w-96 lg:w-1/3 md:w-1/2 h-1/4 justify-center items-center bg-(--InkBlack)/60 bg-opacity-70 rounded-2xl shadow-2xl p-6 hover:bg-(--NeonViolet)/80 hover:scale-105 transition duration-300 text-(--Cream) hover:text-(--InkBlack)'>
        <h2 className='text-4xl font-semibold text-center mb-4'>
          Postagem {postagem.titulo}
        </h2>
        <p>{postagem.texto}</p>
        <p>Deseja deletar?</p>

        <div className='flex gap-6 justify-center text-center'>
          <button
            className='flex items-center justify-center w-auto p-3 mt-4 bg-(--ElectricIndigo) hover:bg-(--Cream) hover:text-[#2c302e] rounded-xl font-semibold transition-all duration-300'
            onClick={() => setShowModal(true)}
          >
            Deletar
          </button>

          <button
            className='flex items-center justify-center w-auto p-3 mt-4 hover:bg-(--LightGreen) rounded-xl font-semibold transition-all duration-300'
            onClick={retornar}
          >
            Cancelar
          </button>
        </div>
      </div>

      
    </div>
  );
}

export default DeletarPostagem;
