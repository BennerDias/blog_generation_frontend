import { useNavigate } from "react-router-dom";
import CardPostagem from "../cardPostagem/CardPostagem";
import { useContext, useEffect, useState } from "react";
import type Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import DeleteModal from "../deleteModal/DeleteModal";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);

  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [postagemId, setPostagemId] = useState<number>(0);

  const [postSelecionada, setPostSelecionada] = useState<Postagem | null>(null);
  const token = usuario.token;

  function abrirModal(postagem: Postagem) {
    setPostSelecionada(postagem);
    setPostagemId(postagem.id!);
    setModalOpen(true);
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
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
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${postagemId}`, {
        headers: {
          Authorization: token
        }
      });

      ToastAlerta("Postagem apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
    }

    setModalOpen(false);
    buscarPostagens();
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && (
        <div className='flex justify-center w-full my-8'>
          <SyncLoader color='#312e81' size={32} />
        </div>
      )}

      <div className='flex justify-center w-full my-4'>
        <div className='container flex flex-col'>
          {!isLoading && postagens.length === 0 && (
            <span className='text-3xl text-center my-8'>
              Nenhuma Postagem foi encontrada!
            </span>
          )}

          <div
            className='grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8'
          >
            {postagens.map((postagem) => (
              <CardPostagem
                key={postagem.id}
                postagem={postagem}
                onDeleteClick={() => abrirModal(postagem)}
              />
            ))}
          </div>

          <DeleteModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={() => deletarPostagem()}
            title='Confirmar Exclusão'
            message={`Tem certeza que deseja excluir a postagem "${postSelecionada?.titulo}"?`}
          />
        </div>
      </div>
    </>
  );
}
export default ListaPostagens;
