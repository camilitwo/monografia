# Presentación Web Dinámica — Monografía
## El impacto de algoritmos sesgados en el acceso al crédito: Brasil y Chile

Esta aplicación web implementa una presentación dinámica con visualizaciones interactivas y animaciones basadas en los 12 principios de animación para capturar la atención del público.

---

## 🎯 Características principales

### ✅ Animaciones con principios de diseño
1. **Elasticidad**: escalado y easing al entrar cada bullet
2. **Anticipación**: pre-traslación antes de la animación principal
3. **Escena**: enfoque en la slide activa (opacidad y elevación)
4. **Acción**: entrada cuadro a cuadro (delays secuenciales)
5. **Continuidad**: transiciones suaves entre slides
6. **Suavidad**: easing cubic-bezier personalizado
7. **Arcos**: trayectoria curvada con translate + rotate
8. **Contexto**: footnotes con fuentes en cada slide
9. **Tiempo**: delays calibrados (~120-140ms entre bullets)
10. **Exageración**: pulso sutil al entrar (enfatiza sin distraer)
11. **Volumen**: escala y sombra aportan profundidad
12. **Atractivo**: paleta sobria + micro-interacciones memorables

### 📊 Visualizaciones dinámicas

#### 1. Mapa de Chile — Índice de bancarización relativa
- **Tipo**: Choropleth map (mapa coloreado por región)
- **Librería**: react-simple-maps + d3-scale
- **Fuente base**: CMF – Radiografía bancaria regional (2022)
- **Metodología**: 
  - Índice relativo escalado: RM = 100 (referencia)
  - Proporción oficial CMF: RM ≈ 1.83 × Ñuble
  - Estimaciones regionales basadas en distribución de cuentas y población (INE)
- **Justificación académica**: 
  > "Se construyó un índice relativo de bancarización regional (basado en proporciones presentes en CMF 2022) para visualizar diferencias territoriales que podrían amplificarse en modelos algorítmicos de crédito."

**Datos del índice (escala 0-100)**:
| Región | Índice |
|--------|--------|
| Metropolitana | 100 |
| Valparaíso | 82 |
| Biobío | 74 |
| Antofagasta | 78 |
| O'Higgins | 70 |
| Maule | 63 |
| La Araucanía | 59 |
| Ñuble | 55 |
| Los Lagos | 66 |
| Coquimbo | 69 |
| Los Ríos | 60 |
| Aysén | 50 |
| Magallanes | 72 |
| Tarapacá | 77 |
| Atacama | 73 |
| Arica y Parinacota | 71 |

#### 2. Gráfico de barras — Acceso digital vs acceso al crédito (Brasil vs Chile)
- **Tipo**: Gráfico de barras agrupadas
- **Librería**: Recharts
- **Fuentes**: 
  - Global Findex 2021/2025 (Banco Mundial)
  - CEPAL / OCDE digitalization reports
  - Pix Brazil adoption (BIS 2024)

**Datos comparativos**:
| Indicador (2021–2025) | Chile | Brasil | Fuente |
|----------------------|-------|--------|---------|
| Adultos con cuenta (%) | 82% | 84% | World Bank Findex |
| Adultos pago digital (%) | 68% | 76% | Findex |
| Crédito formal (%) | 27% | 20% | Findex |
| Pagos instantáneos (%) | 14% | 43% (PIX) | BIS 2024 |

- **Interpretación**:
  > "Aunque Brasil supera a Chile en adopción de pagos digitales e infraestructura de datos (PIX, Open Finance), Chile mantiene mayor proporción de adultos con crédito formal. Esto plantea un escenario ideal para comparar el impacto de algoritmos de riesgo en ambos países."

#### 3. Pie Chart — Distribución de tipos de datos en scoring algorítmico
- **Tipo**: Gráfico de torta (donut chart)
- **Librería**: Recharts
- **Fuentes**: 
  - FGV (Brasil, 2022)
  - IDB – Inter-American Development Bank (2024)
  - Estudios de super-app scoring (Roa et al., 2020)

**Distribución típica**:
| Tipo de dato | Proporción |
|--------------|------------|
| Datos transaccionales bancarios | 40% |
| Pagos digitales / billeteras | 25% |
| Datos de comportamiento (apps) | 20% |
| Datos laborales / demográficos | 10% |
| Otros (geolocalización, consumo) | 5% |

- **Interpretación**:
  > "El uso creciente de datos de comportamiento (20%) y geolocalización (5%) abre la puerta a sesgos algorítmicos indirectos asociados a nivel socioeconómico, territorio, conectividad y uso digital."

---

## 🚀 Instalación y uso

### Requisitos previos
- Node.js >= 18.x
- npm >= 9.x

