/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Usuario from "../../../models/Usuario";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import type Tema from "../../../models/Tema";
import type Postagem from "../../../models/Postagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ModalPostagem() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  async function buscarTema() {
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

  async function buscarUsuarios() {
    try {
      await buscar("/usuarios/all", setUsuarios, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTema();
    buscarUsuarios(); 

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuarioSelecionado, 
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!usuarioSelecionado) {
      ToastAlerta("Selecione o usuário contratante", "info");
      setIsLoading(false);
      return;
    }

    const payload: Postagem = {
      ...postagem,
      tema: tema,
      usuario: usuarioSelecionado, 
    };

    try {
      if (id !== undefined) {
        await atualizar(`/postagens`, payload, setPostagem, {
          headers: { Authorization: token },
        });
        ToastAlerta("Serviço atualizado com sucesso", "sucesso");
      } else {
        await cadastrar(`/postagens`, payload, setPostagem, {
          headers: { Authorization: token },
        });
        ToastAlerta("Serviço cadastrado com sucesso", "sucesso");
      }
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
        ToastAlerta("Faça login para continuar!", "info");
      } else {
        ToastAlerta("Erro ao salvar o serviço", "erro");
      }
    }
    console.log(postagem)
    setIsLoading(false);
    retornar();
  }

  const carregandoCategoria = tema.descricao === "";

  return (
      <div className="flex flex-col text-white items-center py-20 px-6 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center filter grayscale">
      <h1 className="text-4xl font-bold mb-6 text-black">
        {id !== undefined ? "Editar Postagem" : "Realizar nova Postagem"}
      </h1>

      <form
        className="bg-slate-800/60 rounded-2xl mb-15 shadow-lg p-8 w-full max-w-md flex flex-col mt-5 gap-6 border border-slate-700"
        onSubmit={gerarNovaPostagem}
      >
        <div className="flex flex-col gap-2">
          <label className="block mb-2 text-sm font-semibold">
            Usuário contratante
          </label>
          <select
            required
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => {
              const usuarioSelecionado = usuarios.find(
                (u) => u.id === Number(e.target.value)
              );
              setUsuarioSelecionado(usuarioSelecionado || null);
            }}
          >
            <option  value="">Selecione o usuário...</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome} ({u.usuario})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Titulo</label>
          <input
            type="text"
            name="titulo"
            required
            placeholder="Ex: JavaScript"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={postagem.titulo || ""}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Texto</label>
          <input
            type="text"
            placeholder="Apresente suas ideias"
            name="texto"
            required
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={postagem.texto || ""}
            onChange={atualizarEstado}
          />
        </div>


        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Data da Postagem</label>
          <input
            type="date"
            name="dt_matricula"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={
              postagem.data
                ? new Date(postagem.data).toISOString().split("T")[0]
                : ""
            }
            onChange={atualizarEstado}
          />
        </div>

        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Tema</label>
          <select
            name="categoria"
            className="border p-3 border-slate-800 rounded bg-slate-900 focus:ring-2 focus:ring-orange-400"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione um Tema
            </option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full px-6 py-3 rounded-lg bg-[var(--celadon)] hover:bg-[var(--ferngreen)] transition font-semibold text-black text-lg shadow-md"
          disabled={carregandoCategoria || isLoading}
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
      </div>
  );
}

export default ModalPostagem;
