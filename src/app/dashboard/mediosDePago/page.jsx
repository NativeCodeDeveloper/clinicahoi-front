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

export default function MediosDePago() {
    const [mediosDePago_id, setMediosDePagoId] = useState(null);
    const [titulo_mediosDePago, setTituloMediosDePago] = useState("");
    const [descripcion_mediosDePago, setDescripcionMediosDePago] = useState("");
    const [listado, setListado] = useState([]);

    const API = process.env.NEXT_PUBLIC_API_URL;

    async function listarMediosDePago() {
        try {
            const res = await fetch(`${API}/mediosDePago/seleccionarTodosMediosDePago`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
            })

            if (!res.ok) {
                return toast.error(`No se ha podido cargar la informacion, mala respuesta del servidor`)
            }

            const respuestaData = await res.json();
            setListado(respuestaData)

        }catch(error) {
            return toast.error(`Sin respuesta del servidor contacte a soporte`);
        }
    }

    useEffect(() => {
listarMediosDePago();
    },[])


    async function eliminarMediosDePago(mediosDePago_id) {
        try {
            if(!mediosDePago_id) return toast.error(`Sin respuesta del servidor contacte a soporte`);
            const res = await fetch(`${API}/mediosDePago/eliminarMediosDePago`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify({mediosDePago_id})
            })
            if (!res.ok) {
                return toast.error(`Sin respuesta del servidor contacte a soporte`);
            }
            const respuestaBackend = await res.json();
            if(respuestaBackend.message === true){
                await limpiar();
                return toast.success(`Medio de pago eliminado!`)
            }else{
                return toast.error(`Sin respuesta del servidor contacte a soporte`);
            }
        }catch(error) {
            return toast.error(`Sin respuesta del servidor contacte a soporte`);
        }
    }



    async function actualizarMediosDePago(
        titulo_mediosDePago,
        descripcion_mediosDePago,
        mediosDePago_id
    ) {
        try {
            if(!titulo_mediosDePago || !descripcion_mediosDePago || !mediosDePago_id)   return toast.error(`Sin respuesta del servidor contacte a soporte`);

            const res = await fetch(`${API}/mediosDePago/actualizarMediosDePago`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    titulo_mediosDePago,
                    descripcion_mediosDePago,
                    mediosDePago_id
                })
            })
            if (!res.ok) {
                return toast.error(`Sin respuesta del servidor contacte a soporte`);
            }

            const respuestaBackend = await res.json();
            if (respuestaBackend.message === true) {
               await limpiar();
                return toast.success(`Actualizado correctamente!`);
            }else{
                return toast.error(`Sin respuesta del servidor contacte a soporte`);
            }
        }catch(error) {
            return toast.error(`Sin respuesta del servidor contacte a soporte`);
        }
    }


    async function seleccionarMediosDePago(
        mediosDePago_id
    ) {
        try {

            if(!mediosDePago_id){
                return toast.error(`Para poder seleccionar un medio de pago, debe seleccionar sobre un medio de pago valido`);
            }

            const res = await fetch(`${API}/mediosDePago/seleccionarMediosDePago`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    mediosDePago_id
                })
            })
            if (!res.ok) {
                return toast.error(`Sin respuesta del servidor contacte a soporte. (Mala respuesta del servidor)`);
            }

            const respuestaDataBackend = await res.json();
            if (Array.isArray(respuestaDataBackend) && respuestaDataBackend.length > 0) {
                setTituloMediosDePago(respuestaDataBackend[0].titulo_mediosDePago);
                setDescripcionMediosDePago(respuestaDataBackend[0].descripcion_mediosDePago);
                setMediosDePagoId(respuestaDataBackend[0].mediosDePago_id)
                return toast.success(`Medio de Pago Seleccionado!`);
            }

        }catch(error) {
            return toast.error(`Sin respuesta del servidor contacte a soporte`);
        }
    }


   async function limpiar() {
        await listarMediosDePago();
        setTituloMediosDePago("");
        setDescripcionMediosDePago("");
        setMediosDePagoId(null)
    }





    async function insertarMediosDePago(
        titulo_mediosDePago,
        descripcion_mediosDePago
    ) {
        try {
            if(!titulo_mediosDePago || !descripcion_mediosDePago){
                return toast.error(`Debe completar todos los campos para insertar un nuevo medio de pago.`);
            }
            const res = await fetch(`${API}/mediosDePago/insertarMediosDePago`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    titulo_mediosDePago,
                    descripcion_mediosDePago
                })
            })
            if (!res.ok) {
                return toast.error(`Sin respuesta del servidor contacte a soporte`);
            }
            const respuestaBackend = await res.json();

            if(respuestaBackend.message === true){
                await limpiar();
                return toast.success(`Se ha ingresado el medio de pago al sistema`);
            }else{
                return toast.error(`Sin respuesta del servidor contacte a soporte`);
            }

        }catch(error) {
            return toast.error(`Sin respuesta del servidor contacte a soporte`);
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
                                Medios de Pago
                            </h1>
                            <p className="text-sm text-slate-500">
                                Gestione los medios de pago disponibles en la clínica, incluyendo título y descripción.
                            </p>
                        </div>
                        <InfoButton informacion={'En esta sección podrá crear y administrar los medios de pago de la clínica.\n\nCada medio de pago permite definir un título y una descripción.\n\nPara crear un nuevo medio de pago, complete los campos del formulario y presione "Guardar". Para modificar uno existente, selecciónelo desde el listado inferior, realice los cambios y presione "Actualizar".\n'} />
                    </div>
                </div>

                {/* Formulario */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6">

                        <div className="space-y-1">
                            <h2 className="text-base font-semibold text-slate-900">
                                Ingreso y edición
                                <span className="ml-2 text-blue-700">(Medio de Pago)</span>
                            </h2>
                            <p className="text-sm text-slate-500">
                                Complete los campos para registrar o actualizar un medio de pago.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5">

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Título del medio de pago</label>
                                <InputTextDinamic
                                    value={titulo_mediosDePago}
                                    onChange={(e) => setTituloMediosDePago(e.target.value)}
                                    placeholder="Ej: Efectivo, Transferencia, Tarjeta de crédito"
                                    className="w-full"
                                />
                                <p className="text-xs text-slate-400">Nombre identificador del medio de pago.</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Descripción del medio de pago</label>
                                <TextAreaDinamic
                                    value={descripcion_mediosDePago}
                                    onChange={(e) => setDescripcionMediosDePago(e.target.value)}
                                    placeholder="Ej: Pago en efectivo en caja de la clínica"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                            <ButtonDinamic
                            onClick={()=>insertarMediosDePago(
                                titulo_mediosDePago,
                                descripcion_mediosDePago)
                            }>
                                Ingresar Medio de Pago
                            </ButtonDinamic>

                            <ButtonDinamic
                                onClick={()=> actualizarMediosDePago(
                                    titulo_mediosDePago,
                                    descripcion_mediosDePago,
                                    mediosDePago_id
                                )}
                                className="bg-blue-700 hover:bg-blue-600"
                            >
                                Actualizar Medio de Pago
                            </ButtonDinamic>

                            <ButtonDinamic
                                onClick={()=> eliminarMediosDePago(mediosDePago_id)}
                                className="bg-red-600 hover:bg-red-500"
                            >
                                Eliminar Medio de Pago
                            </ButtonDinamic>

                            <ButtonDinamic
                                onClick={()=>limpiar()}
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
                            <h2 className="text-base font-semibold text-slate-900">Listado de medios de pago</h2>
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
                                            key={item.mediosDePago_id}
                                            className={`transition-colors cursor-pointer ${mediosDePago_id === item.mediosDePago_id ? 'bg-blue-50/60' : 'hover:bg-slate-50/60'}`}
                                        >
                                            <TableCell className="text-sm font-medium text-slate-800">{item.titulo_mediosDePago}</TableCell>
                                            <TableCell className="text-sm text-slate-500 max-w-[350px] truncate">{item.descripcion_mediosDePago || '—'}</TableCell>
                                            <TableCell className="text-center">
                                                <button
                                                    onClick={()=> seleccionarMediosDePago(
                                                        item.mediosDePago_id)
                                                    }
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
                                                <p className="text-sm">No hay medios de pago registrados.</p>
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
