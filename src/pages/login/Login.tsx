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
      <div className="flex h-screen place-items-center justify-center font-bold 
      bg-[url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHgxMTQwOTQ1LWltYWdlLWt3eXI0NGZzLWt3eXRhaGRtLmpwZw.jpg')]
      bg-cover bg-center">
        <div className="flex items-center justify-center bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.08)] py-8 w-1/3 rounded-2xl">
          <form
            className='flex justify-center items-center flex-col gap-4'
            onSubmit={login}
          >
            <h2 className='text-slate-900 text-5xl font-light lowercase'>Welcome back!</h2>
            <div className='flex flex-col w-full'>
              <label htmlFor='usuario'>Usuário</label>
              <input
                type='text'
                id='usuario'
                name='usuario'
                value={usuarioLogin.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
                placeholder='Usuário'
                className='border-2 border-slate-700 rounded p-2'
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='senha'>Senha</label>
              <input
                type='password'
                id='senha'
                name='senha'
                value={usuarioLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
                placeholder='Senha'
                className='border-2 border-slate-700 rounded p-2'
              />
            </div>
            <button
              type='submit'
              className='rounded bg-indigo-400 flex justify-center hover:bg-indigo-900 text-white w-1/2 py-2'
            >
              {isLoading ? (
                <ClipLoader color='#ffffff' size={24} />
              ) : (
                <span>Entrar</span>
              )}
            </button>
            <hr className='border-slate-800 w-full' />
            <p>
              Ainda não tem uma conta?{" "}
              <Link to='/cadastro' className='text-indigo-800 hover:underline'>
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
