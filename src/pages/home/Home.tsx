import { NotePencil } from "@phosphor-icons/react";
import ListaPostagens from "../../components/postagem/listaPostagens/ListaPostagens";

function Home() {
  return (
    <>
      <div className="bg-black text-(--Celadon) flex flex-col justify-center">
        
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold">
              Bem-vindo ao Blog
            </h2>

            <p className="text-xl">
              Descubra artigos incríveis sobre tecnologia, design e muito mais
            </p>

            <div className="flex justify-around gap-4">
              <button className="rounded-lg bg-(--CanaryYellow) flex justify-center items-center gap-4 hover:bg-yellow-400 text-black w-full py-2 px-10">
                <NotePencil size={20} />
                 Criar Postagem</button>
            </div>
          </div>

          <ListaPostagens/>
        </div>
    </>
  );
}

export default Home;
