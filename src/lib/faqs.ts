import { FAQ } from '@/interfaces/faq';
import { AFTER_DELIVERY_ANSWER, MONTHLY_PAYMENT_TERMS, PAYMENT_TERMS, SUPPORT_DAYS } from './commitments';

// Preguntas que se repiten en la home y en la migración.
// "¿Cómo se paga?" solo aparece si PAYMENT_TERMS tiene valor.
const ownershipFAQsEs: FAQ[] = [
  {
    id: 'shared-orders',
    question: '¿Pierdo mis pedidos, clientes o historial de ventas?',
    answer: 'No. Migro tus productos, clientes y pedidos para que sigas teniendo todo tu historial en Shopify.'
  },
  {
    id: 'shared-payments',
    question: '¿Seguirán funcionando mis pagos, envíos y apps?',
    answer: 'Configuro los métodos de pago (tarjeta, Bizum y los que uses), los envíos y las apps que necesites, y lo pruebo todo antes del cambio.'
  },
  {
    id: 'shared-owner',
    question: '¿La tienda queda a mi nombre?',
    answer: 'Sí. La cuenta de Shopify, el dominio y todo lo que construyo son tuyos. No dependes de mí para seguir funcionando.'
  },
  {
    id: 'shared-costs',
    question: '¿Qué pagaré después, además de mi trabajo?',
    answer: 'El plan mensual de Shopify y, si las usas, alguna app. Te lo detallo en el presupuesto para que no haya sorpresas.'
  },
  ...(PAYMENT_TERMS.es
    ? [{ id: 'shared-pay', question: '¿Cómo se paga?', answer: `${PAYMENT_TERMS.es}.` }]
    : []),
];

const ownershipFAQsEn: FAQ[] = [
  {
    id: 'shared-orders',
    question: 'Will I lose my orders, customers or sales history?',
    answer: 'No. I migrate your products, customers and orders so you keep your full history in Shopify.'
  },
  {
    id: 'shared-payments',
    question: 'Will my payments, shipping and apps keep working?',
    answer: 'I set up the payment methods (cards, Bizum and whatever you use), shipping and the apps you need, and I test everything before the switch.'
  },
  {
    id: 'shared-owner',
    question: 'Is the store in my name?',
    answer: 'Yes. The Shopify account, the domain and everything I build are yours. You don\'t depend on me to keep it running.'
  },
  {
    id: 'shared-costs',
    question: 'What will I pay afterwards, apart from my work?',
    answer: 'The monthly Shopify plan and, if you use them, a few apps. I spell it out in the quote so there are no surprises.'
  },
  ...(PAYMENT_TERMS.en
    ? [{ id: 'shared-pay', question: 'How do I pay?', answer: `${PAYMENT_TERMS.en}.` }]
    : []),
];

// FAQ de la home: seis preguntas. Las de migración siguen completas en su página.
const pick = (list: FAQ[], ids: string[]) => ids.map((id) => list.find((f) => f.id === id)).filter(Boolean) as FAQ[];

