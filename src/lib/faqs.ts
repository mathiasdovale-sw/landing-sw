import { FAQ } from '@/interfaces/faq';
import { AFTER_DELIVERY_ANSWER, PAYMENT_TERMS, SUPPORT_DAYS } from './commitments';

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
    question: '¿Cuánto cuesta?',
    answer: 'Depende de lo que necesites. Después de la primera reunión te doy un precio cerrado, por escrito, antes de empezar. Sin sorpresas.'
  },
  {
    id: 'home-2',
    question: '¿Cuánto tarda?',
    answer: 'Una migración suele llevar unas 3 semanas. Una tienda nueva o un desarrollo a medida, según el alcance; la fecha queda por escrito antes de empezar.'
  },
  {
    id: 'home-5',
    question: '¿Con quién hablo durante el proyecto?',
    answer: 'Conmigo, que soy quien lo construye. Sin comerciales ni intermediarios.'
  },
  {
    id: 'home-6',
    question: '¿Me garantizas resultados de ventas?',
    answer: 'No, y desconfía de quien lo haga. Lo que sí te garantizo es lo que controlo: precio cerrado, fecha de entrega y que lo que construyo funcione.'
  },
];

const homeBaseEn: FAQ[] = [
  {
    id: 'home-1',
    question: 'How much does it cost?',
    answer: 'It depends on what you need. After the first meeting I give you a fixed price, in writing, before we start. No surprises.'
  },
  {
    id: 'home-2',
    question: 'How long does it take?',
    answer: 'A migration usually takes about 3 weeks. A new store or custom development depends on the scope; the date is agreed in writing before we start.'
  },
  {
    id: 'home-5',
    question: 'Who do I talk to during the project?',
    answer: 'Me, the person building it. No sales reps, no middlemen.'
  },
  {
    id: 'home-6',
    question: 'Do you guarantee sales results?',
    answer: 'No, and be wary of anyone who does. What I do guarantee is what I control: a fixed price, a delivery date and that what I build works.'
  },
];

const HOME_ORDER = ['home-1', 'home-2', 'home-5', 'shared-owner', 'home-6', 'shared-pay'];

export const HomeFAQsEs: FAQ[] = pick([...homeBaseEs, ...ownershipFAQsEs], HOME_ORDER);
export const HomeFAQsEn: FAQ[] = pick([...homeBaseEn, ...ownershipFAQsEn], HOME_ORDER);

// FAQ — Tienda nueva
export const newStoreFAQsEs: FAQ[] = [
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
    answer: 'Tu tienda ya está en Shopify y con las mejoras hechas. Si quieres seguir mejorándola cada mes, el siguiente paso es la mejora continua.'
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
    answer: 'Your store is on Shopify with the improvements done. If you want to keep improving it every month, the next step is continuous improvement.'
  },
  ...ownershipFAQsEn,
];

// FAQ — Mejora continua (mensual)
export const monthlyFAQsEs: FAQ[] = [
  {
    id: 'monthly-1',
    question: '¿Tiene permanencia?',
    answer: 'No. Pagas mes a mes y cancelas cuando quieras.'
  },
  {
    id: 'monthly-2',
    question: '¿De dónde salen las mejoras?',
    answer: 'De buenas prácticas de experiencia de compra y de grabaciones de sesiones reales con Microsoft Clarity, que es gratis para ti.'
  },
  {
    id: 'monthly-3',
    question: '¿Me garantizas resultados?',
    answer: 'No. Lo que te garantizo es el trabajo: al menos 4 mejoras implementadas al mes y un informe de cómo evoluciona tu facturación por visita. El resultado se mira en tendencia, durante varios meses.'
  },
  {
    id: 'monthly-4',
    question: '¿Qué necesito para empezar?',
    answer: 'Empezamos con una reunión gratis para entender qué le pasa a tu tienda. Si encaja, necesito acceso a tu Shopify y el primer mes empiezo por lo que más frena tus ventas.'
  },
  {
    id: 'monthly-5',
    question: '¿Quién implementa las mejoras?',
    answer: 'Yo. Las mejoras del mes, al menos 4, están incluidas en la mensualidad.'
  },
  {
    id: 'monthly-6',
    question: '¿Y si no estoy en Shopify?',
    answer: 'Primero migro tu tienda a Shopify, con las mejoras ya hechas. Después seguimos con la mejora continua.'
  }
];

export const monthlyFAQsEn: FAQ[] = [
  {
    id: 'monthly-en-1',
    question: 'Is there a lock-in?',
    answer: 'No. You pay month to month and cancel whenever you want.'
  },
  {
    id: 'monthly-en-2',
    question: 'Where do the improvements come from?',
    answer: 'From shopping-experience best practices and real session recordings with Microsoft Clarity, which is free for you.'
  },
  {
    id: 'monthly-en-3',
    question: 'Do you guarantee results?',
    answer: 'No. What I guarantee is the work: at least 4 improvements implemented every month and a report on how your revenue per visit is evolving. The result is read as a trend, over several months.'
  },
  {
    id: 'monthly-en-4',
    question: 'What do I need to get started?',
    answer: 'We start with a free meeting to understand what\'s holding your store back. If it\'s a fit, I need access to your Shopify, and in the first month I start with what\'s holding your sales back the most.'
  },
  {
    id: 'monthly-en-5',
    question: 'Who implements the improvements?',
    answer: 'I do. The month\'s improvements, at least 4, are included in the monthly fee.'
  },
  {
    id: 'monthly-en-6',
    question: 'What if I\'m not on Shopify?',
    answer: 'First I migrate your store to Shopify, with the improvements already done. Then we continue with continuous improvement.'
  }
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
    answer: 'Sí. Todo lo que desarrollo para tu tienda es tuyo y queda documentado.'
  },
  {
    id: 'custom-dev-5',
    question: '¿Qué pasa si Shopify se actualiza o algo deja de funcionar?',
    answer: SUPPORT_DAYS
      ? `Durante ${SUPPORT_DAYS} días arreglo sin coste cualquier fallo de mi trabajo. Después, si quieres, lo mantengo con un presupuesto aparte.`
      : 'Si algo falla por mi trabajo, lo arreglo. Si quieres que me ocupe del mantenimiento, lo presupuesto aparte.'
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
    answer: 'Yes. Everything I build for your store is yours, and it\'s documented.'
  },
  {
    id: 'custom-dev-en-5',
    question: 'What if Shopify updates or something stops working?',
    answer: SUPPORT_DAYS
      ? `For ${SUPPORT_DAYS} days I fix any fault in my work free of charge. After that, if you want, I maintain it under a separate quote.`
      : 'If something breaks because of my work, I fix it. If you want me to take care of maintenance, I quote it separately.'
  },
  {
    id: 'custom-dev-en-6',
    question: 'How do I know if what I need is feasible?',
    answer: 'Tell me about it in a free meeting and I\'ll tell you whether it can be done, what it costs and how long it takes.'
  },
];
