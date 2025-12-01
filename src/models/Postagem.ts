import type Tema from "./Tema";
import type Usuario from "./Usuario";

export default interface Postagem {
  id: number;
  titulo: string;
  texto: string;
  data: string;
  foto_postagem: string;
  tema: Tema | null;
  usuario: Usuario | null;
}
