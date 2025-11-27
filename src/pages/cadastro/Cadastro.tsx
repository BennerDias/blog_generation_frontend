import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
        alert("Usuário cadastrado com sucesso!");
      } catch (error) {
        alert("Erro ao cadastrar usuário!");
        console.log(error);
      }
    } else {
      alert(
        "Dados do usuário inconsistentes! Verifique as informações do cadastro."
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-(--PitchBlack) text-(--Celadon)'>
        <div className="bg-[url('https://ticoopbrasil.coop.br/wp-content/uploads/2024/10/O-Que-E-Programacao.jpg.webp')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover "></div>
        

        <div className='flex flex-col items-center justify-around backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.08)] py-8 w-96 lg:w-120 min-h-130 rounded-2xl'>
          <form
            className='flex justify-center items-center flex-col w-full gap-3 font-light p-10'
            onSubmit={cadastrarNovoUsuario}
          >
            <h2 className='text-5xl font-bold'>Cadastro</h2>
            <p>Preencha todos os dados para criar sua conta</p>
            <div className='flex flex-col w-full '>
              <label htmlFor='nome'>Nome</label>
              <input
                type='text'
                id='nome'
                name='nome'
                placeholder='Seu nome'
                value={usuario.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
                className='border border-(--DustyOlive) rounded-md p-2'
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='usuario'>Email</label>
              <input
                type='text'
                id='usuario'
                name='usuario'
                placeholder='seu@email.com'
                value={usuario.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
                className='border border-(--DustyOlive) rounded-md p-2'
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='foto'>Foto</label>
              <input
                type='text'
                id='foto'
                name='foto'
                placeholder='Link da sua foto'
                value={usuario.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
                className='border border-(--DustyOlive) rounded-md p-2'
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='senha'>Senha</label>
              <input
                type='password'
                id='senha'
                name='senha'
                placeholder='******'
                value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
                className='border border-(--DustyOlive) rounded-md p-2'
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='confirmarSenha'>Confirmar Senha</label>
              <input
                type='password'
                id='confirmarSenha'
                name='confirmarSenha'
                placeholder='******'
                value={confirmarSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleConfirmarSenha(e)
                }
                className='border border-(--DustyOlive) rounded-md p-2'
              />
            </div>
            <div className='flex justify-around w-full gap-8'>
              <button
                type='submit'
                className='rounded bg-(--CanaryYellow) flex justify-center hover:bg-yellow-400 text-black w-full py-2 my-3'
              >
                {isLoading ? (
                  <ClipLoader color='#ffffff' size={24} />
                ) : (
                  <span>Criar conta</span>
                )}
              </button>
            </div>
            <div className='flex w-full font-light text-center justify-center'>
              <p>
                Já tem uma conta?{" "}
                <button
                  type='reset'
                  onClick={retornar}
                  className=' text-(--CanaryYellow)  hover:underline'
                >
                  Faça login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
