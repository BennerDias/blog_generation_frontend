import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, type ReactNode } from "react";

function Footer() {
  const data = new Date().getFullYear();

  const {usuario} = useContext(AuthContext);

  let component: ReactNode;

  if(usuario.token !== "") {
    component = (
      <footer className="flex justify-end bg-(--mustard) text-white border-t border-white/10 backdrop-blur-sm py-4 px-8 bottom-0 left-0 right-0 z-50 ">
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-(--celadon) rounded-full flex items-center justify-center">
            <img src="https://i.imgur.com/CoQV1E3.png" alt="VeloFit" className="w-8 h-8"/>
          </div>
          <span className="text-2xl font-bold">Dev Blog</span>
        </div>

        <div className="flex items-center gap-4 text-white/80">
          <a
            href="https://github.com/Grupo2-JS09"
            target="_blank"
            className="hover:text-(--blood) transition"
          >
            <LinkedinLogoIcon size={28} weight="fill" />
          </a>
          <a
            href="https://github.com/Grupo2-JS09"
            target="_blank"
            className="hover:text-(--blood) transition"
          >
            <GithubLogoIcon size={28} weight="fill" />
          </a>
          <a
            href="https://github.com/Grupo2-JS09"
            target="_blank"
            className="hover:text-(--blood) transition"
          >
            <InstagramLogoIcon size={28} weight="fill" />
          </a>
        </div>

        <div className="text-sm text-white/70 text-center md:text-right">
          <p> &copy; {data} VeloFit — Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
    )
  }
  return (
    <>
    {component}
    </>
  );
}

export default Footer;