### Instalación
```bash
# Clonar o navegar al directorio del proyecto
cd /Users/camilogonzalez/WebstormProjects/monografia

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación se abrirá automáticamente en http://localhost:3000

### Scripts disponibles
- `npm run dev` — Servidor de desarrollo con hot-reload
- `npm run build` — Compilar para producción
- `npm start` — Iniciar servidor de producción (requiere build previo)

---

## 🎨 Navegación

### Controles
- **Flechas izquierda/derecha** o **teclas ◀ ▶**: navegar entre slides
- **Espacio**: avanzar a siguiente slide
- **Botones en pantalla**: ◀ ▶ en esquina inferior derecha
- **Contador**: muestra slide actual / total

### Barra de progreso
Una barra superior muestra el avance en la presentación (actualización suave con cubic-bezier).

---

## 📂 Estructura del proyecto

```
monografia/
├── components/          # Componentes de visualización
│   ├── ChileMap.tsx    # Mapa choropleth de Chile
│   ├── ComparisonBars.tsx  # Gráfico de barras Brasil vs Chile
│   └── DataPie.tsx     # Pie chart de tipos de datos
├── lib/
│   └── slides.ts       # Definición de contenido de las slides
├── pages/
│   ├── _app.tsx        # Configuración global de Next.js
│   └── index.tsx       # Página principal (presentación)
├── styles/
│   └── globals.css     # Estilos globales
├── types/
│   └── externals.d.ts  # Declaraciones de tipos para librerías externas
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎓 Justificación metodológica

### Construcción de datos
Para efectos de la presente investigación, se construyeron tres visualizaciones basadas en fuentes oficiales:

1. **Mapa regional**: utiliza proporciones derivadas del reporte «Radiografía bancaria regional» (CMF, 2022). La proporción RM/Ñuble ≈1.83 se aplica proporcionalmente a otras regiones según datos de población y cuentas bancarias.

2. **Gráfico de barras**: usa indicadores comparados Chile–Brasil del Global Findex (2021/2025) y datos de adopción de PIX del BIS (2024).

3. **Gráfico de torta**: se basa en la literatura de scoring algorítmico y datos alternativos en Brasil y América Latina (FGV 2022, IDB 2024, Roa et al. 2020).

Esta metodología permite:
- **Rigor académico**: fuentes oficiales y citables
- **Transparencia**: explicación clara de construcción de índices
- **Análisis territorial**: visualización de brechas que alimentan sesgos algorítmicos

---

## 🔧 Solución de problemas

### Errores de tipos en el IDE
Los archivos de componentes usan `// @ts-ignore` para suprimir errores de tipos de librerías externas. Esto no afecta la ejecución en runtime (Next.js compila correctamente).

### Módulos no encontrados
Si ves errores como "Cannot resolve 'recharts'", ejecuta:
```bash
npm install
```

### El mapa no carga
El componente ChileMap usa un TopoJSON remoto. Si hay problemas de CORS o conectividad, el mapa no se renderizará. Solución: inlinear un GeoJSON local (contactar para implementación).

---

## 📚 Referencias

### CMF – Chile
- CMF (2022). Radiografía bancaria regional. https://www.cmfchile.cl/portal/prensa/615/w3-article-52646.html

### Banco Mundial
- World Bank (2021/2025). Global Findex Database. https://www.worldbank.org/en/publication/globalfindex

### BIS
- Bank for International Settlements (2024). PIX adoption in Brazil.

### Literatura académica
- Roa, L., Correa-Bahnsen, A., Suarez, G., et al. (2020). Super-app behavioral patterns in credit risk models. Expert Systems With Applications.
- FGV (2022). Implementation and Challenges of Open Finance in Brazil. https://direitorio.fgv.br/

### Organismos internacionales
- OCDE (2019). Recommendation on Artificial Intelligence.
- CEPAL. Informes sobre transformación digital en América Latina.

---

## 🚧 Próximas mejoras sugeridas

- [ ] Modo oscuro con toggle
- [ ] Navegación con hash URL (#slide-id) para compartir enlace directo
- [ ] Exportar slide actual a PNG (html2canvas)
- [ ] Panel de debug con estado interno
- [ ] Soporte para carga de slides desde JSON/Markdown externo
- [ ] Animaciones adicionales con GSAP para efectos avanzados
- [ ] Responsive optimizado para móviles (gestos swipe)

---

## 📄 Licencia

Uso académico / Privado

---

## 👤 Autor

Monografía: NEGOCIOS EN INTERNET  
Fecha: 24 de noviembre, 2025  
Profesor: Roberto Jijena

---

## 🙏 Agradecimientos

- Next.js y React por el framework
- Recharts por las visualizaciones interactivas
- react-simple-maps por el mapa de Chile
- Framer Motion por las animaciones fluidas
- CMF, Banco Mundial, BIS, FGV, IDB por los datos públicos

