import Link from "next/link";

const Navegar = () =>{
    return (
        <nav className="justify-center">
            <ul className="flex flex-row gap-10 justify-center">
                <li>
                    <Link href="/authors">Autores</Link>
                </li>
                <li>
                    <Link href="/crear">Crear Autor</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navegar;