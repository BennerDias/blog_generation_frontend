import { Link } from "react-router-dom";
import type Postagem from "../../../models/Postagem";
import { formatDate } from "../../../utils/FormatDate";

interface CardPostagensProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
  return (
    <>
      <div className="flex min-h-full min-w-96 flex-col overflow-hidden rounded-3xl border bg-neutral-900 border-gray-500 text-white">
          <div className="w-full h-80 overflow-hidden">
            <img className="h-full w-full object-cover" 
            src={postagem.foto_postagem || 'https://noticiasdatv.uol.com.br/media/_versions/artigos_2021/jinx-arcane-netflix_fixed_large.jpg'} 
            alt="Imagem do post" />
          </div>

        <div className="-mt-6 min-h-50 rounded-t-3xl flex flex-col justify-between bg-neutral-900 p-5">
          <h4 className="text-md">{postagem.tema?.descricao}</h4>
          <h2 className="text-xl font-bold">{postagem.titulo}</h2>
          <p className="text-sm text-gray-400">{postagem.texto}</p>

          <div className="flex items-end gap-3 mt-5">
            <img className="rounded-full size-8" 
            src={postagem.usuario?.foto} 
            alt="" />

            <p>{formatDate(postagem.data)}</p>
          </div>
        </div>
      </div>
  
    </>
  );
}

export default CardPostagem;
