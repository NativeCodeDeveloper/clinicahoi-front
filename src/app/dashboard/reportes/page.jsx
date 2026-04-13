"use client";

import { useMemo, useState } from "react";
import OrbBackground from "@/components/OrbBackground";
import { cn } from "@/lib/utils";
import { CalendarRange, PlusCircle, ReceiptText, Wallet } from "lucide-react";

const monthOptions = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const yearOptions = [2026, 2025, 2024];

const mockEntries = [
  {
    id: 1,
    year: 2026,
    month: "Enero",
    ingresosAtenciones: 11800000,
    ingresosExtras: 420000,
    gastosFijos: 2140000,
    gastosVariables: 760000,
  },
  {
    id: 2,
    year: 2026,
    month: "Febrero",
    ingresosAtenciones: 12150000,
    ingresosExtras: 380000,
    gastosFijos: 2140000,
    gastosVariables: 810000,
  },
  {
    id: 3,
    year: 2026,
    month: "Marzo",
    ingresosAtenciones: 13650000,
    ingresosExtras: 1120000,
    gastosFijos: 2140000,
    gastosVariables: 860000,
  },
  {
    id: 4,
    year: 2026,
    month: "Abril",
    ingresosAtenciones: 14200000,
    ingresosExtras: 780000,
    gastosFijos: 2202000,
    gastosVariables: 940000,
  },
  {
    id: 5,
    year: 2026,
    month: "Mayo",
    ingresosAtenciones: 13980000,
    ingresosExtras: 520000,
    gastosFijos: 2202000,
    gastosVariables: 990000,
  },
  {
    id: 6,
    year: 2026,
    month: "Junio",
    ingresosAtenciones: 14560000,
    ingresosExtras: 460000,
    gastosFijos: 2260000,
    gastosVariables: 1080000,
  },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function parseDecimalInput(value) {
  const normalized = value.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function NumberInput({ value, onChange, placeholder }) {
  return (
    <input
      type="number"
      step="0.01"
      min="0"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400"
    />
  );
}

function SummaryBox({ label, value, tone }) {
  const tones = {
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  };

  return (
    <div className={cn("rounded-2xl border px-4 py-3", tones[tone])}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}

export default function ReportesPage() {
  const [form, setForm] = useState({
    year: 2026,
    month: "Abril",
    ingresosAtenciones: "14200000",
    ingresosExtras: "780000",
    gastosFijos: "2202000",
    gastosVariables: "940000",
  });

  const [entries] = useState(mockEntries);

  const ingresosAtenciones = parseDecimalInput(form.ingresosAtenciones);
  const ingresosExtras = parseDecimalInput(form.ingresosExtras);
  const gastosFijos = parseDecimalInput(form.gastosFijos);
  const gastosVariables = parseDecimalInput(form.gastosVariables);
  const totalIngresos = ingresosAtenciones + ingresosExtras;
  const totalGastos = gastosFijos + gastosVariables;
  const resultado = totalIngresos - totalGastos;

  const filteredEntries = useMemo(() => {
    return entries.filter((item) => item.year === form.year);
  }, [entries, form.year]);

  return (
    <OrbBackground orbX={0.82} orbY={0.14}>
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <section className="rounded-[32px] border border-white/80 bg-white/92 px-5 py-6 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:px-6">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-600">
                Panel Financiero
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Financial control for
                <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                  {" "}monthly clinic ops
                </span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Registra ingresos, gastos y resultado neto por periodo en una sola vista.
              </p>
            </div>
          </section>

          <div className="grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)]">
          <section className="rounded-3xl border border-white/80 bg-white/92 p-5 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500 text-white">
                <CalendarRange className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                  Formulario
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                  Control financiero mensual
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Carga financiera por mes y año.
                </p>
              </div>
            </div>

            <form className="mt-5 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Año">
                  <select
                    value={form.year}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, year: Number(e.target.value) }))
                    }
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400"
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Mes">
                  <select
                    value={form.month}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, month: e.target.value }))
                    }
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400"
                  >
                    {monthOptions.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Ingresos por atenciones">
                <NumberInput
                  value={form.ingresosAtenciones}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      ingresosAtenciones: e.target.value,
                    }))
                  }
                  placeholder="0.00"
                />
              </Field>

              <Field label="Ingresos extra">
                <NumberInput
                  value={form.ingresosExtras}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      ingresosExtras: e.target.value,
                    }))
                  }
                  placeholder="0.00"
                />
              </Field>

              <Field label="Gastos fijos">
                <NumberInput
                  value={form.gastosFijos}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      gastosFijos: e.target.value,
                    }))
                  }
                  placeholder="0.00"
                />
              </Field>

              <Field label="Gastos variables">
                <NumberInput
                  value={form.gastosVariables}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      gastosVariables: e.target.value,
                    }))
                  }
                  placeholder="0.00"
                />
              </Field>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-4 text-sm font-semibold text-white transition hover:bg-cyan-700"
                >
                  <PlusCircle className="h-4.5 w-4.5" />
                  Ingresar
                </button>
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </section>

          <div className="space-y-4">
            <section className="rounded-3xl border border-white/80 bg-white/92 p-5 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">Resumen del periodo</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {form.month} {form.year}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <SummaryBox
                  label="Atenciones"
                  value={formatCurrency(ingresosAtenciones)}
                  tone="cyan"
                />
                <SummaryBox
                  label="Extras"
                  value={formatCurrency(ingresosExtras)}
                  tone="emerald"
                />
                <SummaryBox
                  label="Gastos"
                  value={formatCurrency(totalGastos)}
                  tone="amber"
                />
                <SummaryBox
                  label="Resultado"
                  value={formatCurrency(resultado)}
                  tone="indigo"
                />
              </div>
            </section>

            <section className="rounded-3xl border border-white/80 bg-white/92 p-5 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-white">
                  <ReceiptText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">Registros del mes</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Vista de ejemplo para el periodo seleccionado.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Año</th>
                        <th className="px-4 py-3 text-left font-semibold">Mes</th>
                        <th className="px-4 py-3 text-left font-semibold">Atenciones</th>
                        <th className="px-4 py-3 text-left font-semibold">Extras</th>
                        <th className="px-4 py-3 text-left font-semibold">Fijos</th>
                        <th className="px-4 py-3 text-left font-semibold">Variables</th>
                        <th className="px-4 py-3 text-left font-semibold">Total neto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredEntries.length > 0 ? (
                        filteredEntries.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 text-slate-700">{item.year}</td>
                            <td className="px-4 py-3 font-medium text-slate-900">{item.month}</td>
                            <td className="px-4 py-3 text-slate-700">
                              {formatCurrency(item.ingresosAtenciones)}
                            </td>
                            <td className="px-4 py-3 text-slate-700">
                              {formatCurrency(item.ingresosExtras)}
                            </td>
                            <td className="px-4 py-3 text-slate-700">
                              {formatCurrency(item.gastosFijos)}
                            </td>
                            <td className="px-4 py-3 text-slate-700">
                              {formatCurrency(item.gastosVariables)}
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-950">
                              {formatCurrency(
                                item.ingresosAtenciones +
                                  item.ingresosExtras -
                                  item.gastosFijos -
                                  item.gastosVariables
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-slate-500">
                            No hay registros mock para este año.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
        </div>
      </main>
    </OrbBackground>
  );
}
