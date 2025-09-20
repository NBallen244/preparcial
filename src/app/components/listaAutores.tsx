"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import FormEdicion from "./formEdicion";

export interface Autor {
    id?:number;
    birthDate:Date;
    name:string;
    description:string;
    image:string;
};

const ListaAutores= ()=> {
    const [autores, setAutores]=useState<Autor[]>([]);
    const [editar, setEditar]=useState<boolean>(false);
    const [autorEdit, setAutorEdit]=useState<number>(0);
    useEffect(()=>{
        fetch('http://127.0.0.1:8080/api/authors').then(res=>res.json()).then(data=>setAutores(data)).then(()=>
        setAutorEdit(autores[0].id!));
    },[]);

    const eliminarAutor = async (id:number) => {
        const eliminar=confirm(`¿Está seguro que desea eliminar este autor con el id ${id}?`);
        if (!eliminar) return;
        const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            setAutores(autores.filter(autor => autor.id !== id));
            alert("Autor eliminado con éxito. Revisa los autores nuevamente");
        }
        else {
            alert("Error al eliminar el autor. Revisa los autores nuevamente");
        }
    };

    const editarAutor = (id:number) => {
        setEditar(true);
        setAutorEdit(id);
    }
    
    return (
        <div className="justify-items-center">
        <h1 className="text-5xl font-bold mb-4"><strong>Lista de Autores</strong></h1>
        {editar && <dialog open={editar} className="grid grid-cols-1 bg-black border border-red-500 border-5 fixed z-50 w-3/4 h-3/4 justify-self-center overflow-y-auto">
                <FormEdicion id={autorEdit}></FormEdicion>
                <div className="flex justify-center p-10">
                <button onClick={()=>setEditar(false)} className="bg-white text-red-500 rounded-md p-2 hover:bg-gray-300 w-3/4">Cancelar</button>
                </div>
        </dialog>}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {autores.length === 0 ? <p>No hay autores disponibles.</p>: autores.map((autor)=>(<div key={autor.id} className="border border-red-500 p-4">
                <Image src={autor.image} alt={autor.name} width={200} height={300} className="w-full h-48 object-cover mb-2 object-contain"/>
                <h2 className="text-lg font-bold">{autor.id}. {autor.name}</h2>
                <p className="text-sm">Nacido en {new Date(autor.birthDate).toLocaleDateString()}</p>
                <p className="text-sm">{(autor.description)}</p>
                <div className="flex flex-col justify-center gap-5">
                    <button onClick={()=>eliminarAutor(autor.id!)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2">Eliminar Autor</button>
                    <button onClick={()=>editarAutor(autor.id!)} className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-300 mt-2">Editar Autor</button>
                </div>
            </div>))}
        </div>
        </div>
    );
};

export default ListaAutores;