const homeBaseEs: FAQ[] = [
  {
    id: 'home-1',
    question: '¿Trabajáis por proyectos o con un servicio mensual?',
    answer: 'Trabajo de ambas formas. Podemos abordar una necesidad concreta como un proyecto puntual, con alcance y presupuesto cerrados, o trabajar de forma mensual para mejorar y desarrollar tu canal digital de manera continua. La modalidad depende de tus necesidades y objetivos.'
  },
  {
    id: 'home-lockin',
    question: '¿Hay permanencia?',
    answer: 'No. Los servicios mensuales se pagan mes a mes y se cancelan cuando quieras.'
  },
  {
    id: 'home-adspend',
    question: '¿La inversión en anuncios está incluida?',
    answer: 'No. La pagas directamente a Google y Meta; yo cobro solo la gestión.'
  },
  {
    id: 'home-design',
    question: '¿Haces diseño y contenido?',
    answer: 'Sí. Puedo ayudarte con el diseño de piezas gráficas, creatividades para campañas publicitarias, imágenes y contenido para tu tienda online. El objetivo es que tanto la parte visual como los mensajes estén alineados con la estrategia comercial y la identidad de tu negocio.'
  },
  {
    id: 'home-platforms',
    question: '¿Trabajas solo con Shopify?',
    answer: 'No. Shopify es mi especialidad en tiendas, pero también trabajo con WooCommerce, otros CMS y webs corporativas.'
  },
  {
    id: 'home-offline',
    question: '¿Trabajas con negocios que no venden online?',
    answer: 'Sí. Si captas clientes por internet (clínicas, academias, reformas, servicios profesionales…), me encargo de los anuncios, la web y el seguimiento de cada contacto.'
  },
  {
    id: 'home-owner',
    question: '¿De quién es la cuenta y lo que construyes?',
    answer: 'Tuyo. Las cuentas de anuncios, la tienda o la web, el dominio y todo lo que construyo quedan a tu nombre. No dependes de mí para seguir funcionando.'
  },
  {
    id: 'home-pay',
    question: '¿Cómo se paga?',
    answer: `Proyectos: ${PAYMENT_TERMS.es}. Servicios mensuales: ${MONTHLY_PAYMENT_TERMS.es}.`
  },
  {
    id: 'home-2',
    question: '¿Cuánto tarda?',
    answer: 'Depende del alcance. La fecha queda por escrito antes de empezar. Por ejemplo, una migración a Shopify suele llevar unas 3 semanas.'
  },
  {
    id: 'home-5',
    question: '¿Hablo con un comercial?',
    answer: 'No. Hablas directamente conmigo, sin comerciales ni intermediarios.'
  },
  {
    id: 'home-6',
    question: '¿Me garantizas resultados de ventas?',
    answer: 'No sería honesto garantizar una cifra de ventas o contactos. El crecimiento de un negocio depende de muchos factores y no es posible predecir con certeza cómo responderá el mercado. Mi compromiso es trabajar con un método, medir los resultados y tomar decisiones basadas en datos para mejorar el rendimiento del canal digital.'
  },
];

const homeBaseEn: FAQ[] = [
  {
    id: 'home-1',
    question: 'Do you work on projects or as a monthly service?',
    answer: 'Both. We can tackle a specific need as a one-off project, with a fixed scope and budget, or work monthly to improve and develop your digital channel on an ongoing basis. The format depends on your needs and goals.'
  },
  {
    id: 'home-lockin',
    question: 'Is there a lock-in?',
    answer: 'No. Monthly services are paid month to month and can be cancelled whenever you want.'
  },
  {
    id: 'home-adspend',
    question: 'Is the ad spend included?',
    answer: 'No. You pay it directly to Google and Meta; I only charge for the management.'
  },
  {
    id: 'home-design',
    question: 'Do you do design and content?',
    answer: 'Yes. I can help you with graphic design, ad creatives for your campaigns, and images and content for your online store. The goal is for both the visuals and the messaging to be aligned with your sales strategy and your brand identity.'
  },
  {
    id: 'home-platforms',
    question: 'Do you only work with Shopify?',
    answer: 'No. Shopify is my speciality for online stores, but I also work with WooCommerce, other CMSs and corporate websites.'
  },
  {
    id: 'home-offline',
    question: "Do you work with businesses that don't sell online?",
    answer: 'Yes. If you win clients online (clinics, academies, home renovation, professional services…), I take care of the ads, the website and the follow-up of every lead.'
  },
  {
    id: 'home-owner',
    question: 'Who owns the accounts and what you build?',
    answer: "You do. The ad accounts, the store or website, the domain and everything I build are in your name. You don't depend on me to keep it running."
  },
  {
    id: 'home-pay',
    question: 'How do I pay?',
    answer: `Projects: ${PAYMENT_TERMS.en}. Monthly services: ${MONTHLY_PAYMENT_TERMS.en}.`
  },
  {
    id: 'home-2',
    question: 'How long does it take?',
    answer: 'It depends on the scope. The date is agreed in writing before we start. For example, a migration to Shopify usually takes about 3 weeks.'
  },
  {
    id: 'home-5',
    question: 'Will I be talking to a sales rep?',
    answer: "No. You talk directly to me, with no sales reps or middlemen."
  },
  {
    id: 'home-6',
    question: 'Do you guarantee sales results?',
    answer: "It wouldn't be honest to guarantee a figure for sales or leads. A business's growth depends on many factors, and there's no way to predict with certainty how the market will respond. My commitment is to work with a method, measure the results and make data-driven decisions to improve the performance of the digital channel."
  },
];

