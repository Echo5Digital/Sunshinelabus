'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  ChevronDown,
  Home,
  Languages,
  Fingerprint,
  ShieldCheck,
  Users,
  Award,
  FileText,
  Camera,
  ScanLine,
  PackageCheck,
  ClipboardCheck,
  HelpCircle,
  CalendarDays,
  Car,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import MagicCard from '@/components/ui/MagicCard';

/* ─── Animation variants (matching site-wide landing page pattern) ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const CARD_DIRS = [
  { x: -60, y: 0 },
  { x: 0, y: -60 },
  { x: 60, y: 0 },
  { x: -60, y: 0 },
  { x: 0, y: 60 },
  { x: 60, y: 0 },
];
const cardVariants = {
  hidden: (i) => {
    const { x, y } = CARD_DIRS[i] ?? { x: 0, y: 28 };
    return { opacity: 0, x, y, scale: 0.97 };
  },
  visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const heroContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const heroItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* ─── Section wrapper (scroll-triggered) ─── */
function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */
const WHY_ITEMS = [
  {
    Icon: Languages,
    title: 'Hablamos Español — De Principio a Fin',
    body: 'Desde que llama para agendar hasta que completa su cita, todo el proceso puede ser en español. No hay barreras de idioma. No hay confusión. No necesita depender de un familiar para traducir instrucciones médicas o legales importantes.',
  },
  {
    Icon: Fingerprint,
    title: 'Experiencia con Pruebas de Inmigración',
    body: 'Nuestro equipo entiende los requisitos específicos de USCIS. Sabemos qué documentación se necesita, cómo se debe recolectar la muestra, qué fotos son necesarias y cómo empaquetar y enviar las muestras correctamente al laboratorio acreditado por AABB.',
  },
  {
    Icon: ShieldCheck,
    title: 'Cadena de Custodia Completa',
    body: 'Cada paso del proceso es documentado: verificación de identidad con foto, documentación fotográfica del participante, recolección de muestra supervisada, sellado y etiquetado bajo protocolos de cadena de custodia, y envío directo al laboratorio AABB. Esto garantiza que sus resultados sean aceptados por USCIS, tribunales y agencias gubernamentales.',
  },
  {
    Icon: Users,
    title: 'Confidencial y Profesional',
    body: 'Toda su información personal y resultados son tratados con total confidencialidad. Entendemos la sensibilidad de estos casos y manejamos cada situación con respeto y discreción.',
  },
  {
    Icon: Award,
    title: '35+ Años de Experiencia Combinada',
    body: 'Nuestro equipo de laboratorio tiene más de 35 años de experiencia combinada. Usted está en manos profesionales y experimentadas.',
  },
];

const TEST_TYPES = [
  {
    Icon: Fingerprint,
    title: 'Prueba de ADN para Inmigración (USCIS)',
    body: 'Para peticiones de visa, reunificación familiar y procesos migratorios que requieren verificación de relación biológica. Cadena de custodia completa. Aceptada por USCIS, embajadas y consulados de los Estados Unidos.',
  },
  {
    Icon: ClipboardCheck,
    title: 'Prueba de Paternidad Legal',
    body: 'Para casos de tribunales familiares, custodia de hijos, manutención (child support), herencias y cambios legales de nombre. Los resultados son admisibles en tribunales de Florida y agencias gubernamentales.',
  },
  {
    Icon: FileText,
    title: 'Prueba de Paternidad Informativa',
    body: 'Para conocimiento personal. Utiliza la misma metodología precisa pero sin la documentación formal de cadena de custodia. Ideal para familias que desean confirmar una relación biológica por tranquilidad personal.',
  },
  {
    Icon: Users,
    title: 'Prueba de Relación Familiar',
    body: 'Para confirmar relaciones biológicas más allá de la paternidad — hermanos, abuelos, tíos. Frecuentemente utilizada en conjunto con procesos de inmigración cuando la prueba de paternidad directa no es posible.',
  },
];

