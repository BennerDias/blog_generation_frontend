import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {
  const navigate = useNavigate();

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "erro");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarTema() {
    setIsLoading(true);
    try {
      await deletar(`/temas/${id}`, {
        headers: {
          Authorization: token
        }
      });

      ToastAlerta("Tema apagado com sucesso!", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar o tema", "erro");
      }
    }

    setIsLoading(false);
    setShowModal(false);
    retornar();
  }

  function retornar() {
    navigate("/temas");
  }
  return (
    <div className='flex h-screen justify-center items-center text-black '>
      <div className='relative z-10 flex flex-col w-96 lg:w-1/3 md:w-1/2 h-1/4 justify-center items-center bg-(--InkBlack)/60 bg-opacity-70 rounded-2xl shadow-2xl p-6 hover:bg-(--NeonViolet)/80 hover:scale-105 transition duration-300 text-(--Cream) hover:text-(--InkBlack)'>
        <h2 className='text-4xl font-semibold text-center mb-4'>
          Tema {tema.descricao}
        </h2>
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

      {showModal && (
        <div className='absolute top-30 bg-opacity-60 flex justify-center items-start '>
          <div className='bg-(--jet) text-white rounded-2xl shadow-lg p-8 w-96 flex flex-col justify-center items-center gap-6 animate-fadeIn '>
            <h3 className='text-2xl font-semibold text-center justify-center items-center'>
              Confirmar exclusão
            </h3>
            <p className='text-center text-gray-300'>
              Tem certeza que deseja deletar o Tema{" "}
              <span className='font-bold text-(--tomato)'>
                {tema.descricao}
              </span>
              ?
            </p>

            <div className='flex gap-4'>
              <button
                onClick={deletarTema}
                className='px-6 py-2 bg-(--tomato) rounded-lg hover:bg-red-600 transition-all font-semibold text-white'
              >
                {isLoading ? (
                  <ClipLoader color='#fff' size={20} />
                ) : (
                  "Sim, deletar"
                )}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className='px-6 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 transition-all font-semibold text-white'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeletarTema;
