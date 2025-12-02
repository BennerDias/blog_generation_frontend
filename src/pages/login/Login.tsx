import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent
} from "react";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {
  const navigate = useNavigate();

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <>
      <div
        className='flex flex-col h-screen place-items-center justify-center font-bold text-(--Cream)'
      >
        <div className='w-full text-center my-8'>
          <h2 className='text-4xl font-Bold'>Bem-vindo de volta</h2>
          <p className='font-light'>Entre na sua conta para continuar</p>
        </div>
        <div className='flex flex-col items-center justify-around backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.08)] py-8 w-96 lg:w-120 min-h-130 rounded-2xl'>
          <div className='w-full text-center'>
            <h2 className='text-4xl font-bold'>Login</h2>
            <p className='font-light'>Digite suas credenciais para acessar</p>
          </div>
          <form
            className='flex justify-center items-center flex-col gap-5'
            onSubmit={login}
          >
            <div className='flex flex-col w-full'>
              <label htmlFor='usuario'></label>
              <input
                type='text'
                id='usuario'
                name='usuario'
                value={usuarioLogin.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
                placeholder='Usuário'
                className='border-b text-black border-gray-200 rounded-xl p-2'
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='senha'></label>
              <input
                type='password'
                id='senha'
                name='senha'
                value={usuarioLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
                placeholder='Password'
                className='border-b text-black border-gray-200 rounded-xl p-2'
              />
            </div>
            <button
              type='submit'
              className='rounded bg-(--ElectricIndigo) flex justify-center hover:bg-(--NeonViolet) text-(-Cream) w-1/2 py-2'
            >
              {isLoading ? (
                <ClipLoader color='#ffffff' size={24} />
              ) : (
                <span>Entrar</span>
              )}
            </button>
            <hr className='border-gray-200 w-full' />
            <p>
              Ainda não tem uma conta?{" "}
              <Link
                to='/cadastro'
                className='text-(--InkBlack) font-extrabold hover:underline'
              >
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