const HOME_ORDER = ['home-1', 'home-lockin', 'home-adspend', 'home-design', 'home-platforms', 'home-offline', 'home-2', 'home-5', 'home-owner', 'home-6', 'home-pay'];

export const HomeFAQsEs: FAQ[] = pick([...homeBaseEs, ...ownershipFAQsEs], HOME_ORDER);
export const HomeFAQsEn: FAQ[] = pick([...homeBaseEn, ...ownershipFAQsEn], HOME_ORDER);

// FAQ — Tienda nueva
export const newStoreFAQsEs: FAQ[] = [
  {
    id: 'new-store-platforms',
    question: '¿Trabajas solo con Shopify?',
    answer: 'No. Shopify es mi especialidad en tiendas, pero también trabajo con WooCommerce y otros CMS. Te recomiendo la plataforma que mejor encaje con tu negocio.'
  },
  {
    id: 'new-store-1',
    question: '¿Necesito tener ya mi marca, fotos y textos?',
    answer: 'Necesito tu logo, las fotos de producto y la información básica de cada producto. Si te falta algo, lo vemos en la primera reunión.'
  },
  {
    id: 'new-store-2',
    question: '¿Cuánto tarda?',
    answer: 'Depende del catálogo y de lo que necesites. La fecha queda por escrito antes de empezar.'
  },
  {
    id: 'new-store-3',
    question: '¿Cuánto cuesta?',
    answer: 'Depende de lo que necesites. Después de la primera reunión te doy un precio cerrado, por escrito.'
  },
  {
    id: 'new-store-4',
    question: '¿Qué pagaré después?',
    answer: 'El plan mensual de Shopify y, si las usas, alguna app. Te lo detallo en el presupuesto.'
  },
  {
    id: 'new-store-5',
    question: '¿Y después de lanzar?',
    answer: AFTER_DELIVERY_ANSWER.es
  },
];

export const newStoreFAQsEn: FAQ[] = [
  {
    id: 'new-store-en-platforms',
    question: 'Do you only work with Shopify?',
    answer: 'No. Shopify is my speciality for online stores, but I also work with WooCommerce and other CMSs. I recommend the platform that best fits your business.'
  },
  {
    id: 'new-store-en-1',
    question: 'Do I need to have my brand, photos and copy ready?',
    answer: 'I need your logo, the product photos and the basic information for each product. If anything is missing, we go through it in the first meeting.'
  },
  {
    id: 'new-store-en-2',
    question: 'How long does it take?',
    answer: 'It depends on the catalogue and what you need. The date is agreed in writing before we start.'
  },
  {
    id: 'new-store-en-3',
    question: 'How much does it cost?',
    answer: 'It depends on what you need. After the first meeting I give you a fixed price, in writing.'
  },
  {
    id: 'new-store-en-4',
    question: 'What will I pay afterwards?',
    answer: 'The monthly Shopify plan and, if you use them, a few apps. I spell it out in the quote.'
  },
  {
    id: 'new-store-en-5',
    question: 'And after launch?',
    answer: AFTER_DELIVERY_ANSWER.en
  },
];

