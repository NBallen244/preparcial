"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export interface Autor {
    id?:number;
    birthDate:Date;
    name:string;
    description:string;
    image:string;
};

const ListaAutores= ()=> {
    const [autores, setAutores]=useState<Autor[]>([])
    useEffect(()=>{
        fetch('http://127.0.0.1:8080/api/authors').then(res=>res.json()).then(data=>setAutores(data));
    },[]);
    return (
        <div className="justify-items-center">
        <h1 className="text-5xl font-bold mb-4 justify-center py-25"><strong>Lista de Autores</strong></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {autores.length === 0 ? <p>No hay autores disponibles.</p>: autores.map((autor)=>(<div key={autor.id} className="border border-red-500 p-4">
                <Image src={autor.image} alt={autor.name} width={200} height={300} className="w-full h-48 object-cover mb-2 object-contain"/>
                <h2 className="text-lg font-bold">{autor.name}</h2>
                <p className="text-sm">{autor.description}</p>
            </div>))}
        </div>
        </div>
    );
};

export default ListaAutores;
