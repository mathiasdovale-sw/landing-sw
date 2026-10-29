"use client"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { ArrowDown, ArrowRight, Plus, RotateCcw, Trash2, X } from "lucide-react"
import { adsScenario, applyMode, capGood, compute, CURRENCIES, currencyInfo, dataWarnings, fmt, isCurrency, levelOf, setCurrency, ordinal, MONTHS_LONG, MONTHS_SHORT, type CurrencyCode, type Inputs, type Level, type Results, type SeasonProfile } from "./calc"
import { emptyForm, exampleForm, loadSaved, parseNum, serializeSaved, STORAGE_KEY, switchCurrency, toFullMode, toInputs, toQuickMode, type FormState } from "./form"
import { buildFormulas } from "./formulas"
import ReviewRequest, { HelpRequest } from "./review-request"
import Simulator from "./simulator"
import { amountSize, FormulaContext, HelpProvider, Kpi, LEVEL_STYLES, LevelIcon, NumField, Section, Segmented, StatusPill, Toggle, useConcept } from "./ui"

const PROFILE_OPTIONS: { value: SeasonProfile; label: string }[] = [
  { value: "flat", label: "Estable todo el año" },
  { value: "xmas", label: "Pico Navidad y Black Friday" },
  { value: "summer", label: "Pico en verano" },
  { value: "custom", label: "Personalizado" },
]

/** Mensajes para los datos clave sin rellenar. */
const MISSING_SALES = "Dato clave: sin él no hay veredicto."
const MISSING_FIXED = "Dato clave: rellena al menos uno de los dos (pon 0 si no tienes)."

