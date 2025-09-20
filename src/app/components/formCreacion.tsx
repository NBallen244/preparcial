"use client";
import { useState } from "react";
import { Autor } from "./listaAutores";
import { useRouter } from "next/navigation";

const FormCreacion = () => {
    const [form, setForm] = useState<Autor>({
        birthDate:new Date(),
        name:"",
        description:"",
        image:""
    });
    const router=useRouter();
    const [errores, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name){
            case "birthDate":
                setForm({
                    ...form,
                    [name]: new Date(value)
                });
                return;
            default:
                setForm({
                ...form,
                [name]: value
                });
        }
    };

    const validate = (e:React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value}=e.target;
        switch (name){
            case "birthDate":
                return new Date() > new Date(value) ? "":"La fecha de nacimiento ubicada a futuro";
            case "name":
                return value.length!==0 ? "":"El nombre es obligatorio";
            case "description":
                return value.length!==0 ? "":"La descripción es obligatoria"
            case "image":
                return validateUrl(value) ? "":"Por favor incluir imagen para el perfil"
            default:
                return ""
        }
    }

    const validateUrl = (url:string) => {
        try {
            const parsed = new URL(url);
            return true;
        }
        catch (error){
            return false;
        }
    };

    const handleBlur = (e:React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name}=e.target;
        const error=validate(e);
        setErrors({
            ...errores,
            [name]:error
        });
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(JSON.stringify(form))
        const envio=await fetch("http://127.0.0.1:8080/api/authors", {
            method:'POST',
            headers: {
            'Content-Type': 'application/json'},
            body:JSON.stringify(form)
        });
        const res=await envio.ok;
        if (res) {
            alert(`Autor ${form.name}`+" creado con éxito");
            router.push("/authors");
        }
        else {
            alert("Error al crear autor. Por favor revisa los datos")
        }
        
    };
    const formatDate = (date:Date)=>{
        const options2 = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate2 = new Intl.DateTimeFormat('en-CA', options2).format(date);
        return formattedDate2;
    }

    return (
        <div className="border border-red-500 border-5 w-screen h-screen bg-black items-center flex flex-col">
            <h1 className="text-5xl p-5 font-bold">Formulario de Creación de Autores</h1>
            <form className="w-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                <div className="flex flex-col w-3/4">
                    <label htmlFor="name">Nombre</label>
                    <input 
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nombre"
                    value={form.name}
                    className="bg-white text-gray-900 rounded-md p-2"
                    required>
                    </input>
                    {errores.name && <p className="text-red-500">{errores.name}</p>}
                </div>
                <div className="flex flex-col w-3/4">
                    <label htmlFor="birthDate">Fecha de nacimiento</label>
                    <input 
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formatDate(form.birthDate)}
                    className="bg-white text-gray-900 rounded-md p-2"
                    required>
                    </input>
                    {errores.birthDate && <p className="text-red-500">{errores.birthDate}</p>}
                </div>
                <div className="flex flex-col w-3/4 h-full">
                    <label htmlFor="description">Descripción</label>
                    <textarea 
                    id="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    placeholder="Descripción"
                    value={form.description}
                    className="bg-white text-gray-900 rounded-md p-2"
                    required/>
                    {errores.description && <p className="text-red-500">{errores.description}</p>}
                </div>
                <div className="flex flex-col w-3/4">
                    <label htmlFor="image">URL Imagen</label>
                    <input 
                    id="image"
                    name="image"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="URL imagen"
                    value={form.image}
                    className="bg-white text-gray-900 rounded-md p-2"
                    required>
                    </input>
                    {errores.image && <p className="text-red-500">{errores.image}</p>}
                </div>
                <div className="flex flex-col w-3/4 p-2">
                    <button 
                    id="enviar"
                    name="enviar"
                    type="submit"
                    className="bg-red-500 text-white rounded-md p-2 hover:bg-red-800"
                    >Enviar
                    </button>
                </div>
            </form>
        </div>

    );
};

export default FormCreacion;