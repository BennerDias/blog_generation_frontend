import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import type Postagem from "../../../models/Postagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardPostagem from "../cardPostagem/CardPostagem";

function ListaPostagens() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarPostagens();
  }, [postagens.length]);

  async function buscarPostagens() {
    try {
      setIsLoading(true);

      await buscar("/postagens", setPostagens, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      <div className="relative z-10 flex flex-col items-center pt-10">
        {isLoading && (
          <div className="flex justify-center w-full my-8">
            <SyncLoader color="#9ae19d" size={32} />
          </div>
        )}

        {!isLoading && postagens.length === 0 && (
          <span className="text-3xl text-center my-8">
            Nenhuma Postagem foi encontrada!
          </span>
        )}

        <div className="flex justify-end w-full max-w-6xl mb-10">
          <Link to="/cadastrarpostagem">
            <button className="px-6 py-2 rounded-lg bg-(--mustard) hover:bg-orange-400 transition font-semibold text-sm text-white shadow-md">
              Criar Nova postagem
            </button>
          </Link>
        </div>

        <div className="flex justify-center w-full mb-10">
          <div className="grid place-items-center gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {postagens.map((postagem) => (
              <CardPostagem key={postagem.id} postagem={postagem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListaPostagens;
