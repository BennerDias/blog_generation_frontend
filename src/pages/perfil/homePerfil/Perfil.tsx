import { useContext, useState, type FormEvent } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Usuario from "../../../models/Usuario";
import { atualizar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function Perfil() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [nome, setNome] = useState(usuario.nome);
  const [foto, setFoto] = useState(usuario.foto);
  const [email, setEmail] = useState(usuario.usuario);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function checagemSenha(): boolean {
    if (senha === "" && confirmarSenha === "") {
      return true;
    }

    if (senha !== confirmarSenha) {
      ToastAlerta(
        "As senhas não são iguais. O campo senha e confirmar senha precisam ser iguais.",
        "info"
      );
      return false;
    }

    return true;
  }

  async function atualizarPerfil(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!checagemSenha()) return;

    const senhaFinal = senha === "" ? usuario.senha : senha;

    const usuarioAtualizado: Usuario = {
      ...usuario,
      nome,
      foto,
      usuario: email,
      senha: senhaFinal
    };

    try {
      setIsLoading(true);

      await atualizar(`/usuarios/atualizar`, usuarioAtualizado, setIsLoading, {
        headers: {
          Authorization: token
        }
      });

      ToastAlerta("Perfil atualizado com sucesso!", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        ToastAlerta("Sessão expirada, faça login novamente.", "info");
        handleLogout();
      } else {
        ToastAlerta("Erro ao atualizar o perfil.", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[100vh]')] bg-cover bg-center">
      <div className='vf-container bg-[rgba(0,0,0,0.65)] backdrop-blur-md shadow-2xl rounded-3xl p-10 w-[90%] md:w-[500px] text-(--Cream) flex flex-col items-center gap-6'>
        <h2 className='text-3xl font-semibold  mb-2'>Meu Perfil</h2>

        <div className='relative '>
          <img
            src={
              foto ||
              "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
            }
            alt={nome}
            className='w-28 h-28 rounded-full object-cover border-4 border-[var(--HyperMagenta)] shadow-lg'
          />
        </div>

        <form
          onSubmit={atualizarPerfil}
          className='w-full flex flex-col gap-5 text-left'
        >
          <div>
            <label className='block mb-1 text-sm'>Nome</label>
            <input
              type='text'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className='w-full p-3 rounded-xl bg-[rgba(255,255,255,0.1)] border border-[var(--HyperMagenta)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--NeonViolet)]'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm'>URL da foto</label>
            <input
              type='text'
              value={
                foto ||
                "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
              }
              onChange={(e) => setFoto(e.target.value)}
              className='w-full p-3 rounded-xl bg-[rgba(255,255,255,0.1)] border border-[var(--HyperMagenta)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--NeonViolet)]'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm'>Usuário (email)</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-3 rounded-xl bg-[rgba(255,255,255,0.1)] border border-[var(--HyperMagenta)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--NeonViolet)]'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm'>Nova Senha</label>
            <input
              type='password'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder=''
              className='w-full p-3 rounded-xl bg-[rgba(255,255,255,0.1)] border border-[var(--HyperMagenta)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--NeonViolet)]'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm '>Confirme sua Senha</label>
            <input
              type='password'
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder=''
              className='w-full p-3 rounded-xl bg-[rgba(255,255,255,0.1)] border border-[var(--HyperMagenta)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--NeonViolet)]'
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='mt-4 w-full py-3 rounded-xl font-semibold text-lg bg-[var(--HyperMagenta)] hover:bg-[var(--NeonViolet)] transition-colors duration-300 disabled:opacity-50'
          >
            {isLoading ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Perfil;
