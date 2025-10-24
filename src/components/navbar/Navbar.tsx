function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
        <div className="container flex justify-between mx-8 text-2xl font-bold">
          Blog Pessoal

          <div className="flex gap-4">
            <span className="hover:text-gray-300 cursor-pointer">Postagens</span>
            <span>Temas</span>
            <span>Cadastrar tema</span>
            <span>Perfil</span>
            <span>Sair</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
