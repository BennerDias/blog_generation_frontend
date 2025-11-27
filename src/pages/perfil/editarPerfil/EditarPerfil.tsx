import { useState } from "react";

export default function EditarPerfil({ usuario }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    nome: usuario.nome,
    foto: usuario.foto
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <div className="flex min-h-180">
        <div className='relative w-[300px] h-[420px] rounded-2xl overflow-hidden shadow-xl m-auto bg-gray-200'>
          <img
            src={usuario.foto}
            className='absolute inset-0 w-full h-full object-cover'
          />
          <div className='absolute inset-0 from-black/50 via-black/0'></div>

          <div className='relative flex flex-col items-center justify-start h-full p-4 text-white'>
            <h2 className='text-xl font-semibold mt-4 drop-shadow'>
              {usuario.nome}
            </h2>

            <p className='flex items-center gap-1 text-sm opacity-90'>
              <span className='animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full'></span>
              Conectando...
            </p>

            <div className='flex flex-col items-center justify-end gap-3 absolute bottom-4 left-0 right-0 px-4'>
              <div
                onClick={() => setIsOpen(true)}
                className='flex items-center gap-3 bg-white/80 text-black rounded-xl px-4 py-2 backdrop-blur-md cursor-pointer active:scale-95'
              >
                <img src={usuario.foto} className='w-8 h-8 rounded-full' />
                <button className='font-medium text-sm'>Editar perfil</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="relative w-[300px] h-[420px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200 scale-95 animate-[fadeIn_0.2s_ease-out]">

            <img
              src={form.foto}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative flex flex-col h-full p-4 text-white">

              <input
                className="bg-white/80 text-black rounded-lg px-3 py-2 mb-3 backdrop-blur-sm"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome"
              />

              <input
                className="bg-white/80 text-black rounded-lg px-3 py-2 backdrop-blur-sm"
                name="foto"
                value={form.foto}
                onChange={handleChange}
                placeholder="URL da foto"
              />

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-xl font-semibold active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    console.log("salvar =>", form);
                    setIsOpen(false);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold active:scale-95"
                >
                  Salvar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
