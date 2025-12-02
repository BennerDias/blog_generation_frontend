import { Link, useNavigate, useParams } from "react-router-dom";
import type Postagem from "../../../models/Postagem";
import { formatDate } from "../../../utils/FormatDate";
import { useContext, useState } from "react";
import { deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";

interface CardPostagensProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { usuario, handleLogout } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const token = usuario.token;

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token
        }
      });

      ToastAlerta("Postagem apagada com sucesso", "sucesso");
      retornar();
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
    <>
      <div className='flex min-h-full min-w-96 flex-col overflow-hidden rounded-3xl border bg-neutral-900 border-gray-500 text-(--Cream)'>
        <div className='w-full h-80 overflow-hidden'>
          <img
            className='h-full w-full object-cover'
            src={
              postagem.foto_postagem ||
              "https://noticiasdatv.uol.com.br/media/_versions/artigos_2021/jinx-arcane-netflix_fixed_large.jpg"
            }
            alt='Imagem do post'
          />
        </div>

        <div className='-mt-6 min-h-50 rounded-t-3xl flex flex-col justify-between  bg-neutral-900 p-5'>
          <h4 className='text-md'>{postagem.tema?.descricao}</h4>
          <h2 className='text-xl font-bold'>{postagem.titulo}</h2>
          <p className='text-sm text-gray-400'>
            {postagem.texto.length < 500
              ? postagem.texto
              : postagem.texto + " Leia mais"}
          </p>

          <div className='flex items-end gap-3 mt-5'>
            <img
              className='rounded-full size-8'
              src={postagem.usuario?.foto}
              alt=''
            />

            <p>{formatDate(postagem.data)}</p>
          </div>
        </div>
        <div className='flex m-5 gap-5 items-center justify-center'>
          <Link
            to={`/editarpostagem/${postagem.id}`}
            className='rounded-lg bg-(--ElectricIndigo) flex justify-center items-center gap-4 hover:bg-(--NeonViolet) w-full py-2 px-10'
          >
            <button>Editar</button>
          </Link>
            <button className='rounded-lg bg-transparent flex justify-center items-center gap-4 hover:bg-red-500 w-full py-2 px-10' 
            onClick={() => setShowModal(true)}
            >
              Deletar
            </button>
        </div>

        {showModal && (
          <div className='absolute  bg-opacity-60 flex justify-center items-center '>
            <div className='bg-(--jet) text-white rounded-2xl shadow-lg p-8 w-96 flex flex-col justify-center items-center gap-6 animate-fadeIn '>
              <h3 className='text-2xl font-semibold text-center justify-center items-center'>
                Confirmar exclusão
              </h3>
              <p className='text-center text-gray-300'>
                Tem certeza que deseja deletar a Postagem{" "}
                <span className='font-bold text-(--tomato)'>
                  {postagem.titulo}
                </span>
                ?
              </p>

              <div className='flex gap-4'>
                <button
                  onClick={deletarPostagem}
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
    </>
  );
}

export default CardPostagem;
