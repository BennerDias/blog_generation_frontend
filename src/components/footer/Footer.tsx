import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, type ReactNode } from "react";

function Footer() {
  const { usuario } = useContext(AuthContext);

  const data = new Date().getFullYear();

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className='flex justify-center bg-transparent text-(--Celadon) '>
        <div className='flex w-1/3 text-center justify-center items-center'>
          <p className='text-xl font-bold'>Blog</p>
        </div>
        <div className='w-1/3 flex flex-col items-center py-4'>
          <div className='flex gap-2'>
            <a
              href='https://www.linkedin.com/in/bennerdias/'
              target='_blank'
              className='font-bold hover:bg-(--LightGold) hover:text-black transition-colors duration-300 relative group rounded-lg min-w-contain p-3 text-center '
            >
              <LinkedinLogoIcon size={48} weight='bold' />
            </a>
            <a
              href='https://github.com/BennerDias'
              target='_blank'
              className='font-bold hover:bg-(--LightGold) hover:text-black transition-colors duration-300 relative group rounded-lg min-w-contain p-3 text-center '
            >
              <GithubLogoIcon size={48} weight='bold' />
            </a>
          </div>
        </div>
        <div className='flex w-1/3 text-center justify-center items-center'>
          <p className='text-lg font-bold'>Copyright: {data}</p>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Footer;