// FAQ — Migración a Shopify
export const migrationFAQsEs: FAQ[] = [
  {
    id: 'migration-1',
    question: '¿Tengo que cerrar la tienda durante la migración?',
    answer: 'No. Tu tienda actual sigue vendiendo mientras preparo la nueva. Solo hacemos el cambio cuando todo está revisado.'
  },
  {
    id: 'migration-2',
    question: '¿Qué pasa con mi posicionamiento en Google?',
    answer: 'Mantengo las URLs cuando es posible y configuro redirecciones 301 para conservar el posicionamiento que ya tienes.'
  },
  {
    id: 'migration-3',
    question: '¿Cuánto tarda?',
    answer: 'Aproximadamente 3 semanas. Depende sobre todo del tamaño del catálogo; te doy la fecha exacta antes de empezar.'
  },
  {
    id: 'migration-4',
    question: '¿Cuánto cuesta?',
    answer: 'Depende de tu tienda, por eso no publico una cifra. Empezamos con una reunión gratis en la que veo tu tienda, y te doy un precio cerrado antes de empezar. Incluye dos revisiones de diseño.'
  },
  {
    id: 'migration-5',
    question: '¿Desde qué plataformas migras?',
    answer: 'WooCommerce/WordPress, PrestaShop, Wix, Magento y otras. Si la tuya no está en la lista, escríbeme.'
  },
  {
    id: 'migration-6',
    question: '¿Qué pasa cuando termina la migración?',
    answer: 'Tu tienda ya está en Shopify y con las mejoras hechas. Después, puedo llevar tus anuncios y seguir mejorándola cada mes con el acompañamiento mensual.'
  },
  ...ownershipFAQsEs,
];

export const migrationFAQsEn: FAQ[] = [
  {
    id: 'migration-en-1',
    question: 'Do I have to close my store during the migration?',
    answer: 'No. Your current store keeps selling while I build the new one. We only switch once everything has been checked.'
  },
  {
    id: 'migration-en-2',
    question: 'What happens to my Google rankings?',
    answer: 'I keep URLs whenever possible and set up 301 redirects to preserve the rankings you already have.'
  },
  {
    id: 'migration-en-3',
    question: 'How long does it take?',
    answer: 'About 3 weeks. It mostly depends on the size of the catalogue; I give you the exact date before we start.'
  },
  {
    id: 'migration-en-4',
    question: 'How much does it cost?',
    answer: 'It depends on your store, which is why I don\'t publish a figure. We start with a free meeting where I look at your store, and I give you a fixed price before we start. It includes two design revisions.'
  },
  {
    id: 'migration-en-5',
    question: 'Which platforms do you migrate from?',
    answer: 'WooCommerce/WordPress, PrestaShop, Wix, Magento and others. If yours isn\'t on the list, get in touch.'
  },
  {
    id: 'migration-en-6',
    question: 'What happens when the migration is done?',
    answer: 'Your store is on Shopify with the improvements done. After that, I can run your ads and keep improving it every month with monthly support.'
  },
  ...ownershipFAQsEn,
];

// FAQ — Acompañamiento mensual (/mejora-continua). Sin precio publicado.
export const monthlyFAQsEs: FAQ[] = [
  {
    id: 'monthly-1',
    question: '¿Tiene permanencia?',
    answer: 'No. Pagas mes a mes, por adelantado al inicio de cada mes, y cancelas cuando quieras.'
  },
  {
    id: 'monthly-price',
    question: '¿Cuánto cuesta?',
    answer: 'Depende de lo que incluya: anuncios, mejoras técnicas o ambas cosas. Tras la primera reunión te envío una propuesta a medida con el precio por escrito.'
  },
  {
    id: 'monthly-2',
    question: '¿De dónde salen las mejoras?',
    answer: 'De los datos: los resultados de tus anuncios, grabaciones de sesiones reales en tu web, tus datos de negocio como ventas, leads o márgenes, y buenas prácticas. Con eso veo qué funciona, dónde se pierden oportunidades y qué conviene priorizar.'
  },
  {
    id: 'monthly-3',
    question: '¿Me garantizas resultados?',
    answer: 'No sería honesto garantizar una cifra de ventas o contactos. El crecimiento de un negocio depende de muchos factores y no es posible predecir con certeza cómo responderá el mercado. Mi compromiso es trabajar con un método, medir los resultados y tomar decisiones basadas en datos para mejorar el rendimiento del canal digital.'
  },
  {
    id: 'monthly-extra',
    question: '¿Trabajáis por proyectos o con un servicio mensual?',
    answer: 'Trabajo de ambas formas. Podemos abordar una necesidad concreta como un proyecto puntual, con alcance y presupuesto cerrados, o trabajar de forma mensual para mejorar y desarrollar tu canal digital de manera continua. La modalidad depende de tus necesidades y objetivos.'
  },
  {
    id: 'monthly-adspend',
    question: '¿La inversión en anuncios está incluida?',
    answer: 'No. La pagas tú directamente a cada plataforma; yo cobro solo la gestión.'
  },
];

