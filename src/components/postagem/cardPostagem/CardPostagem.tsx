import { Link } from "react-router-dom";
import type Postagem from "../../../models/Postagem";
import { formatDate } from "../../../utils/FormatDate";

interface CardPostagensProps {
  postagem: Postagem;
  onDeleteClick: () => void;
}

function CardPostagem({ postagem, onDeleteClick }: CardPostagensProps) {
  return (
    <>
      <div className='flex min-h-full min-w-96 flex-col overflow-hidden rounded-3xl border bg-neutral-900 border-gray-500 text-(--Cream)'>
        <div className='w-full h-80 overflow-hidden'>
          <img
            className='h-full w-full object-cover'
            src={
              postagem.foto_postagem ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRheWx9jN1LVMQPnDlhe09fom8AH-8n0kepHQ&s"
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
          <button
            className='rounded-lg bg-transparent flex justify-center items-center gap-4 hover:bg-red-500 w-full py-2 px-10'
            onClick={onDeleteClick}
          >
            Deletar
          </button>
        </div>
      </div>
    </>
  );
}

export default CardPostagem;
