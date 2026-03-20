'use client'
import React, { useEffect, useState } from 'react';
import { InputTextDinamic } from "@/Componentes/InputTextDinamic";
import { TextAreaDinamic } from "@/Componentes/TextAreaDinamic";
import { ButtonDinamic } from "@/Componentes/ButtonDinamic";
import ToasterClient from "@/Componentes/ToasterClient";
import toast from 'react-hot-toast';
import { InfoButton } from "@/Componentes/InfoButton";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Convenios() {
    const [id_convenio, setIdConvenio] = useState(null);
    const [titulo_convenio, setTituloConvenio] = useState("");
    const [descripcion_convenio, setDescripcionConvenio] = useState("");
    const [listado, setListado] = useState([]);

    const API = process.env.NEXT_PUBLIC_API_URL;



    //LISTAR TODOS LOS CONVENIOS
    async function listarConvenios() {
        try {
            const res = await fetch(`${API}/convenios/seleccionarTodosConvenios`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors"
            })

            if(!res.ok) return toast.error(`No ha sido posible cargar los convenios. Mala respuesta del servidor, Contacte al equipo de Soporte.`);

            const respuestaData = await res.json();
            if (Array.isArray(respuestaData) && respuestaData.length > 0) {
                setListado(respuestaData);
            }else{
                setListado([]);
            }
        }catch{
            return toast.error(`Problema en el servidor contacte a soporte`)
        }
    }

    useEffect(() => {
        listarConvenios();
    }, [])


    //SELECCIONAR CONVENIO ESPECIFICO
    async function seleccionarConvenios(id_convenio) {
        try {
            if(!id_convenio) return toast.error(`Debe especificar el convenio para que este sea seleccionado`);

            const res = await fetch(`${API}/convenios/seleccionarConvenio`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({id_convenio})
            })

            if(!res.ok) return toast.error(`No se ha podido seleccionar el convenio especifico, mala respuesta del servidor`);

            const respuestaBackendData = await res.json();
            if (Array.isArray(respuestaBackendData) && respuestaBackendData.length > 0) {
                setTituloConvenio(respuestaBackendData[0].titulo_convenio);
                setDescripcionConvenio(respuestaBackendData[0].descripcion_convenio);
                setIdConvenio(respuestaBackendData[0].id_convenio);
                return toast.success(`Convenio seleccionado!`);
            }
        }catch{
            return toast.error(`Problema en el servidor contacte a soporte`)
        }
    }



    //ELIMINAR CONVENIO SELECCIONADO

    async function eliminarConvenios(id_convenio) {
        try {

            if(!id_convenio) return toast.error(`Para eliminar un convenio debe seleccionar al menos un convenio`);
            const res = await fetch(`${API}/convenios/eliminarConvenio`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({id_convenio})
            })

            if(!res.ok) return toast.error(`No se ha podido eliminar el convenio, mala respuesta del servidor`);

            const respuestaBackendJson = await res.json();
            if (respuestaBackendJson.message === true) {
                limpiar();
              await  listarConvenios();
                return toast.success(`Convenio Eliminado con exito!`);
            }

        }catch{
            return toast.error(`Problema en el servidor contacte a soporte`)
        }
    }


    // ACTUALIZAR CONVENIO SELECCIONADO
    async function actualizarConvenios(
        titulo_convenio,
        descripcion_convenio,
        id_convenio
    ) {
        try {
            if(!titulo_convenio||!descripcion_convenio||!id_convenio){
                return toast.error("Debe llenar todos los campos.")
            }

            const res = await fetch(`${API}/convenios/actualizarConvenio`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    titulo_convenio,
                    descripcion_convenio,
                    id_convenio
                })
            })

            if(!res.ok) return toast.error(`No se ha podido actualizar de manera correcta los datos del convenio, mala respuesta del servidor.`)

            const respuestaBackendJson = await res.json();
            if(respuestaBackendJson.message === true) {

                limpiar();
                await listarConvenios();
                return toast.success(`Se han actualizado con exito los datos del convenio`);
            }
        }catch{
            return toast.error(`Problema en el servidor contacte a soporte`)
        }
    }


    function limpiar() {
        setTituloConvenio("");
        setDescripcionConvenio("");
        setIdConvenio(null);
    }







    // INSERTAR NUEVO CONVENIO
    async function insertarNuevo(
        titulo_convenio,
        descripcion_convenio,
    ) {
        try {
            if(!titulo_convenio||!descripcion_convenio){
                return toast.error("Debe llenar todos los campos.")
            }

            const res = await fetch(`${API}/convenios/insertarConvenio`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    titulo_convenio,
                    descripcion_convenio,
                })
            })

            if(!res.ok) return toast.error(`No se ha podido insertar de manera correcta los datos del convenio, mala respuesta del servidor.`)

            const respuestaBackendJson = await res.json();
            if(respuestaBackendJson.message === true) {

                limpiar();
                await listarConvenios();
                return toast.success(`Se ingresado con exito el nuevo convenio`);
            }
        }catch{
            return toast.error(`Problema en el servidor contacte a soporte`)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <ToasterClient />

            <div className="mx-auto w-full max-w-6xl px-6 py-10">

                {/* Header */}
                <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                Convenios
                            </h1>
                            <p className="text-sm text-slate-500">
                                Gestione los convenios disponibles en la clínica, incluyendo título y descripción.
                            </p>
                        </div>
                        <InfoButton informacion={'En esta sección podrá crear y administrar los convenios de la clínica.\n\nCada convenio permite definir un título y una descripción.\n\nPara crear un nuevo convenio, complete los campos del formulario y presione "Guardar". Para modificar uno existente, selecciónelo desde el listado inferior, realice los cambios y presione "Actualizar".\n'} />
                    </div>
                </div>

                {/* Formulario */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6">

                        <div className="space-y-1">
                            <h2 className="text-base font-semibold text-slate-900">
                                Ingreso y edición
                                <span className="ml-2 text-blue-700">(Convenio)</span>
                            </h2>
                            <p className="text-sm text-slate-500">
                                Complete los campos para registrar o actualizar un convenio.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5">

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Título del convenio</label>
                                <InputTextDinamic
                                    value={titulo_convenio}
                                    onChange={(e) => setTituloConvenio(e.target.value)}
                                    placeholder="Ej: Convenio Fonasa, Isapre Colmena"
                                    className="w-full"
                                />
                                <p className="text-xs text-slate-400">Nombre identificador del convenio.</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Descripción del convenio</label>
                                <TextAreaDinamic
                                    value={descripcion_convenio}
                                    onChange={(e) => setDescripcionConvenio(e.target.value)}
                                    placeholder="Ej: Convenio con Fonasa para atenciones de especialidad"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                            <ButtonDinamic
                            onClick={() => insertarNuevo(
                                titulo_convenio,
                                descripcion_convenio,
                            )}
                            >
                                Guardar Convenio
                            </ButtonDinamic>

                            <ButtonDinamic
                                onClick={()=> actualizarConvenios(
                                    titulo_convenio,
                                    descripcion_convenio,
                                    id_convenio
                                )}
                                className="bg-blue-700 hover:bg-blue-600"
                            >
                                Actualizar Convenio
                            </ButtonDinamic>

                            <ButtonDinamic
                                onClick={()=> eliminarConvenios(id_convenio)}
                                className="bg-red-600 hover:bg-red-500"
                            >
                                Eliminar Convenio
                            </ButtonDinamic>

                            <ButtonDinamic
                                onClick={()=> limpiar()}
                                className="bg-slate-500 hover:bg-slate-400 w-full sm:w-auto"
                            >
                                Limpiar
                            </ButtonDinamic>
                        </div>
                    </div>
                </div>

                {/* Listado */}
                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div className="space-y-1">
                            <h2 className="text-base font-semibold text-slate-900">Listado de convenios</h2>
                            <p className="text-sm text-slate-500">Seleccione un registro de la tabla para editar o eliminar.</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {listado.length} {listado.length === 1 ? 'registro' : 'registros'}
                        </span>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 hover:bg-slate-50">
                                    <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Título</TableHead>
                                    <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Descripción</TableHead>
                                    <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center w-[100px]">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {listado.length > 0 ? (
                                    listado.map((item) => (
                                        <TableRow
                                            key={item.id_convenio}
                                            className={`transition-colors cursor-pointer ${id_convenio === item.id_convenio ? 'bg-blue-50/60' : 'hover:bg-slate-50/60'}`}
                                        >
                                            <TableCell className="text-sm font-medium text-slate-800">{item.titulo_convenio}</TableCell>
                                            <TableCell className="text-sm text-slate-500 max-w-[350px] truncate">{item.descripcion_convenio || '—'}</TableCell>
                                            <TableCell className="text-center">
                                                <button
                                                    onClick={()=> seleccionarConvenios(item.id_convenio)}
                                                    className="inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700 transition-colors"
                                                >
                                                    Seleccionar
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2 text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                </svg>
                                                <p className="text-sm">No hay convenios registrados.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </div>
        </div>
    );
}