export const monthlyFAQsEn: FAQ[] = [
  {
    id: 'monthly-en-1',
    question: 'Is there a lock-in?',
    answer: 'No. You pay month to month, in advance at the start of each month, and cancel whenever you want.'
  },
  {
    id: 'monthly-en-price',
    question: 'How much does it cost?',
    answer: 'It depends on what it includes: ads, technical improvements or both. After the first meeting I send you a tailored proposal with the price in writing.'
  },
  {
    id: 'monthly-en-2',
    question: 'Where do the improvements come from?',
    answer: 'From data: your ad results, real session recordings on your website, your business data such as sales, leads or margins, and best practices. That shows me what works, where opportunities are lost and what to prioritise.'
  },
  {
    id: 'monthly-en-3',
    question: 'Do you guarantee results?',
    answer: "It wouldn't be honest to guarantee a figure for sales or leads. A business's growth depends on many factors, and there's no way to predict with certainty how the market will respond. My commitment is to work with a method, measure the results and make data-driven decisions to improve the performance of the digital channel."
  },
  {
    id: 'monthly-en-extra',
    question: 'Do you work on projects or as a monthly service?',
    answer: 'Both. We can tackle a specific need as a one-off project, with a fixed scope and budget, or work monthly to improve and develop your digital channel on an ongoing basis. The format depends on your needs and goals.'
  },
  {
    id: 'monthly-en-adspend',
    question: 'Is the ad spend included?',
    answer: 'No. You pay it directly to each platform; I only charge for the management.'
  },
];

// FAQ — Anuncios
export const adsFAQsEs: FAQ[] = [
  {
    id: 'ads-1',
    question: '¿Cuánto cuesta?',
    answer: 'Depende del número de campañas y plataformas. Te envío una propuesta a medida tras la primera reunión. La inversión la pagas tú directamente a cada plataforma.'
  },
  {
    id: 'ads-2',
    question: '¿De quién son las cuentas?',
    answer: 'Tuyas. Trabajo con acceso a tus cuentas de Google y Meta.'
  },
  {
    id: 'ads-3',
    question: '¿Haces las creatividades?',
    answer: 'Sí, puedo hacer las creatividades para tus campañas, alineadas con tu estrategia comercial y la identidad de tu negocio. No están incluidas en la gestión de anuncios: se presupuestan aparte.'
  },
  {
    id: 'ads-4',
    question: '¿Garantizas resultados?',
    answer: 'No sería honesto garantizar una cifra de ventas o contactos. El crecimiento de un negocio depende de muchos factores y no es posible predecir con certeza cómo responderá el mercado. Mi compromiso es trabajar con un método, medir los resultados y tomar decisiones basadas en datos para mejorar el rendimiento del canal digital.'
  },
  {
    id: 'ads-5',
    question: '¿Hay permanencia?',
    answer: 'No. Pagas mes a mes.'
  },
];

