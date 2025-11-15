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
  const [temaSelecionado, setTemaSelecionado] = useState<Tema | null>(null);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    data: "",
    tema: {} as Tema,
    usuario: {} as Usuario,
  });

  // -------- BUSCAS -------- //

  async function buscarTemas() {
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
      const resposta = await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });

      // Quando editar, preencher selects
      setUsuarioSelecionado(resposta.usuario);
      setTemaSelecionado(resposta.tema);
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

  // -------- VERIFICA LOGIN -------- //

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  // -------- BUSCAR DADOS INICIAIS -------- //

  useEffect(() => {
    buscarTemas();
    buscarUsuarios();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  // -------- ATUALIZAR INPUTS -------- //

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: temaSelecionado!,
      usuario: usuarioSelecionado!,
    });
  }

  // -------- ENVIAR FORMULÁRIO -------- //

  async function gerarNovaPostagem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!usuarioSelecionado) {
      ToastAlerta("Selecione o usuário autor", "info");
      setIsLoading(false);
      return;
    }

    if (!temaSelecionado) {
      ToastAlerta("Selecione um tema", "info");
      setIsLoading(false);
      return;
    }

    const payload: Postagem = {
      ...postagem,
      usuario: usuarioSelecionado,
      tema: temaSelecionado,
    };

    try {
      if (id !== undefined) {
        await atualizar(`/postagens`, payload, setPostagem, {
          headers: { Authorization: token },
        });
        ToastAlerta("Postagem atualizada com sucesso", "sucesso");
      } else {
        await cadastrar(`/postagens`, payload, setPostagem, {
          headers: { Authorization: token },
        });
        ToastAlerta("Postagem cadastrada com sucesso", "sucesso");
      }

      navigate("/");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
        ToastAlerta("Faça login novamente!", "info");
      } else {
        ToastAlerta("Erro ao salvar a postagem", "erro");
      }
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col text-white items-center py-20 px-6 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center filter grayscale">
      <h1 className="text-4xl font-bold mb-6 text-black">
        {id ? "Editar Postagem" : "Criar nova Postagem"}
      </h1>

      <form
        className="bg-slate-800/60 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 border border-slate-700"
        onSubmit={gerarNovaPostagem}
      >
        {/* Usuário */}
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-semibold">Usuário</label>
          <select
            required
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 focus:ring-2 focus:ring-orange-400"
            value={usuarioSelecionado?.id || ""}
            onChange={(e) =>
              setUsuarioSelecionado(
                usuarios.find((u) => u.id === Number(e.target.value)) || null
              )
            }
          >
            <option value="">Selecione...</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome} ({u.usuario})
              </option>
            ))}
          </select>
        </div>

        {/* Título */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Título</label>
          <input
            type="text"
            name="titulo"
            required
            placeholder="Digite o título"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 focus:ring-2 focus:ring-orange-400"
            value={postagem.titulo}
            onChange={atualizarEstado}
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Texto</label>
          <input
            type="text"
            name="texto"
            required
            placeholder="Digite o conteúdo"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 focus:ring-2 focus:ring-orange-400"
            value={postagem.texto}
            onChange={atualizarEstado}
          />
        </div>

        {/* Data */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Data</label>
          <input
            type="date"
            name="data"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 focus:ring-2 focus:ring-orange-400"
            value={
              postagem.data ? new Date(postagem.data).toISOString().split("T")[0] : ""
            }
            onChange={atualizarEstado}
          />
        </div>

        {/* Tema */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Tema</label>
          <select
            required
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 focus:ring-2 focus:ring-orange-400"
            value={temaSelecionado?.id || ""}
            onChange={(e) =>
              setTemaSelecionado(
                temas.find((t) => t.id === Number(e.target.value)) || null
              )
            }
          >
            <option value="">Selecione...</option>
            {temas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.descricao}
              </option>
            ))}
          </select>
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="mt-4 w-full px-6 py-3 rounded-lg bg-[var(--celadon)] hover:bg-[var(--ferngreen)] transition font-semibold text-black text-lg shadow-md"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : id ? (
            "Atualizar"
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
    </div>
  );
}

export default ModalPostagem;
