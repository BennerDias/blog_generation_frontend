import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps {
  tema: Tema;
}
function CardTema({ tema }: CardTemaProps) {
  return (
    <>
      <div className='flex min-h-full min-w-96 flex-col overflow-hidden rounded-3xl border bg-neutral-900 border-gray-500 text-(--Cream)'>
        <div className='w-full h-50 overflow-hidden'>
          <img
            className='h-full w-full'
            src={"https://thetema.net/assets/images/og_logo.png"}
            alt='Imagem do post'
          />
        </div>

        <div className='-mt-6 min-h-10 rounded-t-3xl flex flex-col justify-between  bg-neutral-900 p-5'>
          <h4 className='text-xl text-center font-bold'>{tema.descricao}</h4>
        </div>
        <div className='flex m-5 gap-5 items-center justify-center'>
          <Link
            to={`/editartema/${tema.id}`}
            className='rounded-lg bg-(--ElectricIndigo) flex justify-center items-center gap-4 hover:bg-(--NeonViolet) w-full py-2 px-10'
          >
            <button>Editar</button>
          </Link>
          <Link
            to={`/temas/${tema.id}`}
            className='rounded-lg bg-transparent flex justify-center items-center gap-4 hover:bg-red-500 w-full py-2 px-10'
          >
            <button>Deletar</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CardTema;
