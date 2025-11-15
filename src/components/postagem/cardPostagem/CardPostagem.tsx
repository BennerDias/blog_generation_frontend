import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import type Postagem from "../../../models/Postagem";

interface CardPostagemProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagemProps) {
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;
  const [valorMensalidade, setValorMensalidade] = useState<number | null>(null);


  async function desconto() {
    try {
      await buscar(
        `/servicos/calculo_mensalidade/${postagem.id}`,
        setValorMensalidade,
        {
          headers: { Authorization: token },
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    desconto();
  }, [postagem.id]);

  return (
    <div className="flex flex-col bg-[#242d25] items-center rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition duration-300 w-80">
      <div className="flex w-full py-3 px-6 items-center gap-4 border-b border-orange-400">
        <img
          src={postagem.usuario?.foto || 'https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png'}
          className="h-14 w-14 rounded-full object-cover border-2 border-orange-400"
        />
        <h3 className="text-xl font-bold uppercase text-orange-400">
          {postagem.usuario?.nome}
        </h3>
      </div>

      <div className="p-6 w-full flex flex-col text-white justify-between flex-grow">
        <div className="mb-4 space-y-2">
          <p className="font-semibold text-base">
            Modalidade:{" "}
            {/* <span className="font-normal">{postagem.modalidade}</span> */}
          </p>
          <p className="font-semibold text-base">
            Frequência:{" "}
            {/* <span className="font-normal">{postagem.frequencia}</span> */}
          </p>
          <p className="font-semibold text-base">
            Categoria:{" "}
            <span className="font-normal">
              {postagem.tema?.descricao}
            </span>
          </p>
          <p className="font-semibold text-base">
            Matrícula:{" "}
            {/* {postagem.dt_matricula
              ? new Date(postagem.dt_matricula).toLocaleDateString()
              : "N/A"} */}
          </p>
        </div>

        <div className="pt-4 border-t border-orange-400">
          <p className="text-sm font-medium text-gray-500 line-through">
            {/* Mensalidade: R${postagem.valor_mensalidade} */}
          </p>

          <p className="text-3xl font-extrabold text-orange-400 mt-1 flex items-baseline">
            <span>Pague:</span>
            <span className="ml-2">
              R$
              {valorMensalidade
                ? `${valorMensalidade.toFixed(2).replace(".", ",")}`
                : ""}
            </span>
          </p>
        </div>
      </div>

      <div className="flex w-full p-4 gap-4 border-t border-orange-500 justify-center">
        <Link
          to={`/editarservico/${postagem.id}`}
          className="flex-1 flex items-center justify-center p-3 text-center bg-orange-500 hover:bg-orange-900 text-white rounded-lg font-semibold transition-all duration-300 shadow-md"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarservico/${postagem.id}`}
          className="flex-1 flex items-center justify-center p-3 text-white hover:bg-red-800 rounded-lg font-semibold transition-all duration-300"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
