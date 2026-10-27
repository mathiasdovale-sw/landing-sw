// Explicación de cada concepto: qué significa y cómo se calcula.
// Se muestra al tocar el icono (?) junto a cada dato o resultado.

export interface Concept {
  label: string
  what: string
  how?: string
}

export const CONCEPTS: Record<string, Concept> = {
  // ---- Entradas ----------------------------------------------------------
  period: {
    label: "Periodo de tus datos",
    what: "Cuántos meses de datos vas a meter. Con más meses el resultado es más fiable, porque se suavizan meses buenos y malos.",
    how: "Mete el total de todo el periodo en cada campo (no la media mensual). Si eliges menos de 12 meses, usamos la estacionalidad para estimar el año completo.",
  },
  seasonality: {
    label: "Estacionalidad",
    what: "Cómo se reparten tus ventas a lo largo del año. No es lo mismo tener datos de noviembre (Black Friday) que de febrero.",
    how: "Los perfiles son orientativos. Si conoces tu curva, elige «Personalizado» y ajusta el peso de cada mes (1 = mes normal, 2 = el doble de ventas, 0,5 = la mitad).",
  },
  vat: {
    label: "IVA en tus cifras de ventas",
    what: "El IVA que cobras no es tuyo: lo recaudas para Hacienda. Por eso todo el cálculo se hace sin IVA.",
    how: "Cada plataforma o programa de facturación lo muestra a su manera: algunos informes dan las ventas con IVA incluido y otros sin él. Revisa el tuyo (suele indicarlo junto a la cifra o en una línea aparte de «impuestos») y elige la opción que corresponda.",
  },
  grossSales: {
    label: "Ventas brutas",
    what: "Lo que facturaste por productos antes de restar descuentos y devoluciones. Sin envíos.",
    how: "Precio de venta × unidades vendidas.",
  },
  discounts: {
    label: "Descuentos",
    what: "Todo el dinero que dejaste de cobrar por códigos, rebajas automáticas o promociones.",
  },
  returns: {
    label: "Devoluciones",
    what: "El importe que devolviste a clientes por reembolsos o devoluciones.",
  },
  shippingCharged: {
    label: "Envíos cobrados a clientes",
    what: "Lo que pagaron tus clientes por el envío. Si ofreces envío gratis, aquí va 0.",
  },
  orders: {
    label: "Pedidos",
    what: "Número de pedidos del periodo.",
  },
  sessions: {
    label: "Sesiones",
    what: "Número de visitas a tu tienda. Una misma persona puede hacer varias sesiones.",
    how: "Lo encuentras en los informes de tu plataforma o en Google Analytics.",
  },
  newCustomers: {
    label: "Clientes nuevos",
    what: "Personas que compraron por primera vez en el periodo.",
  },
  returningCustomers: {
    label: "Clientes recurrentes",
    what: "Clientes que ya te habían comprado antes y volvieron a comprar en el periodo.",
  },
  cogs: {
    label: "Coste de producto",
    what: "Lo que te cuesta lo que vendes: compra o fabricación del producto, sin IVA.",
    how: "Puedes meterlo en euros (total del periodo) o como % sobre tus ventas netas sin IVA. Ej.: si un producto se vende a 100 € sin IVA y te cuesta 35 €, son un 35 %.",
  },
  shippingPaid: {
    label: "Envíos pagados",
    what: "Lo que pagaste a transportistas (Correos, SEUR, GLS…) por enviar los pedidos, sin IVA.",
  },
  packaging: {
    label: "Packaging",
    what: "Cajas, bolsas, relleno, etiquetas, tarjetas… todo lo que va en el paquete. Total del periodo, sin IVA.",
  },
  fees: {
    label: "Comisiones de pasarela de pago",
    what: "Lo que te cobra tu pasarela o TPV virtual (Stripe, PayPal, Redsys, el sistema de pagos de tu plataforma…) por cada cobro.",
    how: "En euros (total del periodo) o como % + importe fijo por pedido. El % se aplica sobre lo que paga el cliente (con IVA y envío), que es sobre lo que cobran las pasarelas.",
  },
  ads: {
    label: "Publicidad (Ads)",
    what: "Lo que invertiste en cada plataforma y las ventas que esa plataforma dice haber generado.",
    how: "Las ventas atribuidas son las que reporta la propia plataforma (Meta Ads, Google Ads, TikTok Ads…). Suelen ser optimistas.",
  },
  emailTool: {
    label: "Email marketing",
    what: "Coste de tu herramienta (Klaviyo, Mailchimp, Brevo…) y las ventas que esa herramienta te atribuye.",
  },
  otherMarketing: {
    label: "Otros gastos de marketing",
    what: "Influencers, agencias, colaboraciones, regalos de producto… cualquier gasto para conseguir ventas que no sea publicidad ni email.",
  },
  platformCost: {
    label: "Plataforma, hosting y apps",
    what: "Lo que pagas por tener la tienda funcionando: suscripción a la plataforma, hosting, dominio, plantilla, plugins o apps de pago y mantenimiento. Total del periodo, sin IVA.",
  },
  otherFixed: {
    label: "Otros gastos fijos",
    what: "Lo que pagas vendas o no: sueldos, autónomo, alquiler, gestoría, software, seguros…",
  },
  profitTax: {
    label: "Impuesto sobre el beneficio",
    what: "El % que pagas sobre lo que ganas. Si eres autónomo, tu tramo aproximado de IRPF; si tienes una SL, el impuesto de sociedades.",
    how: "Solo se aplica si hay beneficio. Si no lo sabes, pregúntale a tu gestor. Déjalo en 0 para ver el resultado antes de impuestos.",
  },
  firstOrderAov: {
    label: "Ticket medio del primer pedido",
    what: "Lo que gasta de media un cliente nuevo en su primera compra, antes del descuento de bienvenida. Suele ser más bajo que el de los clientes que repiten.",
    how: "Si lo dejas vacío usamos tu ticket medio general. Sin IVA (o con IVA si así indicaste tus ventas).",
  },
  welcomeDiscount: {
    label: "Descuento de bienvenida",
    what: "El % de descuento que das en la primera compra (por ejemplo, un 10 % por suscribirse a la newsletter).",
    how: "Si tu ticket medio general ya incluye ese descuento y no has puesto un ticket propio para el primer pedido, déjalo en 0 para no contarlo dos veces.",
  },
  firstOrderProfit: {
    label: "Beneficio en la primera compra",
    what: "Lo que ganas o pierdes con el primer pedido de un cliente nuevo después de pagar lo que te costó conseguirlo. Muchas tiendas pierden dinero aquí y lo recuperan con las siguientes compras.",
    how: "Lo que deja el primer pedido antes de marketing − CAC.",
  },
  ordersToRecoverCac: {
    label: "Pedidos para recuperar el CAC",
    what: "Cuántos pedidos tiene que hacerte un cliente nuevo para que recuperes lo que te costó conseguirlo. Menos de 1: lo recuperas con el primero.",
    how: "Si la primera compra deja beneficio: CAC ÷ margen del primer pedido. Si no: 1 + pérdida de la primera compra ÷ margen por pedido.",
  },
  ltvFrequency: {
    label: "Pedidos por cliente al año",
    what: "Cuántas veces de media te compra un cliente en 12 meses. Es el dato clave para el LTV y el más difícil de saber.",
    how: "Pedidos de los últimos 12 meses ÷ clientes únicos de esos 12 meses. Si metes 12 meses de datos lo estimamos con tus pedidos y clientes.",
  },

  // ---- Resultados --------------------------------------------------------
  netProductSales: {
    label: "Ventas netas",
    what: "Lo que de verdad vendiste en producto.",
    how: "Ventas brutas − descuentos − devoluciones (sin IVA).",
  },
  netRevenue: {
    label: "Ingresos netos",
    what: "Todo lo que entra en tu negocio por ventas, ya sin IVA. Es la base de casi todos los cálculos.",
    how: "Ventas netas + envíos cobrados (sin IVA).",
  },
  vatCollected: {
    label: "IVA cobrado",
    what: "Lo que cobraste de IVA a tus clientes. No es tuyo: lo ingresas a Hacienda (menos el IVA de tus compras).",
    how: "Ingresos netos × tipo de IVA.",
  },
  variableCosts: {
    label: "Costes variables",
    what: "Lo que cuesta servir cada pedido. Si vendes más, suben; si vendes menos, bajan.",
    how: "Producto + envíos pagados + packaging + comisiones de pasarela.",
  },
  cm1: {
    label: "Margen antes de marketing",
    what: "Lo que te queda de tus ventas después de pagar producto, envío, packaging y pasarela.",
    how: "Ingresos netos − costes variables.",
  },
  cm1PerEuro: {
    label: "Lo que te queda por cada € vendido",
    what: "De cada euro de venta neta, cuánto queda para pagar marketing, fijos y, al final, para ti. Cuanto más alto, más margen tienes para invertir en crecer.",
    how: "Margen antes de marketing ÷ ingresos netos.",
  },
  contribution: {
    label: "Margen de contribución (€)",
    what: "Lo que te dejan tus ventas después de pagar todo lo que depende de vender: costes variables y marketing. Con esto pagas los fijos.",
    how: "Ingresos netos − costes variables − marketing.",
  },
  contributionPct: {
    label: "Margen de contribución (%)",
    what: "El mismo margen de contribución, como porcentaje de tus ingresos.",
    how: "Margen de contribución ÷ ingresos netos × 100.",
  },
  fixed: {
    label: "Gastos fijos",
    what: "Lo que pagas aunque no vendas nada.",
    how: "Plataforma, hosting y apps + otros gastos fijos.",
  },
  ebit: {
    label: "Beneficio antes de impuestos",
    how: "Margen de contribución − gastos fijos.",
    what: "Lo que gana (o pierde) el negocio antes de pagar el impuesto sobre el beneficio.",
  },
  netProfit: {
    label: "Beneficio neto",
    what: "Lo que de verdad te queda. Si es negativo, tu tienda te está costando dinero.",
    how: "Beneficio antes de impuestos − impuesto sobre el beneficio.",
  },
  aov: {
    label: "Ticket medio (AOV)",
    what: "Cuánto gasta de media un cliente en cada pedido (sin IVA ni envío).",
    how: "(Ventas brutas − descuentos) ÷ pedidos.",
  },
  conversionRate: {
    label: "Tasa de conversión",
    what: "De cada 100 visitas, cuántas terminan en compra. Es el mejor termómetro de lo bien que vende tu tienda.",
    how: "Pedidos ÷ sesiones × 100.",
  },
  rpv: {
    label: "Ingreso por visita (RPV)",
    what: "Cuánto dinero genera de media cada visita. Junta en un solo número conversión y ticket medio.",
    how: "(Ventas brutas − descuentos) ÷ sesiones. También = tasa de conversión × ticket medio.",
  },
  returningShare: {
    label: "Clientes recurrentes",
    what: "Qué parte de tus compradores ya te había comprado antes. Un cliente que repite no cuesta captarlo otra vez.",
    how: "Clientes recurrentes ÷ (nuevos + recurrentes) × 100.",
  },
  cm1PerOrder: {
    label: "Margen por pedido",
    what: "Lo que te deja cada pedido antes de marketing.",
    how: "Margen antes de marketing ÷ pedidos.",
  },
  roas: {
    label: "ROAS",
    what: "Cuántos euros de venta te devuelve cada euro invertido en esa plataforma, según la propia plataforma.",
    how: "Ventas atribuidas (sin IVA) ÷ inversión en esa plataforma.",
  },
  roasBreakeven: {
    label: "ROAS breakeven",
    what: "El ROAS mínimo para no perder dinero con la publicidad: por debajo, cada euro en anuncios te cuesta más de lo que te deja.",
    how: "1 ÷ (lo que te queda por cada € vendido) = ingresos netos ÷ margen antes de marketing.",
  },
  mer: {
    label: "MER (Marketing Efficiency Ratio)",
    what: "Cuánto vendes en total por cada euro de marketing. No depende de lo que diga cada plataforma, por eso es más fiable que el ROAS.",
    how: "Ingresos netos ÷ gasto total en marketing (ads + email + otros). Se compara con el ROAS breakeven.",
  },
  cac: {
    label: "CAC (coste de adquisición)",
    what: "Cuánto te cuesta conseguir un cliente nuevo.",
    how: "Gasto total en marketing ÷ clientes nuevos.",
  },
  emailRoas: {
    label: "ROAS del email",
    what: "Cuánto vendes por email por cada euro que pagas por la herramienta.",
    how: "Ventas atribuidas a email (sin IVA) ÷ coste de la herramienta.",
  },
  attribution: {
    label: "De dónde vienen tus ventas",
    what: "Reparto de tus ingresos según lo que dicen las plataformas. El «resto» es orgánico (Google sin pagar, redes), directo (escriben tu web), boca a boca y otros.",
    how: "Resto = ingresos netos − ventas atribuidas a ads − ventas atribuidas a email. Si las plataformas suman más que tus ventas reales, se están pisando.",
  },
  ltvRevenue: {
    label: "LTV 12 meses (ventas)",
    what: "Cuánto te compra de media un cliente en un año.",
    how: "Ticket medio neto (después de devoluciones) × pedidos por cliente al año.",
  },
  ltvMargin: {
    label: "LTV 12 meses (margen)",
    what: "Cuánto margen te deja un cliente en un año, antes de marketing. Es lo máximo que podrías pagar por captarlo sin perder dinero.",
    how: "Margen por pedido × pedidos por cliente al año.",
  },
  ltvCac: {
    label: "LTV:CAC",
    what: "Cuántas veces recuperas lo que te cuesta captar un cliente. Por debajo de 1 pierdes dinero con cada cliente nuevo; por encima de 3 suele considerarse sano.",
    how: "LTV en margen ÷ CAC.",
  },
  breakevenRevenue: {
    label: "Punto de equilibrio",
    what: "Los ingresos netos que necesitas para no ganar ni perder, con tu gasto actual en marketing y fijos.",
    how: "(Marketing + fijos) ÷ lo que te queda por cada € vendido.",
  },
  projection: {
    label: "Proyección a 12 meses",
    what: "Cómo quedaría tu próximo año si todo sigue igual, repartido según tu estacionalidad.",
    how: "Ventas, costes variables y publicidad se anualizan con la estacionalidad (y el crecimiento que indiques); fijos y herramienta de email se reparten igual cada mes. Suponemos que la publicidad crece al mismo ritmo que las ventas.",
  },
  per100: {
    label: "¿A dónde va cada 100 €?",
    what: "Por cada 100 € que ingresas (sin IVA), cuánto se va en cada partida y cuánto te queda.",
  },
}
