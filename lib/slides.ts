export interface Slide {
  id: string;
  title: string;
  bullets: string[];
  footnote?: string;
  kind?: 'text' | 'map' | 'bars' | 'pie';
  image?: string; // Image URL or path
  imagePosition?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  imageSize?: 'small' | 'medium' | 'large' | number;
  imageOffset?: { x?: number; y?: number };
  textAlign?: 'left' | 'center' | 'right';
}

export const slides: Slide[] = [
  { 
    id: 'title', 
    title: 'Monografía: El impacto de los algoritmos sesgados en el acceso al crédito: Un análisis de sistemas bancarios en Brasil y Chile.', 
    bullets: ['Monografía: NEGOCIOS EN INTERNET', 'Profesor: Roberto Jijena', 'Alumno: Camilo González', '24 de noviembre, 2025'], 
    footnote: 'Monografía (2025)', 
    kind: 'text',
    image: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1757605771/freepik__en-esta-foto-img1-haz-que-se-vea-muy-natural-e-inf__72304_fb0u6x.jpg',
    imagePosition: 'left',
    imageSize: 'large',
    textAlign: 'right'
  },
  { id: 'agenda', title: 'Agenda', bullets: ['Contexto y problema', 'Metodología', 'Hallazgos Brasil / Chile', 'Visualizaciones', 'Recomendaciones y conclusiones'], footnote: 'Monografía (2025)', kind: 'text' },
  { id: 'context', title: 'Contexto: por qué importa', bullets: ['Digitalización del crédito y auge de algoritmos', 'Sesgos: muestreo, proxies y diseño', 'Impacto potencial: exclusión y desigualdad'], footnote: 'OCDE / CEPAL / Monografía', kind: 'text' },
  { id: 'map-chile', title: 'Mapa IDFR — Inclusión digital financiera', bullets: ['IDFR combina bancarización, pagos digitales, internet y densidad transaccional', 'Regiones extremas muestran mayor riesgo de sesgo por datos delgados', 'RM, Antofagasta y Magallanes lideran en digitalización'], footnote: 'Fuente compuesta: CASEN, SUBTEL, Banco Central, Findex (normalizado)', kind: 'map' },
  { id: 'bars-br-cl', title: 'Acceso digital vs crédito (Brasil vs Chile)', bullets: ['Cuenta: CL 82% / BR 84%', 'Pago digital: CL 68% / BR 76%', 'Crédito formal: CL 27% / BR 20%', 'Instantáneos: CL 14% / BR 43%'], footnote: 'Fuente: Global Findex 2021/2025 + BIS 2024', kind: 'bars' },
  { id: 'pie-data', title: 'Tipos de datos en scoring algorítmico', bullets: ['Transaccionales 40%', 'Pagos digitales 25%', 'Comportamiento 20%', 'Demográficos 10% + Otros 5%'], footnote: 'Fuente: FGV 2022; IDB 2024; Roa et al. 2020', kind: 'pie' },
  { id: 'method', title: 'Metodología', bullets: ['Caso comparado (Brasil–Chile)', 'Revisión sistemática (PRISMA 2020)', 'Datos secundarios (BCB, CMF, World Bank)', 'Métricas: disparate impact, equal opportunity'], footnote: 'World Bank / BCB / CMF', kind: 'text' },
  { id: 'findings-br', title: 'Hallazgos — Brasil', bullets: ['Open Finance 2020 →', 'Foco: eficiencia y competencia', 'Riesgo: zonas rurales', 'Falta métricas públicas equidad'], footnote: 'Banco Central do Brasil / FGV', kind: 'text' },
  { id: 'findings-cl', title: 'Hallazgos — Chile', bullets: ['Ley Fintec + NCG 514 (SFA)', 'Implementación julio 2026', 'Riesgo: estandarización parcial', 'Oportunidad: fairness temprana'], footnote: 'Congreso Chile / CMF', kind: 'text' },
  { id: 'comparison', title: 'Comparación Brasil vs Chile', bullets: ['Necesidad común: métricas de equidad claras', 'Brasil: fortaleza técnica', 'Chile: marco normativo emergente', 'Riesgo compartido: sesgos en datos alternativos'], footnote: 'Monografía / BCB / CMF' },
  { id: 'regulation', title: 'Brechas regulatorias', bullets: ['Principios sin mecanismos operativos', 'Accountability y auditoría técnica limitada', 'Explicabilidad insuficiente al usuario', 'Alinear con estándares OCDE (IA confiable)'], footnote: 'OCDE (2019) / Monografía' },
  { id: 'recommendations', title: 'Recomendaciones prioritarias', bullets: ['Auditorías algorítmicas periódicas obligatorias', 'Model cards regulatorias estandarizadas', 'Regulación datos alternativos con validación'], footnote: 'Monografía (2025)' },
  { id: 'limitations', title: 'Limitaciones y agenda futura', bullets: ['Sin acceso a modelos propietarios', 'Evidencia de sesgos fragmentaria', 'Pilotos de mitigación y estudios controlados', 'Comparar con UE / EE.UU. y apelación'], footnote: 'Monografía (2025)' },
  { id: 'conclusions', title: 'Conclusiones', bullets: ['Algoritmos reflejan desigualdades de origen', 'Open Finance / SFA: oportunidad condicionada', 'Gobernanza algorítmica = ventaja competitiva'], footnote: 'Monografía (2025)' }
];
