import Link from "next/link";

const Navegar = () =>{
    return (
        <div>
        <nav className="justify-center">
            <ul className="flex flex-row gap-100 justify-center">
                <li>
                    <Link href="/authors" className="bg-red-500 rounded-md p-2">&lt; Autores</Link>
                </li>
                <li>
                    <Link href="/crear" className="bg-red-500 rounded-md p-2">Crear Autor &gt;</Link>
                </li>
            </ul>
        </nav>
        </div>
    );
}

export default Navegar;