const STEPS = [
  {
    num: '01',
    Icon: ScanLine,
    title: 'Verificación de Identidad',
    body: 'Nuestro personal verifica la identidad de todos los participantes con su documento de identificación oficial con foto.',
  },
  {
    num: '02',
    Icon: Camera,
    title: 'Documentación Fotográfica',
    body: 'Se toman fotografías de cada participante como parte del protocolo de cadena de custodia requerido por USCIS.',
  },
  {
    num: '03',
    Icon: Fingerprint,
    title: 'Recolección de Muestra',
    body: 'Se realiza un frotis bucal simple e indoloro en cada participante. El proceso toma solo unos segundos por persona.',
  },
  {
    num: '04',
    Icon: PackageCheck,
    title: 'Cadena de Custodia',
    body: 'Las muestras son selladas, etiquetadas y documentadas bajo protocolos estrictos de cadena de custodia. Todo se prepara para envío al laboratorio acreditado por AABB.',
  },
  {
    num: '05',
    Icon: ClipboardCheck,
    title: 'Resultados',
    body: 'El tiempo para recibir resultados varía dependiendo del tipo de prueba y del laboratorio de procesamiento. Nuestro equipo le informará del tiempo estimado cuando agende su cita.',
  },
];

const FAQ_ITEMS = [
  {
    q: '¿Cuánto cuesta una prueba de ADN para inmigración?',
    a: 'El precio varía dependiendo del tipo de prueba y el número de participantes. Llame al (727) 233-5223 para conocer los precios actuales. Le informaremos del costo exacto antes de su cita.',
  },
  {
    q: '¿Cuánto tiempo tardan los resultados de la prueba de ADN?',
    a: 'El tiempo varía según el tipo de prueba y el laboratorio de procesamiento. Nuestro equipo le dará un estimado cuando agende su cita.',
  },
  {
    q: '¿USCIS acepta los resultados de Sunshine Clinical Lab?',
    a: 'Sí. Nuestras pruebas de ADN para inmigración se realizan bajo protocolos de cadena de custodia y se procesan a través de laboratorios acreditados por AABB. Los resultados son aceptados por USCIS, embajadas y consulados de los Estados Unidos.',
  },
  {
    q: '¿Necesito cita para la prueba de ADN?',
    a: 'Sí. Las pruebas de ADN requieren cita previa para asegurar que todos los participantes, documentos e identificaciones estén debidamente coordinados. Llame al (727) 233-5223 para agendar.',
  },
  {
    q: '¿Qué documentos necesito llevar?',
    a: 'Todos los participantes deben traer una identificación oficial con foto vigente (pasaporte, licencia de conducir, o identificación estatal). Si tiene una carta de USCIS o de la embajada, tráigala también.',
  },
  {
    q: '¿La prueba de ADN duele?',
    a: 'No. La muestra se recolecta con un hisopo bucal — un pequeño cepillo que se frota suavemente por dentro de la mejilla. No hay agujas ni extracción de sangre para las pruebas de ADN estándar. El proceso es rápido e indoloro.',
  },
  {
    q: '¿Hablan español en Sunshine Clinical Lab?',
    a: 'Sí. Nuestro equipo habla español. Puede llamar, agendar su cita y completar todo el proceso en español. No necesita traer un traductor.',
  },
  {
    q: '¿Puedo hacer la prueba de ADN si la otra persona está en otro país?',
    a: 'Sí. En muchos casos de inmigración, una persona se hace la prueba en los Estados Unidos y la otra persona se hace la prueba en su país de origen a través de un laboratorio coordinado. Nuestro equipo puede guiarle sobre cómo funciona este proceso. Llame al (727) 233-5223 para discutir su situación específica.',
  },
  {
    q: '¿Sirve una prueba de ADN comprada por internet para inmigración?',
    a: 'No. Las pruebas de ADN compradas por internet o realizadas en casa no son aceptadas por USCIS para propósitos de inmigración. La prueba debe realizarse en persona, en un laboratorio autorizado, con protocolos de cadena de custodia. Sunshine Clinical Lab cumple con todos estos requisitos.',
  },
];