export const adsFAQsEn: FAQ[] = [
  {
    id: 'ads-en-1',
    question: 'How much does it cost?',
    answer: 'It depends on the number of campaigns and platforms. I send you a tailored proposal after the first meeting. You pay the ad spend directly to each platform.'
  },
  {
    id: 'ads-en-2',
    question: 'Who owns the accounts?',
    answer: 'You do. I work with access to your Google and Meta accounts.'
  },
  {
    id: 'ads-en-3',
    question: 'Do you make the creatives?',
    answer: "Yes, I can make the creatives for your campaigns, aligned with your sales strategy and your brand identity. They aren't included in ads management: they're quoted separately."
  },
  {
    id: 'ads-en-4',
    question: 'Do you guarantee results?',
    answer: "It wouldn't be honest to guarantee a figure for sales or leads. A business's growth depends on many factors, and there's no way to predict with certainty how the market will respond. My commitment is to work with a method, measure the results and make data-driven decisions to improve the performance of the digital channel."
  },
  {
    id: 'ads-en-5',
    question: 'Is there a lock-in?',
    answer: 'No. You pay month to month.'
  },
];

// FAQ — Desarrollo a medida
export const customDevFAQsEs: FAQ[] = [
  {
    id: 'custom-dev-1',
    question: '¿Qué tipo de proyectos entran en desarrollo a medida?',
    answer: 'Integraciones con otras herramientas, automatizaciones y funcionalidades que no existen como app o necesitan lógica propia.'
  },
  {
    id: 'custom-dev-2',
    question: '¿Cómo se presupuesta?',
    answer: 'Evalúo el alcance y te doy un presupuesto cerrado antes de empezar, sin sorpresas a mitad de proyecto.'
  },
  {
    id: 'custom-dev-3',
    question: '¿Qué pasa si durante el proyecto cambia lo que necesitas?',
    answer: 'Lo hablamos antes de tocar nada: si el cambio es menor, lo asumo; si es importante, ajusto el presupuesto antes de seguir.'
  },
  {
    id: 'custom-dev-4',
    question: '¿El código es mío?',
    answer: 'Sí. Todo lo que desarrollo para tu negocio es tuyo y queda documentado.'
  },
  {
    id: 'custom-dev-5',
    question: '¿Qué pasa si una plataforma se actualiza o algo deja de funcionar?',
    answer: SUPPORT_DAYS
      ? `Durante ${SUPPORT_DAYS} días arreglo sin coste cualquier fallo de mi trabajo. Después, el mantenimiento puede entrar en el acompañamiento mensual.`
      : 'Si algo falla por mi trabajo, lo arreglo. Después, el mantenimiento puede entrar en el acompañamiento mensual.'
  },
  {
    id: 'custom-dev-6',
    question: '¿Cómo sé si lo que necesito es viable?',
    answer: 'Cuéntamelo en una reunión gratis y te digo si se puede hacer, cuánto cuesta y cuánto tarda.'
  },
];

export const customDevFAQsEn: FAQ[] = [
  {
    id: 'custom-dev-en-1',
    question: 'What kind of projects count as custom development?',
    answer: 'Integrations with other tools, automations, and functionality that doesn\'t exist as an app or needs its own logic.'
  },
  {
    id: 'custom-dev-en-2',
    question: 'How is it priced?',
    answer: 'I assess the scope and give you a fixed quote before starting, with no surprises halfway through.'
  },
  {
    id: 'custom-dev-en-3',
    question: 'What if what you need changes during the project?',
    answer: 'We talk it through before touching anything: if the change is small, I absorb it; if it\'s significant, I adjust the quote before carrying on.'
  },
  {
    id: 'custom-dev-en-4',
    question: 'Is the code mine?',
    answer: 'Yes. Everything I build for your business is yours, and it\'s documented.'
  },
  {
    id: 'custom-dev-en-5',
    question: 'What if a platform updates or something stops working?',
    answer: SUPPORT_DAYS
      ? `For ${SUPPORT_DAYS} days I fix any fault in my work free of charge. After that, maintenance can be part of monthly support.`
      : 'If something breaks because of my work, I fix it. After that, maintenance can be part of monthly support.'
  },
  {
    id: 'custom-dev-en-6',
    question: 'How do I know if what I need is feasible?',
    answer: 'Tell me about it in a free meeting and I\'ll tell you whether it can be done, what it costs and how long it takes.'
  },
];
