import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ListaPostagens from "../../components/postagem/listaPostagens/ListaPostagens";

function Home() {
  const { usuario } = useContext(AuthContext);
  
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col  text-white">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold">
              Dev Blog
            </h2>
            <p className="text-md">
              Olá, {usuario.nome}, expresse aqui seus pensamentos!
            </p>
          </div>
        </div>
      </div>
          <ListaPostagens/>
    </>
  );
}

export default Home;
