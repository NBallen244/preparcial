
import ListaAutores from "./components/listaAutores";

export default function Home() {
  return (
    <div className="justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-10 items-center sm:items-start">
        <ListaAutores />
      </main>
    </div>
  );
}