/* ─── FAQ accordion item ─── */
function FaqItem({ q, a, index, isOpen, onToggle }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer ${
        isOpen
          ? 'border border-sunshine-blue/30 shadow-md'
          : 'border border-sunshine-sky/40 shadow-sm hover:border-sunshine-sky hover:shadow-md'
      }`}
      onClick={onToggle}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="bar"
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-sunshine-blue origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <button
        className={`w-full flex items-start justify-between px-4 sm:px-6 py-4 sm:py-5 text-left transition-colors duration-200 ${
          isOpen ? 'bg-sunshine-blue/5' : 'bg-white hover:bg-sunshine-blue/5'
        }`}
        aria-expanded={isOpen}
      >
        <span className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-xs font-bold tabular-nums w-6 text-right text-sunshine-blue/40 mt-0.5 flex-shrink-0">
            {num}
          </span>
          <span className="font-semibold text-sunshine-dark text-sm sm:text-base leading-snug">
            {q}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          className={`flex-shrink-0 mt-0.5 ml-3 transition-colors duration-200 ${
            isOpen ? 'text-sunshine-blue' : 'text-sunshine-sky'
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="bg-sunshine-blue/5 border-t border-sunshine-sky/30 px-4 sm:px-6 py-4 sm:py-5 pl-[52px] sm:pl-[64px]">
              <p className="text-sunshine-dark/70 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main page component ─── */
export default function PruebaDeADNInmigracionPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  const col1 = FAQ_ITEMS.slice(0, 5);
  const col2 = FAQ_ITEMS.slice(5);

  return (
    <div className="bg-sunshine-soft min-h-screen" lang="es">

      {/* ══ STICKY CONVERSION BAR (only nav element on this landing page) ══ */}
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <div className="relative bg-sunshine-dark shadow-lg">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 right-0 w-72 h-24 bg-sunshine-blue/25 blur-2xl rounded-full" />
          </div>

          <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
            <Link href="/" className="flex-shrink-0 flex items-center overflow-hidden rounded-lg bg-white/95 px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-sm">
              <Image
                src="/logo2.webp"
                alt="Sunshine Clinical Lab"
                height={40}
                width={132}
                className="h-6 sm:h-8 w-auto object-contain"
              />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto">
              <a
                href="tel:+17272335223"
                className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 sm:px-4 py-1.5 sm:py-2 font-semibold text-white text-[0.7rem] sm:text-sm whitespace-nowrap transition-colors hover:bg-white/10 hover:border-white/25"
              >
                <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-sunshine-yellow flex-shrink-0">
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sunshine-dark" />
                </span>
                (727) 233-5223
              </a>
              <span className="hidden md:inline text-white/70 text-sm font-medium whitespace-nowrap">
                Hablamos Español
              </span>
              <Link href="/book-appointment">
                <ShimmerButton className="bg-sunshine-blue text-white text-[0.7rem] sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-semibold whitespace-nowrap shadow-md gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 hidden sm:inline" />
                  Agendar Cita
                </ShimmerButton>
              </Link>
            </div>
          </div>

          <div className="h-[3px] w-full bg-gradient-to-r from-sunshine-yellow via-sunshine-sky to-sunshine-blue" />
        </div>
      </div>

      {/* Push page content below the sticky bar */}
      <div className="h-14 sm:h-16" />

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="/prueba-de-adn-inmigracion.webp"
          alt="Prueba de ADN para Inmigración en Florida"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sunshine-dark/95 via-sunshine-dark/80 to-sunshine-blue/70" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full border border-white/5" />
          <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-white/[0.03]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 pt-32">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mr-auto text-left"
          >
            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Prueba de ADN para Inmigración en Florida —{' '}
              <span className="text-[#93C5FD]">Hablamos Español</span>
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
            >
              Servicio Profesional, Confidencial y Aceptado por USCIS. Estamos Aquí para
              Ayudarle.
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-8 max-w-xl"
            >
              Sunshine Clinical Lab ofrece pruebas de ADN para inmigración, paternidad y
              reunificación familiar con cadena de custodia completa, aceptada por USCIS,
              tribunales y agencias gubernamentales. Nuestro equipo habla español y lo guiará
              paso a paso durante todo el proceso.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-start mb-8"
            >
              <a href="tel:+17272335223" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto justify-center bg-sunshine-blue border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold shadow-lg text-base gap-2 whitespace-nowrap">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="sm:hidden">Llame al (727) 233-5223</span>
                  <span className="hidden sm:inline">
                    Agendar Su Prueba de ADN — Llame al (727) 233-5223
                  </span>
                </ShimmerButton>
              </a>
            </motion.div>

            {/* Barra de Confianza */}
            <motion.div
              variants={heroItemVariants}
              className="flex flex-wrap gap-2 sm:gap-3 justify-start"
            >
              {[
                'Aceptado por USCIS',
                'Cadena de Custodia Completa',
                'Hablamos Español',
                '35+ Años de Experiencia',
                'Confidencial y Profesional',
                'Coordinación con Laboratorio AABB',
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#93C5FD] flex-shrink-0" />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
            <path
              d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
              fill="#EBF5FB"
            />
          </svg>
        </div>
      </section>

      {/* ══ DIRECT ANSWER BLOCK (AEO / GEO) ═════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
              <div className="p-7 sm:p-9">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                    <Fingerprint className="w-3.5 h-3.5" />
                    Prueba de ADN — Inmigración
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  ¿Dónde Puedo Hacerme una Prueba de ADN para Inmigración en Florida?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base mb-7">
                  Sunshine Clinical Lab en 3600 Galileo Dr, Suite 104, Trinity, FL 34655
                  ofrece pruebas de ADN para inmigración aceptadas por USCIS. El laboratorio
                  realiza la recolección de muestras con cadena de custodia completa,
                  verificación de identidad, documentación fotográfica y coordinación con
                  laboratorios acreditados por AABB. El equipo habla español. También se
                  ofrecen pruebas de paternidad legal e informativa. Se requiere cita previa.
                  Llame al{' '}
                  <a
                    href="tel:+17272335223"
                    className="text-sunshine-blue font-semibold hover:underline"
                  >
                    (727) 233-5223
                  </a>{' '}
                  para agendar.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { icon: MapPin, label: 'Trinity, FL' },
                    { icon: ShieldCheck, label: 'Cadena de Custodia' },
                    { icon: Languages, label: 'Hablamos Español' },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 bg-sunshine-soft border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      <Icon className="w-3.5 h-3.5 text-sunshine-blue flex-shrink-0" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ MAIN CONTENT ═════════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Entendemos Lo Importante Que Es Este Momento Para Su Familia
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-soft rounded-2xl mb-4 shadow-sm overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 p-7 sm:p-8">
                <div className="w-12 h-12 rounded-2xl bg-sunshine-blue flex items-center justify-center flex-shrink-0 shadow-md">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    Sabemos que una prueba de ADN para inmigración no es solo un trámite — es
                    un paso hacia la reunificación de su familia. Es la diferencia entre estar
                    separados y estar juntos. Es un proceso que puede sentirse complicado,
                    estresante y abrumador, especialmente cuando no está seguro de los
                    requisitos o de qué esperar.
                  </p>
                  <p>
                    En Sunshine Clinical Lab, estamos aquí para hacer este proceso lo más
                    sencillo y cómodo posible. Nuestro equipo habla español. No necesita traer
                    un traductor. No necesita preocuparse por no entender las instrucciones.
                    Desde el momento en que llama hasta que recibe sus resultados, lo guiamos
                    en español, con paciencia, profesionalismo y respeto.
                  </p>
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ ¿QUÉ ES UNA PRUEBA DE ADN PARA INMIGRACIÓN? ══════════ */}
      <section className="py-20 bg-[#EBF5FB] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                ¿Qué Es una Prueba de ADN para Inmigración?
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <MagicCard className="shadow-md hover:shadow-lg mb-6">
                <div className="p-7 sm:p-8 text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Cuando USCIS (Servicios de Ciudadanía e Inmigración de los Estados Unidos)
                    o una embajada de los Estados Unidos necesita verificar que existe una
                    relación biológica entre un peticionario y un beneficiario como parte de
                    una petición de visa o proceso migratorio, pueden solicitar una prueba de
                    ADN.
                  </p>
                  <p>
                    Esta prueba confirma relaciones biológicas como padre e hijo, madre e
                    hijo, hermanos, u otras relaciones familiares. Los resultados son
                    utilizados por USCIS, embajadas y consulados como evidencia oficial en el
                    proceso de inmigración.
                  </p>
                </div>
              </MagicCard>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start gap-3 bg-sunshine-blue rounded-2xl px-7 py-5"
            >
              <ShieldCheck className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
              <p className="text-white font-semibold text-base leading-relaxed">
                Es importante saber: esta prueba debe realizarse en persona, en un laboratorio
                autorizado, siguiendo protocolos estrictos de cadena de custodia. Las pruebas
                de ADN compradas por internet o realizadas en casa NO son aceptadas para
                propósitos de inmigración.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ ¿POR QUÉ ELEGIR SUNSHINE CLINICAL LAB? ═══════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              ¿Por Qué Elegir Sunshine Clinical Lab para Su Prueba de ADN?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {WHY_ITEMS.map(({ Icon, title, body }, i) => (
              <motion.div key={title} variants={cardVariants} custom={i}>
                <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl h-full">
                  <div className="p-7 flex flex-col gap-4 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-sunshine-soft flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-sunshine-blue" />
                    </div>
                    <h3 className="text-lg font-bold text-sunshine-dark">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <a href="tel:+17272335223" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto justify-center bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2 whitespace-nowrap">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="sm:hidden">Llame al (727) 233-5223</span>
                <span className="hidden sm:inline">
                  Llame al (727) 233-5223 para Agendar Su Prueba de ADN
                </span>
              </ShimmerButton>
            </a>
          </motion.div>
        </Section>
      </section>

      {/* ══ TIPOS DE PRUEBAS DE ADN ═══════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ opacity: 0.5 }}
          >
            <source src="/mbd-test.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Tipos de Pruebas de ADN Que Ofrecemos
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {TEST_TYPES.map(({ Icon, title, body }) => (
                <motion.div key={title} variants={itemVariants}>
                  <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl h-full">
                    <div className="p-7 flex flex-col gap-3 h-full">
                      <div className="w-12 h-12 rounded-2xl bg-sunshine-soft flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-sunshine-blue" />
                      </div>
                      <h3 className="text-lg font-bold text-sunshine-dark">{title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ ¿QUÉ NECESITA TRAER A SU CITA? ════════════════════════ */}
      <section className="py-20 bg-[#EBF5FB] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                ¿Qué Necesita Traer a Su Cita?
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed mb-6">
              Para pruebas de ADN de inmigración y legales, todos los participantes deben
              presentar:
            </motion.p>

            <div className="space-y-4">
              {[
                {
                  Icon: FileText,
                  title: 'Identificación oficial con foto',
                  body: 'Pasaporte vigente, licencia de conducir de los Estados Unidos, tarjeta de identificación estatal, o documento de identidad emitido por el gobierno de su país de origen.',
                },
                {
                  Icon: ClipboardCheck,
                  title: 'Orden o instrucción de USCIS',
                  body: 'Si tiene una carta de USCIS o de la embajada solicitando la prueba de ADN, tráigala a su cita. Si no está seguro de qué documentos necesita, llámenos y le ayudaremos a verificar.',
                },
                {
                  Icon: Users,
                  title: 'Todos los participantes deben estar presentes',
                  body: 'Para pruebas de inmigración y paternidad legal, todas las personas involucradas deben asistir a la cita en persona para la recolección de muestras.',
                },
              ].map(({ Icon, title, body }) => (
                <motion.div key={title} variants={itemVariants}>
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="flex items-start gap-4 p-6 sm:p-7">
                      <div className="w-10 h-10 rounded-xl bg-sunshine-blue flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-sunshine-dark mb-1">{title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ ¿QUÉ PASA DURANTE LA CITA? ════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="absolute inset-0">
          <Image
            src="/mbd-sp.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.3 }}
            sizes="100vw"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                ¿Qué Pasa Durante la Cita?
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed mb-10 max-w-3xl">
              La recolección de muestras de ADN es simple, rápida y no causa dolor. No es una
              extracción de sangre — la muestra se toma con un hisopo bucal (un pequeño
              cepillo que se frota suavemente por dentro de la mejilla).
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {STEPS.map((step, i) => (
                <motion.div key={step.num} variants={cardVariants} custom={i}>
                  <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl h-full">
                    <div className="p-7 flex flex-col gap-4 h-full">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6BB6E8] to-[#2B7DBF] text-white flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                        {step.num}
                      </div>
                      <h3 className="text-lg font-bold text-sunshine-dark">
                        Paso {i + 1}: {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>

            <motion.p variants={itemVariants} className="text-center text-gray-700 italic mb-8">
              La cita completa generalmente toma entre 15 y 30 minutos.
            </motion.p>

            <motion.div variants={itemVariants} className="flex justify-center">
              <a href="tel:+17272335223" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto justify-center bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2 whitespace-nowrap">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="sm:hidden">Llame al (727) 233-5223</span>
                  <span className="hidden sm:inline">Agendar Su Cita — Llame al (727) 233-5223</span>
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ PRECIOS Y FORMAS DE PAGO ═════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/[0.04]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6"
            >
              Precios y Formas de Pago
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white/85 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
              Las pruebas de ADN para inmigración y legales generalmente no están cubiertas
              por seguros médicos y se manejan como pago directo.
            </motion.p>

            <motion.p variants={itemVariants} className="text-white font-semibold text-lg mb-4">
              Aceptamos: efectivo, tarjeta de crédito y Zelle.
            </motion.p>

            <motion.p variants={itemVariants} className="text-white/85 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Para conocer los precios actuales de cualquier prueba de ADN, llame al (727)
              233-5223. Le informaremos del costo exacto antes de su cita — sin sorpresas ni
              cargos ocultos.
            </motion.p>

            <motion.div variants={itemVariants}>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <Phone className="w-6 h-6" />
                  Llame al (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ UBICACIÓN Y ÁREAS QUE SERVIMOS ══════════════════════ */}
      <section className="py-20 bg-[#EBF5FB] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Ubicación y Áreas Que Servimos
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex items-center gap-4 px-7 pt-7 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sunshine-blue flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-sunshine-dark">
                    Las pruebas de ADN se realizan en persona en nuestra ubicación
                  </h3>
                </div>
                <div className="px-7 pb-7 space-y-4">
                  <p className="text-gray-600 leading-relaxed font-semibold">
                    Sunshine Clinical Lab LLC — 3600 Galileo Dr, Suite 104 — Trinity, FL 34655
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Fácil acceso desde Zephyrhills, Dade City, Wesley Chapel, New Port Richey,
                    Land O&apos; Lakes y todas las comunidades del condado de Pasco, así como
                    Tarpon Springs en el condado de Pinellas y el área de Tampa.
                  </p>
                  <div className="flex items-start gap-3 bg-sunshine-blue/5 border-l-4 border-sunshine-blue rounded-r-xl p-4">
                    <Car className="w-5 h-5 text-sunshine-blue flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Estacionamiento gratuito disponible.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#D6EAF8]">
        <div className="absolute inset-0">
          <Image
            src="/dna-faq.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.5 }}
            sizes="100vw"
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sunshine-blue shadow-lg mb-5">
                <HelpCircle className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Preguntas Frecuentes — Prueba de ADN para Inmigración
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 lg:items-start mb-8">
              <div className="space-y-3">
                {col1.map((item, i) => (
                  <motion.div key={item.q} variants={itemVariants}>
                    <FaqItem
                      q={item.q}
                      a={item.a}
                      index={i}
                      isOpen={openFaq === i}
                      onToggle={() => toggleFaq(i)}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="space-y-3">
                {col2.map((item, i) => (
                  <motion.div key={item.q} variants={itemVariants}>
                    <FaqItem
                      q={item.q}
                      a={item.a}
                      index={i + 5}
                      isOpen={openFaq === i + 5}
                      onToggle={() => toggleFaq(i + 5)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl border border-sunshine-sky/30 shadow-sm px-6 py-8 text-center"
            >
              <p className="text-sunshine-dark/60 text-sm mb-5">
                ¿No encuentra lo que busca? Nuestro equipo está feliz de ayudarle.
              </p>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
                  <Phone className="w-5 h-5" />
                  ¿Tiene Más Preguntas? Llame al (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ EXPLORE MORE / INTERNAL LINKS ═══════════════════════ */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Más Información
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark">
                Más de Sunshine Clinical Lab
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {[
                {
                  href: '/dna-testing-pasco-county',
                  title: 'DNA Testing — English Version',
                  body: 'View this DNA testing page in English, covering legal, immigration, and paternity testing for Pasco County.',
                },
                {
                  href: '/mobile-blood-draw-zephyrhills',
                  title: 'Mobile Blood Draw — Zephyrhills',
                  body: 'Extracción de sangre a domicilio en Zephyrhills, Dade City y San Antonio. Hablamos español.',
                },
                {
                  href: '/mobile-blood-draw-wesley-chapel',
                  title: 'Mobile Blood Draw — Wesley Chapel',
                  body: 'Servicio de extracción de sangre móvil en Wesley Chapel y comunidades cercanas.',
                },
                {
                  href: '/insurance-accepted',
                  title: 'Insurance We Accept',
                  body: 'See the major insurance plans we accept, plus our self-pay pricing options.',
                },
                {
                  href: '/',
                  title: 'Sunshine Clinical Lab Home',
                  body: 'Learn more about Sunshine Clinical Lab and everything we offer across Pasco County.',
                },
              ].map(({ href, title, body }, i) => (
                <motion.div key={href} variants={cardVariants} custom={i}>
                  <Link href={href} className="block h-full">
                    <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-sm hover:shadow-lg h-full">
                      <div className="p-6 flex flex-col gap-2 h-full">
                        <h3 className="text-base font-bold text-sunshine-dark">{title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed flex-1">{body}</p>
                        <span className="text-sunshine-blue text-sm font-semibold mt-1">Learn more →</span>
                      </div>
                    </MagicCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/[0.04]" />
          <div className="absolute top-1/4 right-1/3 w-24 h-24 rounded-full bg-white/[0.06]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            >
              Sunshine Clinical Lab LLC
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Su Familia Merece Estar Junta.
              <br />
              <span className="text-[#93C5FD]">Nosotros Le Ayudamos con el Proceso.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
            >
              Sunshine Clinical Lab ofrece pruebas de ADN para inmigración con cadena de
              custodia completa, aceptadas por USCIS. Servicio profesional, confidencial y
              completamente en español.
            </motion.p>

            <motion.p variants={itemVariants} className="text-white font-semibold text-lg mb-10">
              Llame al (727) 233-5223 para agendar su cita hoy.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <Phone className="w-6 h-6" />
                  Llamar Ahora — (727) 233-5223
                </ShimmerButton>
              </a>
              <Link href="/book-appointment">
                <ShimmerButton className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-9 py-4 rounded-full font-semibold text-lg gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Agendar Cita en Línea
                </ShimmerButton>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm"
            >
              <span className="flex items-center gap-2 text-center">
                <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                Sunshine Clinical Lab LLC — 3600 Galileo Dr, Suite 104, Trinity, FL 34655
              </span>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm mt-3"
            >
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white flex-shrink-0" />
                Hablamos Español — Servimos a Todo el Condado de Pasco y la Bahía de Tampa
              </span>
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
