import { Link } from "react-router-dom";
import type Postagem from "../../../models/Postagem";

interface CardPostagemProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagemProps) {

  return (
    <div className="flex flex-col justify-between bg-transparent items-center rounded-2xl shadow-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:scale-[1.02] transition duration-300 w-80 h-140">
      <div className="flex flex-col w-full py-3 px-6 items-center gap-4 border-b border-(--mustard) text-white">
        <img
          src={postagem.usuario?.foto || 'https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png'}
          className="h-14 w-14 rounded-full object-cover border-2 border-(--mustard)"
        />
        <h3 className="text-xl font-bold uppercase">
          {postagem.usuario?.nome}
        </h3>
        <p className="font-semibold">
            <span className="font-bold">{postagem.tema?.descricao}</span>
          </p>
      </div>

      <div className="p-6 w-full flex flex-col h-full justify-between text-white">
          
          <p className="font-semibold text-base">
            <span className="flex font-bold text-xl justify-center-safe underline">{postagem.titulo}</span>
          </p>
          <p className="font-semibold text-sm">
            <span className="font-normal">
              {postagem.texto}
            </span>
          </p>
          <div className="flex justify-end text-(--gray) items-end">
              <p className="font-semibold text-xs">
                {postagem.data
                  ? new Date(postagem.data).toLocaleDateString()
                  : "N/A"}
              </p>
        </div>

        
      </div>

      <div className="flex w-full p-4 gap-4 border-t border-(--mustard) justify-center">
        <Link
          to={`/editarservico/${postagem.id}`}
          className="flex-1 flex items-center justify-center p-3 text-center bg-(--mustard) hover:bg-orange-400 text-white rounded-lg font-semibold transition-all duration-300 shadow-md"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarservico/${postagem.id}`}
          className="flex-1 flex items-center justify-center p-3 text-white hover:bg-red-500 rounded-lg font-semibold transition-all duration-300"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
