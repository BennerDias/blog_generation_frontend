import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, type ReactNode } from "react";

function Footer() {
  const {usuario} = useContext(AuthContext)
  
  const data = new Date().getFullYear();

  let component: ReactNode;

  if(usuario.token !== ''){
    component = (
      <div className='flex justify-center bg-indigo-900 text-white'>
        <div className='container flex flex-col items-center py-4'>
          <p className='text-xl font-bold'>
            Blog Pessoal Generation | Copyright: {data}
          </p>

          <p className='text-lg'>Acesse nossas redes sociais</p>

          <div className='flex gap-2'>
            <a href='https://www.linkedin.com/in/bennerdias/' target='_blank'>
              <LinkedinLogoIcon size={48} weight='bold' />
            </a>
            <a href='https://github.com/BennerDias' target='_blank'>
              <GithubLogoIcon size={48} weight='bold' />
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {component}
    </>
  );
}

export default Footer;
