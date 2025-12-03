import { useState } from "react";
import { ClipLoader } from "react-spinners";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}: ModalProps) {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className='fixed inset-0 bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50'>
        <div className='relative z-10 flex flex-col w-96 lg:w-1/3 md:w-1/2 h-1/4 justify-center items-center bg-(--InkBlack)/60 bg-opacity-70 rounded-2xl shadow-2xl p-6 hover:scale-105 transition duration-300 text-(--Cream)'>
          <h2 className='text-xl font-bold mb-2'>{title}</h2>
          <p className='mb-6'>{message}</p>

          <div className='flex justify-center gap-4'>
            <button
              onClick={onConfirm}
              className='flex items-center justify-center w-auto p-3 mt-4 bg-red-500 hover:bg-red-800 rounded-xl font-semibold transition-all duration-300'
            >
              {isLoading ? (
                <ClipLoader color='#fff' size={20} />
              ) : (
                "Sim, deletar"
              )}
            </button>

            <button
              onClick={onClose}
              className='flex items-center justify-center w-auto p-3 mt-4 bg-(--ElectricIndigo) hover:bg-(--Cream) hover:text-[#2c302e] rounded-xl font-semibold transition-all duration-300'
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
