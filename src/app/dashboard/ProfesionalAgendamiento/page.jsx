'use client'
import React, { useEffect, useState } from 'react';
import { InputTextDinamic } from "@/Componentes/InputTextDinamic";
import { TextAreaDinamic } from "@/Componentes/TextAreaDinamic";
import { ButtonDinamic } from "@/Componentes/ButtonDinamic";
import { SelectDinamic } from "@/Componentes/SelectDinamic";
import ToasterClient from "@/Componentes/ToasterClient";
import toast from 'react-hot-toast';
import { InfoButton } from "@/Componentes/InfoButton";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



export default function ProfesionalAgendamiento() {
const [profesionalAgendaAsignacion_id, setProfesionalAgendaAsignacionId] = useState(null);
const [titulo_profesionalAgendaAsignacion, setTituloProfesionalAgendaAsignacion] = useState("");
const [descripcion_profesionalAgendaAsignacion, setDescripcionProfesionalAgendaAsignacion] = useState("");
const [porcentaje_remuneracion, setPorcentajeRemuneracion] = useState("");

const [agenda_id, setAgendaId] = useState("");

const [listado, setListado] = useState([]);
const [listadoAgendas, setListadoAgendas] = useState([]);


    const API = process.env.NEXT_PUBLIC_API_URL;


    async function listarProfesionales() {
        try {
            const res = await fetch(`${API}/profesionalAgendaAsignacion/seleccionarTodasProfesionalAgendaAsignacion`, {
                method: "GET",
                headers: {Accept: "application/json",
                "Content-Type" : "application/json"},
                mode: "cors",
            })
            if(!res.ok) {
                return toast.error(`No se pueden cargar profesionales. Contacte a soporte informatico`);
            }
            const data = await res.json();
            if(Array.isArray(data) && data.length > 0) {
                setListado(data);
            }else {
                setListado([]);
            }
        }catch(error) {
            return toast.error(`No se pueden cargar profesionales. Contacte a soporte informatico`);
        }
    }

    useEffect(() => {
        listarProfesionales();
    },[])


    async function listarAgendasDisponibles() {
        try {

            const res = await fetch(`${API}/profesionales/seleccionarTodosProfesionales`, {
                method: "GET",
                headers: {Accept: "application/json",
                "Content-Type" : "application/json"},
                mode: "cors",
            })

            if(!res.ok) {
                return toast.error(`No se pueden cargar profesionales.`);
            }else {
                const dataAgendas = await res.json();
                setListadoAgendas(dataAgendas);
            }
        }catch(error) {
            return toast.error(`No se pueden cargar profesionales. Contacte a soporte informatico`);
        }
    }

    useEffect(() => {
        listarAgendasDisponibles();
    },[])



    async function insertarProfesionalesAgendaAsignacion(
        titulo_profesionalAgendaAsignacion,
        descripcion_profesionalAgendaAsignacion,
        porcentaje_remuneracion,
        profesional_id
    ) {
try {
    if(!titulo_profesionalAgendaAsignacion||!descripcion_profesionalAgendaAsignacion||porcentaje_remuneracion === ""|| porcentaje_remuneracion === null||!profesional_id ){
        return toast.error(`Debe llenar todos los campos para insertar un nuevo profesional`);
    }

    const res = await  fetch(`${API}/profesionalAgendaAsignacion/insertarProfesionalAgendaAsignacion`, {
        method: "POST",
        headers: {Accept: "application/json",
            "Content-Type" : "application/json"},
        mode: "cors",
        body: JSON.stringify({
            titulo_profesionalAgendaAsignacion,
            descripcion_profesionalAgendaAsignacion,
            porcentaje_remuneracion,
            profesional_id
        })
    })

    if(!res.ok) {
        return toast.error(`Hubo un problema al insertar un nuevo profesional, Contacte a soporte informatico`);
    }else{
        const respuestaBackend = await res.json();
        if(respuestaBackend.message === true){
            await listarProfesionales();
            limpiar();
            return toast.success(`Se ha ingresado nuevo profesional con exito`)
        }
    }
}catch(error) {
    return toast.error(`Hubo un problema al insertar un nuevo profesional, Contacte a soporte informatico`);

}
    }


    function limpiar() {
        setAgendaId("");
        setTituloProfesionalAgendaAsignacion("");
        setDescripcionProfesionalAgendaAsignacion("");
        setPorcentajeRemuneracion("");
        setProfesionalAgendaAsignacionId(null);
    }


    async function seleccionarProfesional(profesionalAgendaAsignacion_id){
        try {

            if(!profesionalAgendaAsignacion_id) return toast.error("No se pueden seleccionar al profesional , intente mas tarde");

            const res = await fetch(`${API}/profesionalAgendaAsignacion/seleccionarProfesionalAgendaAsignacion`,{
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type" : "application/json"},
                mode: "cors",
                body: JSON.stringify({profesionalAgendaAsignacion_id})
            })

            if(!res.ok) {
                return toast.error("No se pueden seleccionar al profesional ,(NO HAY RESPUESTA DEL SERVIDOR)");

            }else {
                const respuestaBackendData = await res.json();
                if(Array.isArray(respuestaBackendData) ){
                    setTituloProfesionalAgendaAsignacion(respuestaBackendData[0].titulo_profesionalAgendaAsignacion);
                    setDescripcionProfesionalAgendaAsignacion(respuestaBackendData[0].descripcion_profesionalAgendaAsignacion);
                    setPorcentajeRemuneracion(respuestaBackendData[0].porcentaje_remuneracion);
                    setAgendaId(respuestaBackendData[0].profesional_id);
                    setProfesionalAgendaAsignacionId(respuestaBackendData[0].profesionalAgendaAsignacion_id);
                    return toast.success(`Profesional seleccionado para edicion`)
                }else{
                    return toast.error(`Hubo un problema con la informacion del servidor, contacte a soporte`);
                }
            }

        }catch(error) {
            return toast.error(`Hubo un problema en el servidor, Contacte a soporte informatico`);
        }
    }


    async function eliminar(profesionalAgendaAsignacion_id){
        try {

            if(!profesionalAgendaAsignacion_id) return  toast.error(`Debe seleccionar a lo menos un elemento para eliminar.`);

            const res = await fetch(`${API}/profesionalAgendaAsignacion/eliminarProfesionalAgendaAsignacion`, {
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type" : "application/json"},
                mode: "cors",
                body: JSON.stringify({profesionalAgendaAsignacion_id})
            })

            if(!res.ok) return  toast.error(`Debe seleccionar a lo menos un elemento para eliminar. (RESPUESTA NO VALIDA)`);

            const respuestaBackend = await res.json();

            if(respuestaBackend.message === true){
                await listarProfesionales();
                limpiar();
                return toast.success(`Profesional eliminado`);
            }

        }catch(error) {
            return toast.error(`Hubo un problema en el servidor, Contacte a soporte informatico`);
        }
    }

    async function actualizar(
        titulo_profesionalAgendaAsignacion,
        descripcion_profesionalAgendaAsignacion,
        porcentaje_remuneracion,
        profesional_id,
        profesionalAgendaAsignacion_id
    ){
try {
    if(!titulo_profesionalAgendaAsignacion||!descripcion_profesionalAgendaAsignacion||porcentaje_remuneracion === null || porcentaje_remuneracion === ""||!profesional_id||!profesionalAgendaAsignacion_id){
        return toast.error(`Hubo Debe seleccionar un profesional para editar y completar todos los campos`);
    }

    const res = await fetch(`${API}/profesionalAgendaAsignacion/actualizarProfesionalAgendaAsignacion`, {
        method: "POST",
        headers: {Accept: "application/json",
            "Content-Type" : "application/json"},
        mode: "cors",
        body: JSON.stringify({
            titulo_profesionalAgendaAsignacion,
            descripcion_profesionalAgendaAsignacion,
            porcentaje_remuneracion,
            profesional_id,
            profesionalAgendaAsignacion_id
        })
    })

    if(!res.ok) return  toast.error(`Hubo Debe seleccionar un profesional (Mala respuesta del servidor)`);

    const respuestaBackend = await res.json();
    if(respuestaBackend.message === true){
        await listarProfesionales();
        limpiar();
        return toast.success(`Profesional actualizado`);
    }else {
        toast.error(`Hubo Debe seleccionar un profesional (Mala respuesta del servidor)`);
    }
}catch(error) {
    console.log(error);
    return toast.error(`Hubo Debe seleccionar un profesional (Mala respuesta del servidor)`);
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
                                Profesionales
                            </h1>
                            <p className="text-sm text-slate-500">
                                Gestione las asignaciones de agenda para cada profesional, incluyendo Nombre, descripción de cargo y porcentaje de remuneración.
                            </p>
                        </div>
                        <InfoButton informacion={'En esta sección podrá crear y administrar las asignaciones de agenda para los profesionales.\n\nCada asignación permite definir un título, una descripción y el porcentaje de remuneración asociado al profesional.\n\nPara crear una nueva asignación, complete los campos del formulario y presione "Guardar". Para modificar una existente, selecciónela desde el listado inferior, realice los cambios y presione "Actualizar".\n'} />
                    </div>
                </div>

                {/* Formulario */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6">

                        <div className="space-y-1">
                            <h2 className="text-base font-semibold text-slate-900">
                                Ingreso y edición
                                <span className="ml-2 text-blue-700">(Asignación)</span>
                            </h2>
                            <p className="text-sm text-slate-500">
                                Complete los campos para registrar o actualizar una asignación de agenda profesional.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5">

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Agenda Disponible</label>
                                <SelectDinamic
                                    value={agenda_id}
                                    onChange={(e) => setAgendaId(e.target.value)}
                                    options={listadoAgendas.map(profesional => ({
                                        value: profesional.id_profesional,
                                        label: profesional.nombreProfesional
                                    }))}
                                    placeholder="Seleccione un profesional"
                                />
                                <p className="text-xs text-slate-400">Seleccione el profesional al que se le asignará la agenda.</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Profesional Disponible</label>
                                <InputTextDinamic
                                    value={titulo_profesionalAgendaAsignacion}
                                    onChange={(e) => setTituloProfesionalAgendaAsignacion(e.target.value)}
                                    placeholder="Ej: Consulta general, Ortodoncia, Kinesiología"
                                    className="w-full"
                                />
                                <p className="text-xs text-slate-400">Nombre identificador de la asignación de agenda.</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Descripción de Cargo</label>
                                <TextAreaDinamic
                                    value={descripcion_profesionalAgendaAsignacion}
                                    onChange={(e) => setDescripcionProfesionalAgendaAsignacion(e.target.value)}
                                    placeholder="Ej: Asignación de agenda para consultas de ortodoncia los días lunes y miércoles"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Porcentaje de remuneración (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    value={porcentaje_remuneracion}
                                    onChange={(e) => setPorcentajeRemuneracion(e.target.value)}
                                    placeholder="Ej: 15.50"
                                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <p className="text-xs text-slate-400">Ingrese el porcentaje de remuneración del profesional (0 a 100).</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                            <ButtonDinamic onClick={() => insertarProfesionalesAgendaAsignacion(
                                titulo_profesionalAgendaAsignacion,
                                descripcion_profesionalAgendaAsignacion,
                                porcentaje_remuneracion,
                                agenda_id
                            )}>
                              Ingresar Profesional
                            </ButtonDinamic>

                            <ButtonDinamic
                                onClick={()=> actualizar(
                                    titulo_profesionalAgendaAsignacion,
                                    descripcion_profesionalAgendaAsignacion,
                                    porcentaje_remuneracion,
                                    agenda_id,
                                    profesionalAgendaAsignacion_id
                                )}
                                className="bg-blue-700 hover:bg-blue-600"
                            >
                                Actualizar Profesional
                            </ButtonDinamic>

                            <ButtonDinamic
                                onClick={()=>eliminar(profesionalAgendaAsignacion_id)}
                                className="bg-red-600 hover:bg-red-500"
                            >
                                Eliminar Profesional
                            </ButtonDinamic>

                            <ButtonDinamic
                                onClick={() => limpiar()}
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
                            <h2 className="text-base font-semibold text-slate-900">Listado de profesionales</h2>
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
                                    <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Nombre</TableHead>
                                    <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider ">Descripción Cargo</TableHead>
                                    <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider ">Agenda Vinculada</TableHead>
                                    <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center w-[120px]">Remuneración</TableHead>
                                    <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center w-[100px]">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {listado.length > 0 ? (
                                    listado.map((item) => (
                                        <TableRow
                                            key={item.profesionalAgendaAsignacion_id}
                                            className={`transition-colors cursor-pointer ${profesionalAgendaAsignacion_id === item.profesionalAgendaAsignacion_id ? 'bg-blue-50/60' : 'hover:bg-slate-50/60'}`}
                                        >
                                            <TableCell className="text-sm font-medium text-slate-800">{item.titulo_profesionalAgendaAsignacion}</TableCell>
                                            <TableCell className="text-sm text-slate-500 max-w-[280px] truncate ">{item.descripcion_profesionalAgendaAsignacion || '—'}</TableCell>
                                            <TableCell className="text-sm text-slate-500 max-w-[280px] truncate ">{item.nombreProfesional || '—'}</TableCell>

                                            <TableCell className="text-center">
                                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                                    {item.porcentaje_remuneracion != null ? `${item.porcentaje_remuneracion}%` : '—'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <button
                                                    onClick={() => seleccionarProfesional(item.profesionalAgendaAsignacion_id)}
                                                    className="inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700 transition-colors"
                                                >
                                                    Seleccionar
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2 text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                </svg>
                                                <p className="text-sm">No hay asignaciones registradas.</p>
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
