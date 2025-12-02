import { Link, useNavigate } from "react-router-dom";
import CardTema from "../cardTema/CardTema";
import { SyncLoader } from "react-spinners";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import { NotePencil } from "@phosphor-icons/react";

function ListaTemas() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [temas, setTemas] = useState<Tema[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [temas.length]);

  async function buscarTemas() {
    try {
      setIsLoading(true);

      await buscar("/temas", setTemas, {
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
  return (
    <>
      {isLoading && <SyncLoader color='#312e81' size={32} />}
      <div className='flex flex-col items-center justify-center w-full h-auto my-4'>
        
        <div className='flex flex-col'>
          <div className="flex w-full justify-end items-end my-10">
          <Link to='/novotema'>
              <button className='rounded-lg bg-(--ElectricIndigo) flex justify-between items-center gap-4 hover:bg-(--NeonViolet) text-(--Cream) w-full py-2 px-10'>
                <NotePencil size={20} />
                Novo Tema
              </button>
            </Link>
        </div>
          {!isLoading && temas.length === 0 && (
            <span className='text-3xl text-center my-8'>
              Nenhum Tema foi encontrado!
            </span>
          )}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaTemas;