export default function ProfitCalculator() {
  const [form, setForm] = useState<FormState>(exampleForm)
  const [isExample, setIsExample] = useState(true)
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]))
  // Acaba de pasar de modo rápido a completo (para avisar dónde quedaron sus fijos).
  const [refined, setRefined] = useState(false)
  const loaded = useRef(false)

  // Recuperar lo que el usuario metió la última vez (solo en su navegador).
  // Lee también la clave antigua (v1) y la migra al formato actual.
  useEffect(() => {
    try {
      const saved = loadSaved(window.localStorage)
      if (saved) {
        setForm(saved.form)
        setIsExample(saved.isExample)
      }
    } catch {
      /* sin almacenamiento disponible: seguimos con el ejemplo */
    }
    loaded.current = true
  }, [])

  useEffect(() => {
    if (!loaded.current) return
    const t = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, serializeSaved({ form, isExample }))
      } catch {
        /* ignorar */
      }
    }, 300)
    return () => clearTimeout(t)
  }, [form, isExample])

  // La moneda se fija antes de leer y formatear cualquier número de este render.
  setCurrency(form.currency)

  // En modo rápido solo cuentan los campos del modo rápido (applyMode).
  const inputs = useMemo(() => applyMode(toInputs(form)), [form])
  const r = useMemo(() => compute(inputs), [inputs])
  const formulas = useMemo(() => buildFormulas(r, inputs), [r, inputs])
  const warnings = useMemo(() => (r.hasData ? dataWarnings(inputs, r) : []), [inputs, r])
  /** Dato clave sin rellenar (solo se marca cuando ya hay algo metido). */
  const miss = (label: string) => r.completeness.status === "incomplete" && r.completeness.missing.includes(label)

  const set = <K extends keyof FormState>(key: K, value: FormState[K], keepExample = false) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (!keepExample) setIsExample(false)
  }
  /** Varios campos en una sola actualización. */
  const setFields = (patch: Partial<FormState>) => {
    setForm((f) => ({ ...f, ...patch }))
    setIsExample(false)
  }

  const toggleStep = (n: number) =>
    setOpen((s) => {
      const next = new Set(s)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })

  const reset = () => {
    setForm({ ...emptyForm(form.currency), quickMode: form.quickMode })
    setIsExample(false)
    setRefined(false)
    setOpen(new Set([1, 2]))
  }
  // "Afinar mi cálculo": abre el formulario completo conservando lo ya metido.
  const refine = () => {
    setForm((f) => toFullMode(f))
    setRefined(form.otherFixed.trim() !== "" && form.ownerSalary.trim() === "")
    setOpen(new Set([2, 3, 4, 5]))
  }
  const toQuick = () => {
    setForm((f) => toQuickMode(f))
    setRefined(false)
  }
  // Cambiar de moneda: el ejemplo se rehace con importes convertidos (aprox.);
  // con datos propios solo se ajustan IVA y separador decimal (switchCurrency).
  const changeCurrency = (currency: CurrencyCode) => {
    setCurrency(currency) // para que los textos que se generen ya usen la nueva moneda
    if (isExample) {
      const example = exampleForm(currency)
      setForm(form.quickMode ? toQuickMode(example) : example)
      return
    }
    setForm((f) => switchCurrency(f, currency))
  }
  const loadExample = () => {
    setForm(exampleForm(form.currency))
    setIsExample(true)
  }

  const periodLabel = periodText(r.periodMonths, form.months)
  const per = form.months === 1 ? "al mes" : `en ${form.months} meses`

  return (
    <FormulaContext.Provider value={formulas}>
    {/* Una sola ayuda (?) abierta a la vez */}
    <HelpProvider>
      {/* data-clarity-mask: Microsoft Clarity no graba el contenido de la calculadora
          (cifras del usuario), sea cual sea el modo de enmascarado del proyecto. */}
      <div data-clarity-mask="True">
      {/* Formulario + resumen */}
      <section className="bg-sw-bg-0 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
          <div className="min-w-0 space-y-3">
            {/* Barra de datos de ejemplo / vaciar */}
            <div
              className={`flex flex-col gap-3 rounded-sm border p-4 sm:flex-row sm:items-center sm:justify-between ${
                isExample ? "border-sw-secondary/40 bg-sw-secondary/10" : "border-sw-line bg-sw-bg-1"
              }`}
            >
              <p className="text-sm text-sw-fg-2">
                {isExample
                  ? "Estás viendo una tienda de ejemplo. Vacía los datos y mete los tuyos: el resultado se actualiza al instante."
                  : "Tus números se guardan solo en este navegador y no se envían a ningún sitio. Si pides la revisión, solo nos llega tu email."}
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-semibold transition-colors ${
                    isExample ? "bg-sw-secondary-strong text-white hover:bg-sw-secondary" : "border border-sw-line-strong text-sw-fg-2 hover:text-sw-fg-1"
                  }`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  {isExample ? "Usar mis datos" : "Vaciar"}
                </button>
                {!isExample && (
                  <button
                    type="button"
                    onClick={loadExample}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-sw-line-strong px-3 py-2 text-sm text-sw-fg-2 transition-colors hover:text-sw-fg-1"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Ver ejemplo
                  </button>
                )}
              </div>
            </div>

            {/* Modo rápido / completo */}
            <div className="flex flex-col gap-2 rounded-sm border border-sw-line bg-sw-bg-1 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-sw-fg-2">
                {form.quickMode ? "Modo rápido: 8 datos para una primera estimación." : "Modo completo: el cálculo más fiable."}
              </p>
              <Segmented
                size="sm"
                ariaLabel="Modo de la calculadora"
                value={form.quickMode ? "quick" : "full"}
                onChange={(v) => (v === "quick" ? toQuick() : refine())}
                options={[
                  { value: "quick", label: "Modo rápido" },
                  { value: "full", label: "Modo completo" },
                ]}
              />
            </div>

            {/* Moneda: solo cambia cómo se muestran los importes, no convierte nada */}
            <div className="flex flex-col gap-2 rounded-sm border border-sw-line bg-sw-bg-1 p-4 sm:flex-row sm:items-center sm:justify-between">
              <label htmlFor="pc-currency" className="text-sm text-sw-fg-2">
                ¿En qué moneda vendes?
              </label>
              <select
                id="pc-currency"
                value={form.currency}
                onChange={(e) => isCurrency(e.target.value) && changeCurrency(e.target.value)}
                className="w-full rounded-sm border border-sw-line-strong bg-sw-bg-2 px-3 py-2 text-sm text-sw-fg-1 outline-none focus:border-sw-secondary sm:w-auto"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 1. Periodo */}
            <Section
              step={1}
              title="Periodo y estacionalidad"
              summary={`${form.months === 1 ? "1 mes" : `${form.months} meses`} (${periodLabel}) · ${PROFILE_OPTIONS.find((p) => p.value === form.profile)?.label}`}
              done
              open={open.has(1)}
              onToggle={() => toggleStep(1)}
            >
              <div className="space-y-5">
                <FieldBlock concept="period" label="¿Cuántos meses de datos vas a meter?">
                  <Segmented
                    ariaLabel="Meses de datos"
                    value={form.months}
                    onChange={(v) => set("months", v)}
                    options={[
                      { value: 1, label: "1 mes" },
                      { value: 3, label: "3 meses" },
                      { value: 6, label: "6 meses" },
                      { value: 12, label: "12 meses" },
                    ]}
                  />
                </FieldBlock>

                <div>
                  <label htmlFor="pc-end-month" className="mb-1.5 block text-sm text-sw-fg-2">
                    ¿Cuál es el último mes incluido?
                  </label>
                  <select
                    id="pc-end-month"
                    value={form.endMonth}
                    onChange={(e) => set("endMonth", Number(e.target.value))}
                    className="w-full rounded-sm border border-sw-line-strong bg-sw-bg-2 px-3 py-2.5 text-base text-sw-fg-1 outline-none focus:border-sw-secondary sm:w-auto"
                  >
                    {MONTHS_LONG.map((m, i) => (
                      <option key={m} value={i}>
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-sw-fg-4">Mete en cada campo el total de {periodLabel}.</p>
                </div>

                <FieldBlock concept="seasonality" label="¿Cómo se reparten tus ventas en el año?">
                  <Segmented ariaLabel="Perfil de estacionalidad" value={form.profile} onChange={(v) => set("profile", v)} options={PROFILE_OPTIONS} />
                  <SeasonMini weights={r.weights} highlight={r.periodMonths} />
                  {form.profile !== "custom" && (
                    <p className="mt-2 text-xs text-sw-fg-4">Perfil orientativo. Si conoces tu curva, usa «Personalizado».</p>
                  )}
                  {form.profile === "custom" && (
                    <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
                      {MONTHS_SHORT.map((m, i) => (
                        <div key={m}>
                          <span className="mb-1 block text-center font-mono text-[11px] text-sw-fg-3">{m}</span>
                          <NumField
                            ariaLabel={`Peso de ${MONTHS_LONG[i]}`}
                            value={form.customWeights[i]}
                            placeholder="1"
                            onChange={(v) => {
                              const w = [...form.customWeights]
                              w[i] = v
                              set("customWeights", w)
                            }}
                          />
                        </div>
                      ))}
                      <p className="col-span-full text-xs text-sw-fg-4">1 = mes normal · 2 = el doble de ventas · 0,5 = la mitad.</p>
                    </div>
                  )}
                </FieldBlock>
              </div>
            </Section>

            {form.quickMode ? (
              <QuickForm form={form} set={set} miss={miss} periodLabel={periodLabel} onRefine={refine} />
            ) : (
              <>
            {/* 2. Ventas y tráfico */}
            <Section
              step={2}
              title="Ventas y tráfico"
              summary={r.hasData ? `Ingresos netos ${fmt.eur(r.netRevenue)} · ${fmt.num(r.orders)} pedidos` : "Ventas, pedidos, visitas y clientes"}
              done={!!form.grossSales && !!form.orders}
              open={open.has(2)}
              onToggle={() => toggleStep(2)}
            >
              <div className="space-y-5">
                <FieldBlock concept="salesChannel" label="¿Dónde vendes?">
                  <Segmented
                    ariaLabel="Dónde vendes"
                    value={form.salesChannel}
                    onChange={(v) => set("salesChannel", v)}
                    options={[
                      { value: "store", label: "Mi tienda online" },
                      { value: "marketplace", label: "Un marketplace (Etsy, Amazon…)" },
                      { value: "both", label: "Las dos cosas" },
                    ]}
                  />
                  {form.salesChannel === "both" && (
                    <div className="mt-4 max-w-xs">
                      <NumField
                        concept="mkShare"
                        label="¿Qué parte de tus ventas viene del marketplace?"
                        value={form.mkSharePct}
                        onChange={(v) => set("mkSharePct", v)}
                        suffix="%"
                        placeholder="0"
                      />
                    </div>
                  )}
                  {form.salesChannel !== "store" && (
                    <p className="mt-2 text-xs text-sw-fg-4">En ventas, pedidos y costes, mete el total de todos tus canales.</p>
                  )}
                </FieldBlock>

                <VatField form={form} set={set} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <NumField concept="grossSales" value={form.grossSales} onChange={(v) => set("grossSales", v)} suffix={fmt.sym()} missing={miss("Ventas brutas") && MISSING_SALES} />
                  <NumField concept="discounts" value={form.discounts} onChange={(v) => set("discounts", v)} suffix={fmt.sym()} />
                  <NumField concept="returns" value={form.returns} onChange={(v) => set("returns", v)} suffix={fmt.sym()} />
                  <NumField concept="shippingCharged" value={form.shippingCharged} onChange={(v) => set("shippingCharged", v)} suffix={fmt.sym()} />
                  <NumField concept="orders" value={form.orders} onChange={(v) => set("orders", v)} integer missing={miss("Pedidos") && MISSING_SALES} />
                  <NumField
                    concept="sessions"
                    label={form.salesChannel === "marketplace" ? "Visitas (si tu marketplace las muestra)" : undefined}
                    value={form.sessions}
                    onChange={(v) => set("sessions", v)}
                    integer
                  />
                  <NumField concept="newCustomers" value={form.newCustomers} onChange={(v) => set("newCustomers", v)} integer />
                  <NumField concept="returningCustomers" value={form.returningCustomers} onChange={(v) => set("returningCustomers", v)} integer />
                </div>
              </div>
            </Section>

            {/* 3. Costes de cada pedido */}
            <Section
              step={3}
              title="Lo que te cuesta cada venta"
              summary={
                r.variableCosts > 0
                  ? `Costes variables ${fmt.eur(r.variableCosts)} · ${fmt.pct(r.netRevenue > 0 ? r.variableCosts / r.netRevenue : null)} de tus ingresos`
                  : "Producto, envíos, packaging, devoluciones y comisiones"
              }
              done={!!form.cogs}
              open={open.has(3)}
              onToggle={() => toggleStep(3)}
            >
              <div className="space-y-4">
                {/* A. Producto y envío */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-sw-fg-1">Producto y envío</p>
                  <div className="grid items-start gap-x-4 gap-y-3 sm:grid-cols-2">
                    {/* El toggle % / moneda va en la línea de la etiqueta, a la derecha */}
                    <div className="relative">
                      <NumField
                        compact
                        concept="cogs"
                        value={form.cogs}
                        onChange={(v) => set("cogs", v)}
                        suffix={form.cogsMode === "pct" ? "%" : fmt.sym()}
                        hint={form.cogsMode === "pct" ? `% sobre ventas netas sin IVA → ${fmt.eur(r.cogs)}` : "Total del periodo, sin IVA"}
                        missing={miss("Coste de producto") && MISSING_SALES}
                      />
                      <div className="absolute -top-1 right-0">
                      <Segmented
                        size="sm"
                        ariaLabel="Unidad del coste de producto"
                        value={form.cogsMode}
                        onChange={(v) => set("cogsMode", v)}
                        options={[
                          { value: "pct", label: "En %" },
                          { value: "eur", label: `En ${fmt.many()}` },
                        ]}
                      />
                      </div>
                    </div>
                    <NumField compact concept="shippingPaid" value={form.shippingPaid} onChange={(v) => set("shippingPaid", v)} suffix={fmt.sym()} missing={miss("Envíos pagados")} />
                    <NumField compact concept="packaging" value={form.packaging} onChange={(v) => set("packaging", v)} suffix={fmt.sym()} />
                    <NumField
                      compact
                      concept="returnCosts"
                      label="Coste de devoluciones (opcional)"
                      value={form.returnCosts}
                      onChange={(v) => set("returnCosts", v)}
                      suffix={fmt.sym()}
                    />
                  </div>
                </div>

                {/* B. Comisiones: pasarela, plataforma, apps y marketplace en una sola tabla */}
                <CommissionTable form={form} set={set} setFields={setFields} r={r} missingFees={miss("Pasarela de pago")} />
              </div>
            </Section>

            {/* 4. Marketing */}
            <Section
              step={4}
              title="Marketing"
              summary={r.marketing > 0 ? `Inversión ${fmt.eur(r.marketing)} · MER ${fmt.x(r.mer)}` : "Ads, email marketing y otros"}
              done={r.marketing > 0}
              open={open.has(4)}
              onToggle={() => toggleStep(4)}
            >
              <div className="space-y-5">
                {form.salesChannel !== "store" && (
                  <p className="rounded-sm border border-sw-secondary/30 bg-sw-secondary/10 px-3 py-2 text-sm text-sw-fg-2">
                    Si pagas publicidad dentro del marketplace (Etsy Ads, Amazon Ads, Offsite Ads…), añádela como una plataforma más.
                  </p>
                )}
                <FieldBlock concept="ads" label="Publicidad por plataforma">
                  <div className="space-y-3">
                    {form.ads.map((ad, i) => (
                      <div key={ad.id} className="rounded-sm border border-sw-line bg-sw-bg-0 p-3">
                        <div className="mb-2 flex items-center gap-2">
                          <input
                            type="text"
                            value={ad.name}
                            aria-label="Nombre de la plataforma"
                            placeholder="Plataforma"
                            onChange={(e) => {
                              const ads = [...form.ads]
                              ads[i] = { ...ad, name: e.target.value }
                              set("ads", ads)
                            }}
                            className="min-w-0 flex-1 bg-transparent text-base font-semibold text-sw-fg-1 outline-none placeholder:text-sw-fg-4"
                          />
                          <button
                            type="button"
                            aria-label={`Quitar ${ad.name || "plataforma"}`}
                            onClick={() => set("ads", form.ads.filter((a) => a.id !== ad.id))}
                            className="rounded-sm p-1.5 text-sw-fg-4 transition-colors hover:text-sw-danger"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <NumField
                            label="Inversión"
                            value={ad.spend}
                            suffix={fmt.sym()}
                            onChange={(v) => {
                              const ads = [...form.ads]
                              ads[i] = { ...ad, spend: v }
                              set("ads", ads)
                            }}
                          />
                          <NumField
                            label="Ventas atribuidas"
                            value={ad.attributed}
                            suffix={fmt.sym()}
                            onChange={(v) => {
                              const ads = [...form.ads]
                              ads[i] = { ...ad, attributed: v }
                              set("ads", ads)
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        set("ads", [...form.ads, { id: `ad-${Date.now()}`, name: "", spend: "", attributed: "" }])
                      }
                      className="inline-flex items-center gap-1.5 rounded-sm border border-dashed border-sw-line-strong px-3 py-2 text-sm text-sw-fg-2 transition-colors hover:border-sw-secondary hover:text-sw-fg-1"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      Añadir plataforma (Pinterest, Amazon Ads…)
                    </button>
                  </div>
                </FieldBlock>

                <div className="grid gap-4 sm:grid-cols-2">
                  <NumField concept="emailTool" label="Herramienta de email marketing" value={form.emailToolCost} onChange={(v) => set("emailToolCost", v)} suffix={fmt.sym()} />
                  <NumField label="Ventas atribuidas al email" value={form.emailAttributed} onChange={(v) => set("emailAttributed", v)} suffix={fmt.sym()} />
                  <NumField concept="otherMarketing" value={form.otherMarketing} onChange={(v) => set("otherMarketing", v)} suffix={fmt.sym()} />
                </div>
              </div>
            </Section>

            {/* 5. Fijos e impuestos */}
            <Section
              step={5}
              title="Gastos fijos e impuestos"
              summary={r.completeness.fixedKnown ? `Fijos ${fmt.eur(r.fixed)} · impuesto ${form.profitTaxPct || 0}%` : "Plataforma, apps, tu sueldo, alquiler…"}
              done={r.completeness.fixedKnown}
              open={open.has(5)}
              onToggle={() => toggleStep(5)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <NumField concept="platformCost" value={form.platformCost} onChange={(v) => set("platformCost", v)} suffix={fmt.sym()} missing={miss("Gastos fijos") && MISSING_FIXED} />
                <NumField
                  concept="otherFixed"
                  value={form.otherFixed}
                  onChange={(v) => set("otherFixed", v)}
                  suffix={fmt.sym()}
                  missing={miss("Gastos fijos") && MISSING_FIXED}
                  hint={refined ? "Aquí están los gastos fijos del modo rápido. Si incluían tu sueldo, pásalo a «Tu sueldo»." : undefined}
                />
                <NumField concept="ownerSalary" value={form.ownerSalary} onChange={(v) => set("ownerSalary", v)} suffix={fmt.sym()} hint="Opcional. Total del periodo." />
                <NumField concept="ownerHours" value={form.ownerHours} onChange={(v) => set("ownerHours", v)} suffix="h/mes" integer hint="Opcional." />
                <NumField concept="profitTax" value={form.profitTaxPct} onChange={(v) => set("profitTaxPct", v)} suffix="%" />
              </div>
            </Section>

            {/* 6. LTV opcional */}
            <Section
              step={6}
              title="Primera compra y valor del cliente (opcional)"
              summary={
                r.firstOrderProfit !== null
                  ? `1.ª compra ${signedEur(r.firstOrderProfit)}${form.ltvEnabled && r.ltvCac !== null ? ` · LTV:CAC ${fmt.dec(r.ltvCac)}` : ""}`
                  : "Primer pedido y LTV a 12 meses"
              }
              done={r.firstOrderCustom || (form.ltvEnabled && r.ltvFrequency !== null)}
              open={open.has(6)}
              onToggle={() => toggleStep(6)}
            >
              <div className="space-y-4">
                <p className="text-sm text-sw-fg-3">
                  El primer pedido suele dejar menos margen que los siguientes. Si lo conoces, afina el cálculo; si no, usamos tu pedido medio.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <NumField
                    concept="firstOrderAov"
                    value={form.firstOrderAov}
                    onChange={(v) => set("firstOrderAov", v)}
                    suffix={fmt.sym()}
                    placeholder={r.aov !== null ? fmt.dec(r.aov / r.vatFactor) : "0"}
                  />
                  <NumField concept="welcomeDiscount" value={form.welcomeDiscountPct} onChange={(v) => set("welcomeDiscountPct", v)} suffix="%" placeholder="0" />
                </div>
                <FirstOrderResult r={r} />
                <div className="border-t border-sw-line" />
                <p className="text-sm text-sw-fg-3">
                  El LTV es difícil de calcular bien. Actívalo solo si conoces (aunque sea aproximado) cuántos pedidos te hace un cliente en un año.
                </p>
                <Toggle checked={form.ltvEnabled} onChange={(v) => set("ltvEnabled", v)} label="Calcular LTV" />
                {form.ltvEnabled && (
                  <NumField
                    concept="ltvFrequency"
                    value={form.ltvFrequency}
                    onChange={(v) => set("ltvFrequency", v)}
                    placeholder={r.ltvFrequencyIsEstimate && r.ltvFrequency ? fmt.dec(r.ltvFrequency) : "ej. 1,4"}
                    hint={
                      r.ltvFrequencyIsEstimate
                        ? `Estimado con tus 12 meses de datos: ${fmt.dec(r.ltvFrequency)} pedidos por cliente. Puedes cambiarlo.`
                        : form.months < 12 && !form.ltvFrequency
                          ? "Con menos de 12 meses de datos no podemos estimarlo: mételo tú."
                          : undefined
                    }
                  />
                )}
                {form.ltvEnabled && <LtvResult r={r} />}
              </div>
            </Section>
              </>
            )}

            {/* Ayuda para rellenar la calculadora: solo se envía el email */}
            <HelpRequest />
          </div>

          {/* Resumen siempre visible en escritorio */}
          <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:[scrollbar-width:thin]">
            <SummaryCard r={r} per={per} months={form.months} periodLabel={periodLabel} warnings={warnings} onRefine={refine} />
          </aside>
        </div>
      </section>

      {/* Análisis completo */}
      <Analysis r={r} inputs={inputs} form={form} per={per} set={set} />

      <MobileBar r={r} per={per} />
      </div>
    </HelpProvider>
    </FormulaContext.Provider>
  )
}

// ---------------------------------------------------------------------------

function FieldBlock({ concept, label, children }: { concept: string; label: string; children: React.ReactNode }) {
  const { button, panel } = useConcept(concept)
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm text-sw-fg-2">{label}</span>
        {button}
      </div>
      {children}
      {panel}
    </div>
  )
}

type SetField = <K extends keyof FormState>(key: K, value: FormState[K], keepExample?: boolean) => void

// Columnas de la tabla de comisiones (sm+): concepto · % · fijo por pedido · importe · papelera.
// En móvil: el nombre y el importe en una línea, y debajo % y fijo en dos columnas.
const COMMISSION_COLS = "grid grid-cols-2 gap-x-2 sm:grid-cols-[minmax(0,1fr)_5.5rem_7rem_7rem_1.75rem]"

type CommissionInput = { value: string; onChange: (v: string) => void }

/**
 * Todas las comisiones por venta en una tabla: pasarela, plataforma y apps (tienda propia)
 * y comisión y otras tarifas (marketplace). Cada fila calcula sobre su canal (ver calc.ts).
 */
function CommissionTable({
  form,
  set,
  setFields,
  r,
  missingFees,
}: {
  form: FormState
  set: SetField
  setFields: (patch: Partial<FormState>) => void
  r: Results
  missingFees: boolean
}) {
  const help = useConcept("salesFees")
  const mk = form.salesChannel !== "store"
  const store = form.salesChannel !== "marketplace"
  const both = mk && store
  // Reparto del paso 2 (si lo ha puesto): "Tu tienda (60 %)" / "Marketplace (40 %)"
  const shareKnown = form.mkSharePct.trim() !== ""
  const share = (x: number) => (shareKnown ? ` (${String(Math.round(x * 1000) / 10).replace(".", fmt.decimal())} %)` : "")
  const setApp = (i: number, patch: Partial<FormState["apps"][number]>) => {
    const apps = [...form.apps]
    apps[i] = { ...apps[i], ...patch }
    set("apps", apps)
  }
  const otherFees = mk ? Math.abs(parseNum(form.mkOtherFees) ?? 0) : 0
  const pctMode = form.feesMode === "pct"

  const storeRows = (
    <>
      <CommissionRow
        label="Pasarela de pago"
        concept="fees"
        pct={pctMode ? { value: form.fees, onChange: (v) => set("fees", v) } : undefined}
        fixed={pctMode ? { value: form.feesFixedPerOrder, onChange: (v) => set("feesFixedPerOrder", v) } : undefined}
        total={pctMode ? undefined : { value: form.fees, onChange: (v) => set("fees", v) }}
        amount={r.fees}
        missing={missingFees}
        below={
          <button
            type="button"
            // % y total comparten el campo "fees": al cambiar de modo se vacía para que un total
            // (p. ej. 500.000) no pase a leerse como 500.000 %.
            onClick={() => setFields({ feesMode: pctMode ? "eur" : "pct", fees: "", feesFixedPerOrder: "" })}
            className="text-left text-xs text-sw-secondary transition-colors hover:text-sw-fg-1 hover:underline"
          >
            {pctMode ? `¿Solo sabes el total? Mételo en ${fmt.many()}` : "Usar % + fijo"}
          </button>
        }
      />
      <CommissionRow
        label="Plataforma de tu tienda"
        concept="platformFee"
        pct={{ value: form.platformFeePct, onChange: (v) => set("platformFeePct", v) }}
        fixed={{ value: form.platformFeeFixed, onChange: (v) => set("platformFeeFixed", v) }}
        amount={r.platformFees}
      />
      {form.apps.map((app, i) => (
        <CommissionRow
          key={app.id}
          label={app.name || "App"}
          concept="appFees"
          nameInput={{ value: app.name, onChange: (v) => setApp(i, { name: v }) }}
          pct={{ value: app.pct, onChange: (v) => setApp(i, { pct: v }) }}
          fixed={{ value: app.fixed, onChange: (v) => setApp(i, { fixed: v }) }}
          amount={r.appBreakdown.find((x) => x.id === app.id)?.amount ?? 0}
          onRemove={() => set("apps", form.apps.filter((x) => x.id !== app.id))}
        />
      ))}
      <div>
        <button
          type="button"
          onClick={() => set("apps", [...form.apps, { id: `app-${Date.now()}`, name: "", pct: "", fixed: "" }])}
          className="inline-flex items-center gap-1.5 py-1 text-sm text-sw-secondary transition-colors hover:text-sw-fg-1"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Añadir app que cobra %
        </button>
      </div>
    </>
  )

  const mkRows = (
    <>
      <CommissionRow
        label="Comisión del marketplace"
        concept="marketplaceFee"
        pct={{ value: form.mkFeePct, onChange: (v) => set("mkFeePct", v) }}
        fixed={{ value: form.mkFeeFixed, onChange: (v) => set("mkFeeFixed", v) }}
        amount={r.marketplaceFees - otherFees}
        below={
          <label className="mt-0.5 flex cursor-pointer items-center gap-2 pl-3 text-xs text-sw-fg-3">
            <input
              type="checkbox"
              checked={form.mkFeeOnShipping}
              onChange={(e) => set("mkFeeOnShipping", e.target.checked)}
              className="h-3.5 w-3.5 shrink-0 accent-sw-secondary"
            />
            La comisión también se aplica al envío
          </label>
        }
      />
      <CommissionRow
        label="Otras tarifas del marketplace"
        concept="mkOtherFees"
        total={{ value: form.mkOtherFees, onChange: (v) => set("mkOtherFees", v) }}
        amount={otherFees}
      />
    </>
  )

  const groupTitle = "pt-2.5 font-mono-label text-[11px] leading-none text-sw-fg-4"
  return (
    <div className="border-t border-sw-line pt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-sw-fg-1">Comisiones</span>
        {help.button}
      </div>
      <p className="mt-0.5 text-xs text-sw-fg-4">Lo que se queda cada servicio por venta, sin IVA.</p>
      {help.panel}

      {/* Cabecera, una sola vez para toda la tabla (las filas usan aria-label) */}
      <div className={`${COMMISSION_COLS} mt-2 border-b border-sw-line pb-1 text-xs text-sw-fg-4`} aria-hidden="true">
        <span className="hidden sm:block">Concepto</span>
        <span>%</span>
        <span>Fijo por pedido</span>
        <span className="hidden text-right sm:block">Importe</span>
      </div>

      {both ? (
        <>
          <p className={groupTitle}>Tu tienda{share(1 - r.mkShare)}</p>
          {storeRows}
          <p className={`${groupTitle} border-t border-sw-line`}>Marketplace{share(r.mkShare)}</p>
          {mkRows}
        </>
      ) : store ? (
        storeRows
      ) : (
        mkRows
      )}

      <div className="flex items-baseline justify-between gap-3 border-t border-sw-line pt-2 text-sm">
        <span className="font-semibold text-sw-fg-1">Total comisiones</span>
        <span className="font-semibold tabular-nums text-sw-fg-1">{fmt.eur(r.fees + r.salesFeesTotal)}</span>
      </div>
    </div>
  )
}

/**
 * Una fila de la tabla de comisiones. Los inputs no llevan label visible (lo dice la
 * cabecera): su aria-label es "Concepto, %" / "Concepto, fijo por pedido".
 * `total` = un solo importe que ocupa las columnas de % y fijo.
 */
function CommissionRow({
  label,
  concept,
  nameInput,
  pct,
  fixed,
  total,
  amount,
  missing,
  onRemove,
  below,
}: {
  label: string
  concept: string
  nameInput?: CommissionInput
  pct?: CommissionInput
  fixed?: CommissionInput
  total?: CommissionInput
  amount: number
  missing?: boolean
  onRemove?: () => void
  below?: React.ReactNode
}) {
  const { button, panel } = useConcept(concept)
  const amountText = Math.abs(amount) > 0.004 ? fmt.eur(amount) : "—"
  const amountCls = `min-w-0 break-words text-right tabular-nums text-sw-fg-3 ${amountSize(amountText, ["text-sm", "text-sm", "text-xs", "text-[11px]"])}`
  const trash = onRemove ? (
    <button
      type="button"
      aria-label={`Quitar ${label}`}
      onClick={onRemove}
      className="-m-1 rounded-sm p-1 text-sw-fg-4 transition-colors hover:text-sw-danger"
    >
      <Trash2 className="h-4 w-4" aria-hidden="true" />
    </button>
  ) : null
  return (
    <div className="py-1">
      <div className={`${COMMISSION_COLS} items-center gap-y-1.5`}>
        <div className="col-span-2 min-w-0 sm:col-span-1">
        <div className="flex min-w-0 items-center gap-2">
          {nameInput ? (
            <input
              type="text"
              value={nameInput.value}
              aria-label="Nombre de la app"
              placeholder="Nombre de la app"
              onChange={(e) => nameInput.onChange(e.target.value)}
              className="min-w-0 flex-1 border-b border-transparent bg-transparent py-0.5 text-base text-sw-fg-1 outline-none placeholder:text-sw-fg-4 focus:border-sw-secondary sm:text-sm"
            />
          ) : (
            <span className="min-w-0 text-sm text-sw-fg-2">{label}</span>
          )}
          {button}
          {/* Móvil: importe (y papelera) en la línea del nombre */}
          <span className={`ml-auto shrink-0 sm:hidden ${amountCls}`}>{amountText}</span>
          {trash && <span className="flex shrink-0 sm:hidden">{trash}</span>}
        </div>
        {below}
        </div>
        {total ? (
          <div className="col-span-2">
            <NumField
              compact
              ariaLabel={`${label}, total del periodo`}
              value={total.value}
              onChange={total.onChange}
              suffix={fmt.sym()}
              placeholder="Total del periodo"
              missing={missing}
              missingNote={false}
            />
          </div>
        ) : (
          <>
            <NumField compact ariaLabel={`${label}, %`} value={pct?.value ?? ""} onChange={pct?.onChange ?? (() => {})} suffix="%" placeholder="0" missing={missing} missingNote={false} />
            <NumField compact ariaLabel={`${label}, fijo por pedido`} value={fixed?.value ?? ""} onChange={fixed?.onChange ?? (() => {})} suffix={fmt.sym()} placeholder="0" />
          </>
        )}
        <span className={`hidden sm:block ${amountCls}`}>{amountText}</span>
        <span className="hidden justify-end sm:flex">{trash}</span>
      </div>
      {missing && <p className="mt-1 text-xs text-amber-400">Dato clave. Si no tienes este gasto, pon 0.</p>}
      {panel}
    </div>
  )
}

function VatField({ form, set }: { form: FormState; set: SetField }) {
  // La ayuda va debajo de la fila, a todo el ancho: dentro de su celda empujaría
  // hacia abajo el campo «Tipo de IVA», que está alineado abajo (sm:items-end).
  const { button, panel } = useConcept("vat")
  return (
    <>
      <div>
        <div className="grid gap-4 sm:grid-cols-[1fr_120px] sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-sw-fg-2">¿Tus cifras de ventas incluyen IVA?</span>
              {button}
            </div>
            <Segmented
              ariaLabel="Las ventas incluyen IVA"
              value={form.salesIncludeVat === null ? "" : form.salesIncludeVat ? "si" : "no"}
              onChange={(v) => set("salesIncludeVat", v === "si")}
              options={[
                { value: "no", label: "No, sin IVA" },
                { value: "si", label: "Sí, con IVA" },
              ]}
            />
          </div>
          <NumField label="Tipo de IVA" value={form.vatPct} onChange={(v) => set("vatPct", v)} suffix="%" placeholder={String(currencyInfo(form.currency).vat)} />
        </div>
        {panel}
      </div>
      {form.salesIncludeVat === null && (
        <p className="-mt-2 flex items-start gap-1.5 text-xs text-amber-400">
          <LevelIcon level="warn" className="mt-px h-3.5 w-3.5 shrink-0" />
          Dato clave. Revisa tu informe de ventas y elige una opción. Mientras tanto calculamos como si fueran sin IVA.
        </p>
      )}
      <p className="-mt-2 text-xs text-sw-fg-4">
        {form.quickMode
          ? "Se aplica a las ventas. Los costes, siempre sin IVA."
          : "Se aplica a ventas, descuentos, devoluciones, envíos cobrados y ventas atribuidas. Los costes, siempre sin IVA."}
      </p>
    </>
  )
}

/** Modo rápido: lo mínimo para una primera estimación. */
function QuickForm({
  form,
  set,
  miss,
  periodLabel,
  onRefine,
}: {
  form: FormState
  set: SetField
  miss: (label: string) => boolean
  periodLabel: string
  onRefine: () => void
}) {
  return (
    <div className="rounded-sm border border-sw-line-strong bg-sw-bg-1">
      <div className="px-4 py-4 sm:px-5">
        <p className="font-semibold text-sw-fg-1">Lo mínimo para una estimación</p>
        <p className="mt-0.5 text-xs text-sw-fg-3">
          Mete el total de {periodLabel}. No incluye pasarela de pago, packaging, descuentos ni devoluciones: el resultado será una estimación rápida.
        </p>
      </div>
      <div className="space-y-5 border-t border-sw-line px-4 pb-5 pt-4 sm:px-5">
        <VatField form={form} set={set} />
        <div className="grid gap-4 sm:grid-cols-2">
          <NumField concept="grossSales" value={form.grossSales} onChange={(v) => set("grossSales", v)} suffix={fmt.sym()} missing={miss("Ventas brutas") && MISSING_SALES} />
          <NumField concept="orders" value={form.orders} onChange={(v) => set("orders", v)} integer missing={miss("Pedidos") && MISSING_SALES} />
          <div className="space-y-2">
            <NumField
              concept="cogs"
              label={form.cogsMode === "pct" ? "Coste de producto (%)" : `Coste de producto (${fmt.sym()})`}
              value={form.cogs}
              onChange={(v) => set("cogs", v)}
              suffix={form.cogsMode === "pct" ? "%" : fmt.sym()}
              hint={form.cogsMode === "pct" ? "% sobre tus ventas sin IVA" : "Total del periodo, sin IVA"}
              missing={miss("Coste de producto") && MISSING_SALES}
            />
            {form.cogsMode === "eur" && (
              <Segmented
                size="sm"
                ariaLabel="Unidad del coste de producto"
                value={form.cogsMode}
                onChange={(v) => set("cogsMode", v)}
                options={[
                  { value: "pct", label: "En %" },
                  { value: "eur", label: `En ${fmt.many()}` },
                ]}
              />
            )}
          </div>
          <NumField concept="shippingPaid" value={form.shippingPaid} onChange={(v) => set("shippingPaid", v)} suffix={fmt.sym()} missing={miss("Envíos pagados")} />
          <NumField
            label="Gasto total en publicidad"
            value={form.adSpendTotal}
            onChange={(v) => set("adSpendTotal", v)}
            suffix={fmt.sym()}
            hint="Todas las plataformas juntas, sin IVA. Si no haces publicidad, pon 0."
          />
          <NumField
            label="Gastos fijos del periodo"
            value={form.otherFixed}
            onChange={(v) => set("otherFixed", v)}
            suffix={fmt.sym()}
            hint="Plataforma, apps, alquiler, gestoría, tu sueldo… todo lo que pagas vendas o no."
            missing={miss("Gastos fijos")}
          />
          <NumField concept="sessions" label="Sesiones (opcional)" value={form.sessions} onChange={(v) => set("sessions", v)} integer />
        </div>
        <button
          type="button"
          onClick={onRefine}
          className="inline-flex items-center gap-1.5 rounded-sm border border-sw-line-strong px-4 py-2.5 text-sm font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
        >
          Afinar mi cálculo
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function periodText(months: number[], count: number) {
  if (count === 12) return `${MONTHS_LONG[months[0]]} a ${MONTHS_LONG[months[months.length - 1]]}`
  if (count === 1) return MONTHS_LONG[months[0]]
  return `${MONTHS_LONG[months[0]]} a ${MONTHS_LONG[months[months.length - 1]]}`
}

function SeasonMini({ weights, highlight }: { weights: number[]; highlight: number[] }) {
  const max = Math.max(...weights, 1)
  return (
    <div className="mt-4" aria-hidden="true">
      <div className="flex h-16 items-end gap-[2px]">
        {weights.map((w, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-[3px] ${highlight.includes(i) ? "bg-sw-secondary" : "bg-sw-line-strong"}`}
            style={{ height: `${Math.max(6, (w / max) * 100)}%` }}
          />
        ))}
      </div>
      <div className="mt-1 flex gap-[2px]">
        {MONTHS_SHORT.map((m, i) => (
          <span key={m} className={`flex-1 text-center font-mono text-[10px] ${highlight.includes(i) ? "text-sw-secondary" : "text-sw-fg-4"}`}>
            {m.charAt(0)}
          </span>
        ))}
      </div>
      <p className="mt-1 text-xs text-sw-fg-4">
        <span className="mr-1 inline-block h-2 w-2 rounded-[2px] bg-sw-secondary align-middle" />
        Meses de tus datos
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Resumen
// ---------------------------------------------------------------------------

