import { NotePencil } from "@phosphor-icons/react";
import TextType from "../../components/animated/gsap/Gsap";
import CardPostagem from "../../components/postagem/cardPostagem/CardPostagem";
import { useContext, useEffect, useState } from "react";
import type Postagem from "../../models/Postagem";
import { buscar } from "../../services/Service";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

function Home() {
  const navigate = useNavigate();
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);

  const token = usuario.token;
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

  function navegar() {
    navigate("/postagens");
  }

  return (
    <>
      <div className='bg-transparent text-(--Cream) flex flex-col justify-center'>
        <div className='flex flex-col gap-4 items-center justify-center p-10'>
          <TextType
            text={[
              "Bem-vindo ao seu boteco de Tecnologia",
              "Descubra artigos incríveis sobre tecnologia",
              "Happy coding!"
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter='|'
            className='text-7xl'
          />

          <p className='text-xl'>
            Bem vindo ao nosso boteco de tecnologia! Aqui compartilhamos
            experiências e novidades da área tech, sinta se a vontade.
          </p>

          <div className='flex justify-around gap-4'>
            <Link to='/Novapostagem'>
              <button className='rounded-lg bg-(--ElectricIndigo) flex justify-center items-center gap-4 hover:bg-(--NeonViolet) text-(--Cream) w-full py-2 px-10'>
                <NotePencil size={20} />
                Criar Postagem
              </button>
            </Link>
          </div>
        </div>

        {isLoading && (
          <div className='flex justify-center w-full my-8'>
            <SyncLoader color='#312e81' size={32} />
          </div>
        )}

        <div className='flex gap-8 px-5'>
          {postagens
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((postagem) => (
              <CardPostagem
                key={postagem.id}
                postagem={postagem}
                onDeleteClick={() => navegar()}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