/** Frase sobre el resultado según lo fiable que sea. */
function resultHeadline(r: Results) {
  const gains = r.netProfit >= 0
  switch (r.completeness.status) {
    case "complete":
      return gains ? "Tu tienda gana" : "Tu tienda pierde"
    case "quick":
      return gains ? "Tu tienda ganaría unos" : "Tu tienda perdería unos"
    default:
      return gains ? "Con lo que has metido, como mucho ganaría" : "Con lo que has metido, pierde al menos"
  }
}

function SummaryCard({
  r,
  per,
  months,
  periodLabel,
  warnings,
  onRefine,
}: {
  r: Results
  per: string
  months: number
  periodLabel: string
  warnings: string[]
  onRefine: () => void
}) {
  const comp = r.completeness
  const level = levelOf.result(r.netProfit, r)
  const s = LEVEL_STYLES[level]
  const { button, panel } = useConcept("netProfit")
  // Sin ventas brutas no hay cifra que enseñar.
  const noSales = comp.missing.includes("Ventas brutas")
  return (
    <div className="rounded-sm border border-sw-line-strong bg-sw-bg-1">
      <div className={`border-b border-sw-line p-5 ${r.hasData ? s.bg : ""}`}>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono-label text-[11px] text-sw-fg-3">Resultado · {periodLabel}</span>
          {button}
        </div>
        {r.hasData && comp.status !== "complete" && (
          <span className="mt-3 inline-flex items-center gap-1 rounded-sm border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-xs font-medium text-amber-400">
            <LevelIcon level="warn" className="h-3.5 w-3.5" />
            {comp.status === "quick" ? "Estimación rápida" : "Estimación incompleta"}
          </span>
        )}
        {r.hasData && !noSales ? (
          <>
            <p className="mt-3 text-sm text-sw-fg-2">{resultHeadline(r)}</p>
            {/* !normal-case: .font-display pone mayúsculas ("GS.") y, al ir después de las utilidades en globals.css, ganaría a normal-case */}
            <p className={`min-w-0 break-words font-display !normal-case tabular-nums ${amountSize(fmt.eur(Math.abs(r.netProfit)), ["text-5xl", "text-4xl", "text-3xl", "text-2xl"])} ${s.text}`}>
              {fmt.eur(Math.abs(r.netProfit))}
            </p>
            <p className="mt-1 text-sm text-sw-fg-3">
              de beneficio neto {per}
              {months > 1 && <> · {fmt.eur(r.netProfit / months)} al mes</>}
            </p>
          </>
        ) : r.hasData ? (
          <p className="mt-3 text-sm text-sw-fg-3">Mete tus ventas brutas para ver si tu tienda gana o pierde dinero.</p>
        ) : (
          <p className="mt-3 text-sm text-sw-fg-3">Mete tus ventas y costes para ver si tu tienda gana o pierde dinero.</p>
        )}
        {panel}
      </div>

      {r.hasData && comp.status === "incomplete" && (
        <div className="border-b border-sw-line bg-amber-400/10 px-5 py-3" role="status">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-400">
            <LevelIcon level="warn" className="h-4 w-4" />
            Faltan datos clave
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs leading-relaxed text-sw-fg-2">
            {comp.missing.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs leading-relaxed text-sw-fg-2">
            Mientras falten, cuentan como 0. Cuando los completes, el beneficio bajará: el real es menor que esta cifra.
          </p>
        </div>
      )}

      {r.hasData && comp.status === "quick" && (
        <div className="border-b border-sw-line bg-amber-400/10 px-5 py-3" role="status">
          <p className="text-sm font-semibold text-amber-400">No incluye</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs leading-relaxed text-sw-fg-2">
            {comp.notIncluded.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs leading-relaxed text-sw-fg-2">
            Casi todo lo que falta son costes, así que lo normal es que el beneficio real sea menor (la excepción son los envíos que cobras a tus clientes).
          </p>
          <button
            type="button"
            onClick={onRefine}
            className="mt-3 inline-flex items-center gap-1.5 rounded-sm border border-sw-line-strong bg-sw-bg-1 px-3 py-2 text-sm font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
          >
            Afinar mi cálculo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {r.hasData && comp.status === "complete" && comp.optionalEmpty.length > 0 && (
        <p className="border-b border-sw-line px-5 py-3 text-xs leading-relaxed text-sw-fg-4">
          Sin rellenar (cuentan como 0; no bloquean el resultado): {comp.optionalEmpty.join(", ").toLowerCase()}.
        </p>
      )}

      {warnings.length > 0 && (
        <div className="border-b border-sw-line bg-amber-400/10 px-5 py-3" role="status">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-400">
            <LevelIcon level="warn" className="h-4 w-4" />
            Revisa tus datos
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs leading-relaxed text-sw-fg-2">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {r.hasData && (
        <div className="space-y-5 p-5">
          <dl className="space-y-2.5 text-sm">
            <Row label="Ingresos netos (sin IVA)" value={fmt.eur(r.netRevenue)} />
            <Row
              label={`Lo que queda por cada ${fmt.one()} vendido`}
              value={fmt.eur2(r.cm1PerEuro)}
              level={capGood(levelOf.cm1PerEuro(r.cm1PerEuro), r)}
              hint="antes de marketing y fijos"
            />
            <Row
              label="Margen de contribución"
              value={`${fmt.eur(r.contribution)} · ${fmt.pct(r.contributionPct)}`}
              level={capGood(levelOf.contribution(r), r)}
              hint={
                !comp.fixedKnown
                  ? "falta el dato de gastos fijos para valorarlo"
                  : r.contribution >= r.fixed
                    ? `cubre tus gastos fijos (${fmt.eur(r.fixed)})`
                    : `no cubre tus gastos fijos (${fmt.eur(r.fixed)})`
              }
            />
            <Row label="ROAS breakeven" value={fmt.x(r.roasBreakeven)} hint="MER mínimo para cubrir costes variables" />
            {comp.fixedKnown && (
              <Row
                label="MER para beneficio 0"
                value={r.merProfitImpossible ? "Imposible" : fmt.x(r.merProfit)}
                level={r.merProfitImpossible ? "bad" : "neutral"}
                hint={r.merProfitImpossible ? "con tus fijos, ningún nivel de marketing da beneficio" : "contando también los gastos fijos"}
              />
            )}
            {r.firstOrderProfit !== null && (
              <Row
                label="Primera compra"
                value={signedEur(r.firstOrderProfit)}
                level={capGood(levelOf.firstOrder(r.firstOrderProfit, r.ordersToRecoverCac, r.ltvFrequency), r)}
                hint="lo que ganas o pierdes con el primer pedido de un cliente nuevo"
              />
            )}
            {r.ltvCac !== null && (
              <Row label="LTV:CAC" value={fmt.dec(r.ltvCac)} level={capGood(levelOf.ltvCac(r.ltvCac), r)} hint="lo que te deja un cliente en un año ÷ lo que cuesta captarlo" />
            )}
            {comp.status !== "quick" && !noSales && (
              <>
                <Row
                  label="Lo que te llevas tú"
                  value={fmt.eur(r.ownerTake)}
                  level={r.ownerTake < 0 ? "bad" : "neutral"}
                  hint="tu sueldo + beneficio neto"
                />
                {r.ownerPerHour !== null && <Row label="Por hora trabajada" value={fmt.eur2(r.ownerPerHour)} level={r.ownerPerHour < 0 ? "bad" : "neutral"} />}
              </>
            )}
          </dl>
          {comp.status !== "quick" && !noSales && r.ownerSalaryEmpty && (
            <p className="-mt-2 text-xs leading-relaxed text-sw-fg-3">Este beneficio también es tu sueldo: no te estás pagando nada aparte.</p>
          )}

          <Per100 r={r} />

          <div className="rounded-sm border border-sw-line bg-sw-bg-0 p-3">
            <p className="text-xs text-sw-fg-3">Próximos 12 meses, si todo sigue igual</p>
            <p className={`mt-1 text-lg font-semibold tabular-nums ${LEVEL_STYLES[capGood(levelOf.profit(r.projNetProfit), r)].text}`}>
              {r.projNetProfit >= 0 ? "Ganarías " : "Perderías "}
              {fmt.eur(Math.abs(r.projNetProfit))}
            </p>
            <p className="text-xs text-sw-fg-4">sobre {fmt.eur(r.projRevenue)} de ingresos netos</p>
            {months === 1 && <OneMonthNote />}
          </div>

          <a
            href="#analisis"
            className="flex items-center justify-center gap-2 rounded-sm border border-sw-line-strong px-4 py-3 text-sm font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
          >
            Ver análisis y qué hacer
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
          <Disclaimer />
        </div>
      )}
    </div>
  )
}

function Row({ label, value, level = "neutral", hint }: { label: string; value: string; level?: Level; hint?: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-sw-fg-3">
        {label}
        {hint && <span className="block text-xs text-sw-fg-4">{hint}</span>}
      </dt>
      <dd className={`flex shrink-0 items-center gap-1.5 font-semibold tabular-nums ${LEVEL_STYLES[level].text}`}>
        {level !== "neutral" && <LevelIcon level={level} className="h-3.5 w-3.5" />}
        {value}
      </dd>
    </div>
  )
}

// Grises escalonados para costes; el verde/rojo queda para el resultado.
const COST_SHADES = ["#4A4A4A", "#5E5E5E", "#727272", "#868686", "#9A9A9A", "#AEAEAE", "#C2C2C2", "#D6D6D6"]

function Per100({ r }: { r: Results }) {
  const { button, panel } = useConcept("per100")
  if (r.netRevenue <= 0) return null
  const items = [
    { label: "Producto", v: r.cogs },
    { label: "Envíos", v: r.shippingPaid },
    { label: "Packaging", v: r.packaging },
    { label: "Pasarela", v: r.fees },
    { label: "Devoluciones", v: r.returnCosts },
    { label: "Marketing", v: r.marketing },
    { label: "Gastos fijos", v: r.fixed },
    { label: "Impuestos", v: r.tax },
  ]
    .map((it, i) => ({ ...it, color: COST_SHADES[i] }))
    // Comisiones por venta: justo después de la pasarela, con un gris intermedio
    .flatMap((it) => (it.label === "Pasarela" ? [it, { label: "Comisiones", v: r.salesFeesTotal, color: "#909090" }] : [it]))
    .filter((it) => it.v > 0)
  const costs = items.reduce((a, b) => a + b.v, 0)
  const scale = Math.max(r.netRevenue, costs)
  const profit = r.netProfit
  const resLevel = levelOf.result(profit, r)
  const per100 = (v: number) => (v / r.netRevenue) * 100
  const fmt100 = (v: number) => fmt.eur2(per100(v)).replace(/[.,]00(?!\d)/, "")

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-sw-fg-1">De cada {fmt.eur(100)} que ingresas</span>
        {button}
      </div>
      <div className="relative">
        <div className="flex h-4 w-full gap-[2px] overflow-hidden rounded-[4px]" role="img" aria-label={`Reparto de cada ${fmt.eur(100)} de ingresos`}>
          {items.map((it) => (
            <div key={it.label} style={{ width: `${(it.v / scale) * 100}%`, background: it.color }} title={`${it.label}: ${fmt100(it.v)}`} />
          ))}
          {profit > 0 && (
            <div className={resLevel === "good" ? "bg-sw-success" : "bg-sw-fg-2"} style={{ width: `${(profit / scale) * 100}%` }} title={`Te queda: ${fmt100(profit)}`} />
          )}
        </div>
        {costs > r.netRevenue && (
          <div className="absolute -top-1 bottom-[-4px] w-[2px] bg-sw-danger" style={{ left: `${(r.netRevenue / scale) * 100}%` }} aria-hidden="true" />
        )}
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
        {items.map((it) => (
          <li key={it.label} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-sw-fg-3">
              <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ background: it.color }} />
              {it.label}
            </span>
            <span className="tabular-nums text-sw-fg-2">{fmt100(it.v)}</span>
          </li>
        ))}
        <li className="col-span-2 mt-1 flex items-center justify-between gap-2 border-t border-sw-line pt-1.5 text-sm">
          <span className={`flex items-center gap-1.5 font-semibold ${LEVEL_STYLES[resLevel].text}`}>
            <LevelIcon level={resLevel} className="h-3.5 w-3.5" />
            {profit >= 0 ? "Te queda" : "Pierdes"}
          </span>
          <span className={`font-semibold tabular-nums ${LEVEL_STYLES[resLevel].text}`}>{fmt100(Math.abs(profit))}</span>
        </li>
      </ul>
      {panel}
      <ChannelMargins r={r} />
    </div>
  )
}

/** Si vende en tienda propia y marketplace: lo que le queda de cada 100 en cada canal (el mejor, en verde). */
function ChannelMargins({ r }: { r: Results }) {
  const { button, panel } = useConcept("channelMargin")
  if (r.cm1PerEuroStore === null || r.cm1PerEuroMarketplace === null) return null
  const rows = [
    { label: "En tu tienda", v: r.cm1PerEuroStore },
    { label: "En el marketplace", v: r.cm1PerEuroMarketplace },
  ]
  const best = Math.max(...rows.map((x) => x.v))
  const tie = Math.abs(rows[0].v - rows[1].v) < 0.005
  return (
    <div className="mt-4 border-t border-sw-line pt-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs text-sw-fg-3">De cada {fmt.eur(100)} que vendes te quedan, antes de marketing y fijos:</span>
        {button}
      </div>
      <ul className="space-y-1 text-sm">
        {rows.map((x) => {
          const isBest = !tie && x.v === best
          return (
            <li key={x.label} className="flex items-center justify-between gap-2">
              <span className={isBest ? "font-semibold text-sw-success" : "text-sw-fg-2"}>{x.label}</span>
              <span className={`tabular-nums ${isBest ? "font-semibold text-sw-success" : x.v < 0 ? "text-sw-danger" : "text-sw-fg-2"}`}>
                {fmt.eur2(x.v * 100)}
              </span>
            </li>
          )
        })}
      </ul>
      {panel}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Análisis completo
// ---------------------------------------------------------------------------

interface AnalysisProps {
  r: Results
  inputs: Inputs
  form: FormState
  per: string
  set: SetField
}

/** Nota para una métrica que sería "Bien" pero el resultado global no lo respalda. */
function cappedNote(raw: Level, r: Results): string | null {
  if (raw !== "good" || r.trusted) return null
  if (r.netProfit < 0) return "Ojo: la tienda pierde dinero por otra parte"
  return r.completeness.status === "quick" ? "Pendiente de afinar el cálculo" : "Pendiente de completar los datos clave"
}
const withNote = (sub: string | undefined, note: string | null) => (note ? (sub ? `${sub} · ${note}` : note) : sub)

function Analysis({ r, inputs, form, per, set }: AnalysisProps) {
  if (!r.hasData) {
    return (
      <section id="analisis" className="bg-sw-bg-1 py-16">
        <div className="mx-auto max-w-3xl px-5 text-center text-sw-fg-3">
          Cuando metas tus ventas y costes, aquí verás el análisis completo y qué hacer.
        </div>
      </section>
    )
  }

  const contributionSub = !r.completeness.fixedKnown
    ? "Falta el dato de gastos fijos para valorarlo"
    : r.contribution >= r.fixed
      ? `Cubre tus gastos fijos (${fmt.eur(r.fixed)})`
      : `No cubre tus gastos fijos (${fmt.eur(r.fixed)}): faltan ${fmt.eur(r.fixed - r.contribution)}`
  const recoverLevel: Level =
    r.firstOrderProfit === null
      ? "neutral"
      : r.ordersToRecoverCac === null
        ? "bad"
        : r.ordersToRecoverCac <= 1
          ? "good"
          : levelOf.firstOrder(r.firstOrderProfit, r.ordersToRecoverCac, r.ltvFrequency)

  return (
    <section id="analisis" className="scroll-mt-20 border-t border-sw-line bg-sw-bg-1 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        {/* Qué hacer */}
        <div>
          <SectionTitle eyebrow="Conclusiones" title="Qué está pasando y qué hacer" />
          <p className="-mt-4 mb-6 text-sm text-sw-fg-4">Ordenadas por su impacto en tu beneficio.</p>
          <div className="grid gap-3 lg:grid-cols-2">
            {r.insights.map((ins, i) => {
              const s = LEVEL_STYLES[ins.level]
              return (
                <div key={i} className={`flex gap-3 rounded-sm border p-4 ${s.border} ${s.bg}`}>
                  <LevelIcon level={ins.level} className="mt-0.5 h-5 w-5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sw-fg-1">{ins.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-sw-fg-2">{ins.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cuenta de resultados */}
        <div>
          <SectionTitle eyebrow="Cuenta de resultados" title={`De tus ventas a tu bolsillo (${per})`} />
          <Waterfall r={r} />
        </div>

        {/* KPIs */}
        <div>
          <SectionTitle eyebrow="Métricas clave" title="Tus números, uno a uno" />
          <p className="-mt-4 mb-6 text-sm text-sw-fg-4">Toca (?) en cualquier métrica para ver qué significa y cómo se calcula. Los colores son orientativos.</p>
          <KpiGroup title="Ventas y tráfico">
            <Kpi concept="netProductSales" value={fmt.eur(r.netProductSales)} sub={`Brutas ${fmt.eur(r.gross)}`} />
            <Kpi concept="netRevenue" value={fmt.eur(r.netRevenue)} sub={`Los clientes pagaron ${fmt.eur(r.totalCharged)} con IVA`} />
            <Kpi concept="vatCollected" value={fmt.eur(r.vatCollected)} sub={`No es tuyo: es para ${fmt.tax()}`} />
            <Kpi concept="aov" value={fmt.eur2(r.aov)} />
            <Kpi concept="conversionRate" value={fmt.pct(r.conversionRate)} level={levelOf.conversion(r.conversionRate)} sub={r.sessions > 0 ? `${fmt.num(r.orders)} pedidos de ${fmt.num(r.sessions)} sesiones` : undefined} />
            <Kpi concept="rpv" value={fmt.eur2(r.rpv)} />
          </KpiGroup>
          <KpiGroup title="Márgenes">
            <Kpi
              concept="cm1PerEuro"
              value={fmt.eur2(r.cm1PerEuro)}
              level={capGood(levelOf.cm1PerEuro(r.cm1PerEuro), r)}
              sub={withNote(`Margen antes de marketing: ${fmt.eur(r.cm1)}`, cappedNote(levelOf.cm1PerEuro(r.cm1PerEuro), r))}
            />
            <Kpi concept="cm1PerOrder" value={fmt.eur2(r.cm1PerOrder)} />
            <Kpi concept="contribution" value={fmt.eur(r.contribution)} level={capGood(levelOf.contribution(r), r)} sub={contributionSub} />
            <Kpi concept="contributionPct" value={fmt.pct(r.contributionPct)} level={capGood(levelOf.contribution(r), r)} sub={contributionSub} />
            <Kpi
              concept="breakevenRevenue"
              value={fmt.eur(r.breakevenRevenue)}
              sub={
                r.breakevenRevenue !== null
                  ? `Ingresos netos ${per} para beneficio 0, suponiendo que mantienes el mismo gasto en marketing`
                  : !r.completeness.fixedKnown
                    ? "Falta el dato de gastos fijos: sin él no se puede calcular"
                    : "Con margen negativo no hay punto de equilibrio"
              }
              level={
                r.breakevenRevenue === null
                  ? r.completeness.fixedKnown
                    ? "bad"
                    : "neutral"
                  : r.netRevenue >= r.breakevenRevenue
                    ? capGood("good", r)
                    : "bad"
              }
            />
            <Kpi concept="netProfit" value={fmt.eur(r.netProfit)} level={levelOf.result(r.netProfit, r)} sub={`${fmt.pct(r.netMarginPct)} de tus ingresos`} />
          </KpiGroup>
          {r.completeness.status !== "quick" && (
            <KpiGroup title="Tú y tu tiempo">
              <Kpi
                concept="ownerTake"
                value={fmt.eur(r.ownerTake)}
                level={r.ownerTake < 0 ? "bad" : "neutral"}
                sub={r.ownerSalaryEmpty ? "Este beneficio también es tu sueldo: no te estás pagando nada aparte" : `${fmt.eur(r.ownerSalary)} de sueldo + ${fmt.eur(r.netProfit)} de beneficio`}
              />
              <Kpi
                concept="ownerPerHour"
                value={fmt.eur2(r.ownerPerHour)}
                level={r.ownerPerHour !== null && r.ownerPerHour < 0 ? "bad" : "neutral"}
                sub={r.ownerHoursPeriod !== null ? `${fmt.num(r.ownerHoursPeriod)} horas en el periodo` : "Indica las horas que le dedicas al mes (bloque 5)"}
              />
            </KpiGroup>
          )}
          <KpiGroup title="Marketing y clientes">
            <Kpi
              concept="mer"
              value={fmt.x(r.mer)}
              level={capGood(levelOf.mer(r), r)}
              sub={
                r.mer === null
                  ? undefined
                  : r.merProfitImpossible
                    ? `Con tus gastos fijos, ningún nivel de marketing da beneficio. Para cubrir costes variables: ${fmt.x(r.roasBreakeven)}`
                    : withNote(`Para beneficio 0: ${fmt.x(r.merProfit)} · para cubrir costes variables: ${fmt.x(r.roasBreakeven)}`, cappedNote(levelOf.mer(r), r))
              }
            />
            <Kpi
              concept="merProfit"
              value={r.merProfitImpossible ? "Imposible" : fmt.x(r.merProfit)}
              level={r.merProfitImpossible ? "bad" : "neutral"}
              sub={
                r.merProfitImpossible
                  ? `Margen antes de marketing ${fmt.eur(r.cm1)} ≤ gastos fijos ${fmt.eur(r.fixed)}: aunque no gastaras nada en marketing, perderías`
                  : r.completeness.fixedKnown
                    ? "Contando también los gastos fijos"
                    : "Falta el dato de gastos fijos: ahora solo cubre los costes variables"
              }
            />
            <Kpi concept="roasBreakeven" value={fmt.x(r.roasBreakeven)} level={r.roasBreakeven === null ? "bad" : "neutral"} sub="MER mínimo para cubrir los costes variables" />
            <Kpi
              concept="cac"
              value={fmt.eur2(r.cac)}
              level={capGood(levelOf.cacVsOrder(r.cac, r.cm1PerOrder), r)}
              sub={withNote(`Cada pedido deja ${fmt.eur2(r.cm1PerOrder)} antes de marketing`, cappedNote(levelOf.cacVsOrder(r.cac, r.cm1PerOrder), r))}
            />
            <Kpi
              concept="firstOrderProfit"
              value={r.firstOrderProfit !== null ? signedEur(r.firstOrderProfit) : "—"}
              level={capGood(levelOf.firstOrder(r.firstOrderProfit, r.ordersToRecoverCac, r.ltvFrequency), r)}
              sub={withNote(
                r.firstOrderMargin !== null ? `El primer pedido deja ${fmt.eur2(r.firstOrderMargin)} · captarlo cuesta ${fmt.eur2(r.cac)}` : undefined,
                cappedNote(levelOf.firstOrder(r.firstOrderProfit, r.ordersToRecoverCac, r.ltvFrequency), r),
              )}
            />
            <Kpi
              concept="ordersToRecoverCac"
              value={r.ordersToRecoverCac !== null ? fmt.dec(r.ordersToRecoverCac) : r.firstOrderProfit !== null ? "Nunca" : "—"}
              level={capGood(recoverLevel, r)}
              sub={withNote(
                r.ordersToRecoverCac !== null
                  ? r.ordersToRecoverCac <= 1
                    ? "Lo recuperas con el primer pedido"
                    : `Lo recuperas en su ${ordinal(Math.ceil(r.ordersToRecoverCac - 1e-9))} pedido`
                  : undefined,
                cappedNote(recoverLevel, r),
              )}
            />
            <Kpi
              concept="returningShare"
              value={fmt.pct(r.returningShare)}
              sub={r.newCustomers + r.returningCustomers > 0 ? `${fmt.num(r.newCustomers)} nuevos · ${fmt.num(r.returningCustomers)} recurrentes` : undefined}
            />
            {form.ltvEnabled && r.ltvFrequency !== null && (
              <>
                <Kpi concept="ltvRevenue" value={fmt.eur(r.ltvRevenue)} sub={`${fmt.dec(r.ltvFrequency)} pedidos por cliente al año`} />
                <Kpi concept="ltvMargin" value={fmt.eur(r.ltvMargin)} />
                <Kpi concept="ltvCac" value={fmt.dec(r.ltvCac)} level={capGood(levelOf.ltvCac(r.ltvCac), r)} sub={cappedNote(levelOf.ltvCac(r.ltvCac), r) ?? undefined} />
              </>
            )}
            {form.ltvEnabled && r.ltvFrequency === null && (
              <div className="flex items-start gap-2 rounded-sm border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-sw-fg-2">
                <LevelIcon level="warn" className="mt-0.5 h-4 w-4 shrink-0" />
                Para ver tu LTV, indica en el bloque 6 cuántos pedidos te hace un cliente al año.
              </div>
            )}
          </KpiGroup>
        </div>

        {/* Marketing */}
        <div>
          <SectionTitle eyebrow="Marketing" title="¿Qué canal se paga y cuál no?" />
          <Channels r={r} />
          {r.adSpend === 0 && r.netRevenue > 0 && (
            <div className="mt-8">
              <AdsScenario r={r} inputs={inputs} per={per} />
            </div>
          )}
          <div className="mt-8">
            <Attribution r={r} />
          </div>
        </div>

        {/* Proyección */}
        <div>
          <SectionTitle eyebrow="Proyección" title="Tus próximos 12 meses" />
          <Projection r={r} form={form} set={set} />
        </div>

        {/* Simulador de palancas */}
        <div id="simulador" className="scroll-mt-24">
          <SectionTitle eyebrow="Simulador" title="Mueve las palancas y mira tu beneficio" />
          <p className="-mt-4 mb-6 max-w-3xl text-sw-fg-2">
            Desliza cada indicador para ver cuánto ganarías si mejoras tu tienda, tus costes o tu publicidad. Los cambios son sobre tus números actuales.
          </p>
          <Simulator inputs={inputs} base={r} per={per} />
        </div>

        {/* Revisión de números: solo se envía el email */}
        <ReviewRequest />

        <div className="mx-auto max-w-3xl text-center">
          <Disclaimer />
          <p className="mt-2 text-xs leading-relaxed text-sw-fg-4">Tus números no salen de tu navegador. Si pides la revisión, solo nos llega tu email.</p>
        </div>
      </div>
    </section>
  )
}

function Disclaimer() {
  return (
    <p className="text-xs leading-relaxed text-sw-fg-4">
      Resultados orientativos calculados con los datos que introduces. No constituyen asesoramiento fiscal, contable ni financiero.{" "}
      <a href="/es/aviso-legal#herramientas" className="underline underline-offset-2 hover:text-sw-fg-2">
        Condiciones de uso
      </a>
    </p>
  )
}

const signedEur = (v: number) => `${v >= 0 ? "+" : "−"}${fmt.eur2(Math.abs(v))}`

function FirstOrderResult({ r }: { r: Results }) {
  if (r.firstOrderProfit === null || r.firstOrderMargin === null) {
    return <p className="text-xs text-sw-fg-4">Rellena pedidos, clientes nuevos y marketing para ver lo que te deja la primera compra.</p>
  }
  const level = levelOf.firstOrder(r.firstOrderProfit, r.ordersToRecoverCac, r.ltvFrequency)
  const s = LEVEL_STYLES[level]
  return (
    <div className={`rounded-sm border p-4 ${s.border} ${s.bg}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm text-sw-fg-2">Primera compra de un cliente nuevo</span>
        <span className={`flex items-center gap-1.5 text-xl font-semibold tabular-nums ${s.text}`}>
          <LevelIcon level={level} className="h-4 w-4" />
          {signedEur(r.firstOrderProfit)}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-sw-fg-2">
        Su primer pedido te deja {fmt.eur2(r.firstOrderMargin)} y captarlo te cuesta {fmt.eur2(r.cac)}.{" "}
        {r.ordersToRecoverCac === null
          ? "Con tu margen actual no lo recuperas nunca."
          : r.ordersToRecoverCac <= 1
            ? "Lo recuperas con el primer pedido."
            : `Lo recuperas en su ${ordinal(Math.ceil(r.ordersToRecoverCac - 1e-9))} pedido.`}
      </p>
    </div>
  )
}

function LtvResult({ r }: { r: Results }) {
  if (r.ltvFrequency === null) {
    return (
      <p className="flex items-start gap-1.5 text-xs leading-relaxed text-amber-400">
        <LevelIcon level="warn" className="mt-px h-3.5 w-3.5 shrink-0" />
        Indica cuántos pedidos te hace un cliente al año para calcular tu LTV.
      </p>
    )
  }
  const level = levelOf.ltvCac(r.ltvCac)
  return (
    <div className={`rounded-sm border p-4 ${level === "neutral" ? "border-sw-line bg-sw-bg-0" : `${LEVEL_STYLES[level].border} ${LEVEL_STYLES[level].bg}`}`}>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-sw-fg-3">LTV (ventas)</p>
          <p className="text-lg font-semibold tabular-nums text-sw-fg-1">{fmt.eur(r.ltvRevenue)}</p>
        </div>
        <div>
          <p className="text-xs text-sw-fg-3">LTV (margen)</p>
          <p className="text-lg font-semibold tabular-nums text-sw-fg-1">{fmt.eur(r.ltvMargin)}</p>
        </div>
        <div>
          <p className="text-xs text-sw-fg-3">LTV:CAC</p>
          <p className={`flex items-center gap-1 text-lg font-semibold tabular-nums ${LEVEL_STYLES[level].text}`}>
            {level !== "neutral" && <LevelIcon level={level} className="h-4 w-4" />}
            {fmt.dec(r.ltvCac)}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-sw-fg-2">
        {r.cac !== null && r.ltvMargin !== null
          ? `Cada cliente te deja ${fmt.eur(r.ltvMargin)} de margen en un año y captarlo te cuesta ${fmt.eur(r.cac)}. ${
              level === "bad"
                ? "Pierdes dinero con cada cliente nuevo."
                : level === "warn"
                  ? "Lo recuperas, pero con poco margen: conviene que te compren más veces."
                  : "Son clientes rentables."
            }`
          : "Para comparar con lo que cuesta captar un cliente, rellena clientes nuevos y tu gasto en marketing."}
      </p>
    </div>
  )
}

function OneMonthNote() {
  return (
    <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-amber-400 first:mt-0">
      <LevelIcon level="warn" className="mt-px h-3.5 w-3.5 shrink-0" />
      Proyección calculada con un solo mes: depende mucho de la estacionalidad y puede salir muy inflada o muy baja. Para que sea fiable, mete al menos 3 meses.
    </p>
  )
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="font-mono-label text-sw-fg-3">{eyebrow}</span>
      <h2 className="mt-2 font-display text-2xl text-sw-fg-1 sm:text-3xl">{title}</h2>
    </div>
  )
}

function KpiGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-sm font-semibold text-sw-fg-2">{title}</h3>
      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  )
}

function Waterfall({ r }: { r: Results }) {
  type W = { label: string; v: number; kind: "plus" | "minus" | "total"; concept?: string; strong?: boolean }
  const rows: W[] = [
    { label: "Ventas brutas", v: r.gross, kind: "plus", concept: "grossSales" },
    { label: "Descuentos", v: -r.discounts, kind: "minus", concept: "discounts" },
    { label: "Devoluciones", v: -r.returns, kind: "minus", concept: "returns" },
    { label: "Envíos cobrados", v: r.shippingRevenue, kind: "plus", concept: "shippingCharged" },
    { label: "Ingresos netos", v: r.netRevenue, kind: "total", concept: "netRevenue" },
    { label: "Coste de producto", v: -r.cogs, kind: "minus", concept: "cogs" },
    { label: "Envíos pagados", v: -r.shippingPaid, kind: "minus", concept: "shippingPaid" },
    { label: "Packaging", v: -r.packaging, kind: "minus", concept: "packaging" },
    { label: "Pasarela de pago", v: -r.fees, kind: "minus", concept: "fees" },
    { label: "Comisión del marketplace", v: -r.marketplaceFees, kind: "minus", concept: "marketplaceFee" },
    { label: "Comisión de la plataforma", v: -r.platformFees, kind: "minus", concept: "platformFee" },
    { label: "Apps con comisión", v: -r.appFees, kind: "minus", concept: "appFees" },
    { label: "Margen antes de marketing", v: r.cm1, kind: "total", concept: "cm1" },
    ...r.channels.map((c) => ({ label: c.name, v: -c.spend, kind: "minus" as const })),
    { label: "Herramienta de email", v: -r.emailToolCost, kind: "minus", concept: "emailTool" },
    { label: "Otros marketing", v: -r.otherMarketing, kind: "minus", concept: "otherMarketing" },
    { label: "Margen de contribución", v: r.contribution, kind: "total", concept: "contribution" },
    { label: "Gastos fijos", v: -r.fixed, kind: "minus", concept: "fixed" },
    { label: "Beneficio antes de impuestos", v: r.ebit, kind: "total", concept: "ebit" },
    { label: "Impuesto sobre el beneficio", v: -r.tax, kind: "minus", concept: "profitTax" },
    { label: "Beneficio neto", v: r.netProfit, kind: "total", concept: "netProfit", strong: true },
  ]
  const visible = rows.filter((x) => x.kind === "total" || Math.abs(x.v) > 0.004)
  const max = Math.max(r.gross + r.shippingRevenue, ...visible.map((x) => Math.abs(x.v)), 1)
  return (
    <div className="overflow-hidden rounded-sm border border-sw-line bg-sw-bg-0">
      {visible.map((row, i) => (
        <WaterfallRow key={`${row.label}-${i}`} row={row} max={max} base={r.netRevenue} />
      ))}
    </div>
  )
}

function WaterfallRow({
  row,
  max,
  base,
}: {
  row: { label: string; v: number; kind: "plus" | "minus" | "total"; concept?: string; strong?: boolean }
  max: number
  base: number
}) {
  const { button, panel } = useConcept(row.concept)
  const isTotal = row.kind === "total"
  const color = isTotal ? (row.v >= 0 ? "bg-sw-success" : "bg-sw-danger") : row.kind === "plus" ? "bg-sw-secondary" : "bg-sw-fg-4"
  const textColor = isTotal ? (row.v >= 0 ? "text-sw-success" : "text-sw-danger") : "text-sw-fg-1"
  const pctOfBase = base > 0 ? Math.abs(row.v) / base : null
  return (
    <div className={`px-4 py-3 ${isTotal ? "border-y border-sw-line bg-sw-bg-1" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <span className={`flex min-w-0 items-center gap-2 text-sm ${isTotal ? "font-semibold text-sw-fg-1" : "text-sw-fg-2"} ${row.strong ? "text-base" : ""}`}>
          <span className="w-3 shrink-0 text-center font-mono text-sw-fg-4">{isTotal ? "=" : row.kind === "plus" ? "+" : "−"}</span>
          <span className="truncate">{row.label}</span>
          {button}
        </span>
        <span className="flex shrink-0 items-baseline gap-3 tabular-nums">
          <span className="hidden text-xs text-sw-fg-4 sm:inline">{pctOfBase !== null ? fmt.pct(row.v < 0 && isTotal ? -pctOfBase : pctOfBase) : ""}</span>
          <span className={`${row.strong ? "text-lg" : "text-sm"} font-semibold ${textColor}`}>{fmt.eur(row.v)}</span>
        </span>
      </div>
      <div className="ml-5 mt-1.5 h-1.5 rounded-[3px] bg-sw-bg-2">
        <div className={`h-full rounded-[3px] ${color}`} style={{ width: `${Math.min(100, (Math.abs(row.v) / max) * 100)}%` }} />
      </div>
      {panel && <div className="ml-5">{panel}</div>}
    </div>
  )
}

/**
 * Tiendas sin publicidad: escenario "¿y si empiezas a hacer publicidad?".
 * El usuario pone inversión y ROAS; no hay valores por defecto inventados.
 */
function AdsScenario({ r, inputs, per }: { r: Results; inputs: Inputs; per: string }) {
  const [spendRaw, setSpendRaw] = useState("")
  const [roasRaw, setRoasRaw] = useState("")
  const spend = parseNum(spendRaw)
  const roas = parseNum(roasRaw)
  const sim = useMemo(
    () => (spend !== null && roas !== null ? adsScenario(inputs, r, Math.abs(spend), Math.abs(roas)) : null),
    [inputs, r, spend, roas],
  )
  const delta = sim ? sim.netProfit - r.netProfit : 0
  const be = r.roasBreakeven
  const belowBreakeven = roas !== null && (be === null || Math.abs(roas) < be)
  // Sin datos completos no hay verde (mismo criterio que el resto de la calculadora)
  const sure = r.completeness.status === "complete"
  const deltaClass = delta < -0.5 ? "text-sw-danger" : delta > 0.5 && sure ? "text-sw-success" : "text-sw-fg-1"

  return (
    <div className="rounded-sm border border-dashed border-sw-line-strong bg-sw-bg-0 p-4 sm:p-6">
      <h3 className="font-display text-xl text-sw-fg-1 sm:text-2xl">¿Y si empiezas a hacer publicidad?</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sw-fg-2">
        No has metido gasto en publicidad. Prueba un escenario: cuánto invertirías al mes y qué ROAS esperas. Es una estimación con tus números, no una previsión.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <NumField label="Inversión en publicidad al mes" value={spendRaw} onChange={setSpendRaw} suffix={fmt.sym()} hint="Sin IVA." />
        <NumField
          label="ROAS que esperas"
          value={roasRaw}
          onChange={setRoasRaw}
          suffix="x"
          hint={
            be !== null
              ? `Ventas sin IVA por cada ${fmt.one()} invertido. Con tu margen necesitas al menos ${fmt.x(be)} para cubrir los costes variables de esas ventas.`
              : "Con tu margen actual, ningún ROAS cubre los costes variables de esas ventas."
          }
        />
      </div>

      {sim && (
        <div className="mt-6 rounded-sm border border-sw-line bg-sw-bg-1 p-4 sm:p-5">
          <dl className="grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-sw-fg-3">Inversión {per}</dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums text-sw-fg-1">{fmt.eur(sim.adSpend)}</dd>
            </div>
            <div>
              <dt className="text-sw-fg-3">Ventas extra (sin IVA)</dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums text-sw-fg-1">{fmt.eur(sim.netRevenue - r.netRevenue)}</dd>
            </div>
            <div>
              <dt className="text-sw-fg-3">Beneficio neto {per}</dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums text-sw-fg-1">
                {fmt.eur(r.netProfit)} → {fmt.eur(sim.netProfit)}{" "}
                <span className={`text-sm ${deltaClass}`}>
                  ({delta >= 0 ? "+" : "−"}
                  {fmt.eur(Math.abs(delta))})
                </span>
              </dd>
            </div>
          </dl>
          <p className={`mt-4 text-sm leading-relaxed ${belowBreakeven ? "text-sw-danger" : "text-sw-fg-2"}`}>
            {belowBreakeven
              ? `Con ese ROAS, cada ${fmt.one()} en anuncios te cuesta más de lo que te deja: el beneficio bajaría ${fmt.eur(Math.abs(delta))} ${per}.`
              : delta >= 0
                ? `Si consigues ese ROAS, el beneficio subiría ${fmt.eur(delta)} ${per}.`
                : `Con ese ROAS cubres los costes variables, pero no lo suficiente: el beneficio bajaría ${fmt.eur(Math.abs(delta))} ${per}.`}
            {!sure && " Ojo: faltan datos, así que la cifra real será peor."}
          </p>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-sw-fg-4">
        Supone que el ROAS se mantiene igual con esa inversión, que esas ventas tienen el mismo ticket y los mismos costes por pedido que las actuales y que tus gastos
        fijos no cambian. Las plataformas suelen atribuirse de más: usa un ROAS prudente.
      </p>
    </div>
  )
}

function Channels({ r }: { r: Results }) {
  const roasHelp = useConcept("roas")
  const emailHelp = useConcept("emailRoas")
  const rows = r.channels
  if (rows.length === 0 && r.emailToolCost === 0) {
    return <p className="text-sm text-sw-fg-3">No has metido gasto en marketing.</p>
  }
  return (
    <div>
      {rows.length > 0 && (
        <>
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-sw-fg-3">
            <span className="flex items-center gap-2">ROAS de cada plataforma de publicidad {roasHelp.button}</span>
            <span>
              Para cubrir sus costes variables, cada una necesita un ROAS de al menos <strong className="text-sw-fg-1">{fmt.x(r.roasBreakeven)}</strong>
            </span>
          </div>
          {roasHelp.panel}
          <div className="mt-3 grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((c) => {
              const level = capGood(c.level, r)
              const note = cappedNote(c.level, r)
              return (
                <div key={c.id} className={`rounded-sm border bg-sw-bg-0 p-4 ${LEVEL_STYLES[level].border}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sw-fg-1">{c.name}</span>
                    <StatusPill level={level} />
                  </div>
                  <p className={`mt-2 text-2xl font-semibold tabular-nums ${LEVEL_STYLES[level].text}`}>{fmt.x(c.roas)}</p>
                  <p className="mt-1 text-xs text-sw-fg-4">
                    {fmt.eur(c.spend)} invertidos → {c.roas === null && c.attributed === 0 ? "sin ventas atribuidas" : `${fmt.eur(c.attributed)} atribuidos`}
                  </p>
                  {c.level === "review" ? (
                    <p className="mt-2 text-xs leading-relaxed text-amber-400">
                      Se atribuye más de lo que vendiste en total ({fmt.eur(r.netRevenue)}). Revisa el dato: mismo periodo y con o sin IVA igual que tus ventas. Este ROAS no es fiable.
                    </p>
                  ) : (
                    <>
                      <RoasBar roas={c.roas} be={r.roasBreakeven} level={level} />
                      {note && <p className="mt-2 text-xs leading-relaxed text-sw-fg-3">Cubre sus costes variables. {note}.</p>}
                    </>
                  )}
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-xs text-sw-fg-4">
            Ventas atribuidas según cada plataforma (sin IVA). Suelen ser optimistas: si una plataforma está justo en el límite, probablemente no se paga.
          </p>
        </>
      )}

      {r.emailToolCost > 0 && (
        <div className={`${rows.length > 0 ? "mt-6 border-t border-sw-line pt-6" : ""}`}>
          <div className="max-w-md rounded-sm border border-dashed border-sw-line-strong bg-sw-bg-0 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-sw-fg-1">Retorno de la herramienta de email</span>
              {emailHelp.button}
            </div>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-sw-fg-1">{fmt.x(r.emailRoas)}</p>
            <p className="mt-1 text-xs text-sw-fg-4">
              {fmt.eur(r.emailToolCost)} de herramienta → {fmt.eur(r.emailAttributed)} atribuidos
            </p>
            <p className="mt-2 text-xs leading-relaxed text-sw-fg-3">
              No es comparable con el ROAS de la publicidad: solo cuenta el coste de la herramienta y son sobre todo ventas a clientes que ya tienes.
            </p>
            {emailHelp.panel}
          </div>
        </div>
      )}
    </div>
  )
}

function RoasBar({ roas, be, level }: { roas: number | null; be: number | null; level: Level }) {
  if (roas === null || be === null) return null
  const max = Math.max(roas, be) * 1.25
  const color = level === "good" ? "bg-sw-success" : level === "warn" || level === "review" ? "bg-amber-400" : level === "neutral" ? "bg-sw-fg-3" : "bg-sw-danger"
  return (
    <div className="relative mt-3 h-2 rounded-[3px] bg-sw-bg-2" aria-hidden="true">
      <div className={`h-full rounded-[3px] ${color}`} style={{ width: `${(roas / max) * 100}%` }} />
      <div className="absolute -top-1 h-4 w-[2px] bg-sw-fg-1" style={{ left: `${(be / max) * 100}%` }} title={`Breakeven ${fmt.x(be)}`} />
    </div>
  )
}

// Colores categóricos de atribución (validados para daltonismo sobre fondo oscuro).
const ATTR_COLORS = { ads: "#7CB3E0", email: "#E0A458", rest: "#8A8A8A" }

function Attribution({ r }: { r: Results }) {
  const { button, panel } = useConcept("attribution")
  const ads = Math.min(r.adAttributed, r.netRevenue)
  const email = Math.min(r.emailAttributed, Math.max(0, r.netRevenue - ads))
  const parts = [
    { key: "ads", label: "Ads (según las plataformas)", v: ads, color: ATTR_COLORS.ads },
    { key: "email", label: "Email marketing", v: email, color: ATTR_COLORS.email },
    { key: "rest", label: "Orgánico, directo y otros", v: r.restRevenue, color: ATTR_COLORS.rest },
  ].filter((p) => p.v > 0)
  const total = parts.reduce((a, b) => a + b.v, 0) || 1
  // Fuentes que se atribuyen ventas (para el aviso de sobreatribución).
  const sources = [...r.channels.filter((c) => c.attributed > 0).map((c) => c.name), ...(r.emailAttributed > 0 ? ["El email marketing"] : [])]
  return (
    <div className="rounded-sm border border-sw-line bg-sw-bg-0 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-semibold text-sw-fg-1">De dónde vienen tus ventas</span>
        {button}
      </div>
      <div className="flex h-4 w-full gap-[2px] overflow-hidden rounded-[4px]" role="img" aria-label="Reparto de ventas por origen">
        {parts.map((p) => (
          <div key={p.key} style={{ width: `${(p.v / total) * 100}%`, background: p.color }} title={`${p.label}: ${fmt.eur(p.v)}`} />
        ))}
      </div>
      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
        {parts.map((p) => (
          <li key={p.key} className="flex items-center justify-between gap-2 sm:block">
            <span className="flex items-center gap-2 text-sw-fg-3">
              <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ background: p.color }} />
              {p.label}
            </span>
            <span className="tabular-nums text-sw-fg-1 sm:mt-0.5 sm:block sm:pl-[18px]">
              {fmt.eur(p.v)} <span className="text-sw-fg-4">· {fmt.pct(p.v / total)}</span>
            </span>
          </li>
        ))}
      </ul>
      {r.overAttribution > 0 && (
        <p className="mt-3 flex items-start gap-2 text-xs text-amber-400">
          <LevelIcon level="warn" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {sources.length >= 2
            ? `Las plataformas se atribuyen ${fmt.eur(r.overAttribution)} más de lo que vendiste: se están pisando entre ellas.`
            : `${sources[0] ?? "La plataforma"} se atribuye ${fmt.eur(r.overAttribution)} más de lo que vendiste en total. Una sola fuente no puede vender más que toda la tienda: revisa el dato.`}
        </p>
      )}
      {panel}
    </div>
  )
}

function Projection({ r, form, set }: { r: Results; form: FormState; set: SetField }) {
  const formulas = useContext(FormulaContext)
  const [active, setActive] = useState<number | null>(null)
  const { button, panel } = useConcept("projection")
  const growth = Number(form.growthPct) || 0
  const maxRev = Math.max(...r.projection.map((p) => p.revenue), 1)
  const posMax = Math.max(0, ...r.projection.map((p) => p.profitBeforeTax))
  const negMax = Math.max(0, ...r.projection.map((p) => -p.profitBeforeTax))
  const span = posMax + negMax || 1
  const zeroTop = (posMax / span) * 100
  const shown = active !== null ? r.projection[active] : null

  return (
    <div className="space-y-4">
      {form.months === 1 && (
        <div className="rounded-sm border border-amber-400/40 bg-amber-400/10 px-4 py-3">
          <OneMonthNote />
        </div>
      )}
      <div className="grid items-start gap-3 sm:grid-cols-3">
        <Kpi concept="projection" label="Ingresos netos (12 meses)" value={fmt.eur(r.projRevenue)} />
        <Kpi concept="contribution" calc={formulas.projContribution} label="Margen de contribución (12 meses)" value={fmt.eur(r.projContribution)} level={capGood(levelOf.profit(r.projContribution), r)} />
        <Kpi concept="netProfit" calc={formulas.projNetProfit} label="Beneficio neto (12 meses)" value={fmt.eur(r.projNetProfit)} level={capGood(levelOf.profit(r.projNetProfit), r)} sub={r.projTax > 0 ? `Después de ${fmt.eur(r.projTax)} de impuestos` : undefined} />
      </div>

      <div className="rounded-sm border border-sw-line bg-sw-bg-0 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-semibold text-sw-fg-1">
            Mes a mes {button}
          </span>
          <label className="flex w-full items-center gap-3 text-sm text-sw-fg-3 sm:w-auto">
            <span className="shrink-0">Crecimiento esperado</span>
            <input
              type="range"
              min={-50}
              max={100}
              step={5}
              value={growth}
              onChange={(e) => set("growthPct", e.target.value, true)}
              className="w-full accent-[#7CB3E0] sm:w-40"
              aria-label="Crecimiento esperado en %"
            />
            <span className="w-12 shrink-0 text-right font-semibold tabular-nums text-sw-fg-1">
              {growth > 0 ? "+" : ""}
              {growth}%
            </span>
          </label>
        </div>
        {panel}

        <div className="mb-2 h-10 text-sm" aria-live="polite">
          {shown ? (
            <p>
              <span className="font-semibold capitalize text-sw-fg-1">{MONTHS_LONG[shown.monthIndex]}</span>
              <span className="text-sw-fg-3"> · ingresos </span>
              <span className="tabular-nums text-sw-fg-1">{fmt.eur(shown.revenue)}</span>
              <span className="text-sw-fg-3"> · beneficio </span>
              <span className={`font-semibold tabular-nums ${shown.profitBeforeTax >= 0 ? "text-sw-success" : "text-sw-danger"}`}>{fmt.eur(shown.profitBeforeTax)}</span>
            </p>
          ) : (
            <p className="text-sw-fg-4">Toca o pasa el ratón por un mes para ver el detalle.</p>
          )}
        </div>

        {/* Ingresos */}
        <p className="mb-1 text-xs text-sw-fg-4">Ingresos netos</p>
        <div className="flex h-28 items-end gap-[2px] sm:gap-1">
          {r.projection.map((p, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`${MONTHS_LONG[p.monthIndex]}: ingresos ${fmt.eur(p.revenue)}, beneficio ${fmt.eur(p.profitBeforeTax)}`}
              className="flex h-full flex-1 items-end"
            >
              <span
                className={`block w-full rounded-t-[4px] transition-opacity ${active === null || active === i ? "opacity-100" : "opacity-40"}`}
                style={{ height: `${Math.max(2, (p.revenue / maxRev) * 100)}%`, background: "#7CB3E0" }}
              />
            </button>
          ))}
        </div>

        {/* Beneficio: la línea de cero se coloca según haya meses en pérdida o no */}
        <p className="mb-1 mt-4 text-xs text-sw-fg-4">Beneficio antes de impuestos</p>
        <div className="relative flex h-24 gap-[2px] sm:gap-1">
          <div className="pointer-events-none absolute inset-x-0 h-px bg-sw-line-strong" style={{ top: `${zeroTop}%` }} aria-hidden="true" />
          {r.projection.map((p, i) => {
            const positive = p.profitBeforeTax >= 0
            const h = (Math.abs(p.profitBeforeTax) / span) * 100
            return (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="relative h-full flex-1"
              >
                <span
                  className={`absolute inset-x-0 block transition-opacity ${positive ? "rounded-t-[4px] bg-sw-success" : "rounded-b-[4px] bg-sw-danger"} ${
                    active === null || active === i ? "opacity-100" : "opacity-40"
                  }`}
                  style={positive ? { bottom: `${100 - zeroTop}%`, height: `${Math.max(1, h)}%` } : { top: `${zeroTop}%`, height: `${Math.max(1, h)}%` }}
                />
              </button>
            )
          })}
        </div>
        <div className="mt-1 flex gap-[2px] sm:gap-1">
          {r.projection.map((p, i) => (
            <span key={i} className={`flex-1 text-center font-mono text-[10px] ${active === i ? "text-sw-fg-1" : "text-sw-fg-4"}`}>
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileBar({ r, per }: { r: Results; per: string }) {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const el = document.getElementById("analisis")
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting || e.boundingClientRect.top < 0), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [r.hasData])
  if (!r.hasData) return null
  const level = levelOf.result(r.netProfit, r)
  const status = r.completeness.status
  const noSales = r.completeness.missing.includes("Ventas brutas")
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-sw-line-strong bg-sw-bg-0/95 backdrop-blur transition-transform lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs text-sw-fg-3">
            {status === "complete"
              ? `${r.netProfit >= 0 ? "Ganas" : "Pierdes"} ${per}`
              : `${status === "quick" ? "Estimación rápida" : "Estimación incompleta"} · ${r.netProfit >= 0 ? "ganaría" : "pierde"} ${per}`}
          </p>
          <p className={`break-words text-xl font-semibold tabular-nums ${LEVEL_STYLES[level].text}`}>{noSales ? "—" : fmt.eur(Math.abs(r.netProfit))}</p>
        </div>
        <a href="#analisis" className="flex shrink-0 items-center gap-1.5 rounded-sm bg-sw-secondary-strong px-4 py-2.5 text-sm font-semibold text-white">
          Ver análisis
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
