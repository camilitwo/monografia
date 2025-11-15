// App principal: renderer de slides dinámicos con animaciones CSS/JS que implementan los principios de movimiento.

interface Slide { id: string; title: string; bullets: string[]; footnote?: string }
// Contenido completo de 12 slides
const slides: Slide[] = [
  { id: 'title', title: 'El impacto de algoritmos sesgados en el acceso al crédito', bullets: ['Monografía: NEGOCIOS EN INTERNET', '24 de noviembre, 2025 — Profesor: Roberto Jijena'], footnote: 'Monografía (2025)' },
  { id: 'agenda', title: 'Agenda', bullets: ['Contexto y problema', 'Metodología', 'Hallazgos Brasil / Chile', 'Comparación y regulación', 'Recomendaciones y conclusiones'], footnote: 'Monografía (2025)' },
  { id: 'context', title: 'Contexto: por qué importa', bullets: ['Digitalización del crédito y auge de algoritmos', 'Sesgos: muestreo, proxies y diseño', 'Impacto potencial: exclusión y desigualdad'], footnote: 'OCDE / CEPAL / Monografía' },
  { id: 'method', title: 'Metodología', bullets: ['Caso comparado (Brasil–Chile)', 'Revisión sistemática (PRISMA 2020)', 'Datos secundarios (BCB, CMF, World Bank)', 'Métricas: disparate impact, equal opportunity'], footnote: 'World Bank / BCB / CMF' },
  { id: 'data', title: 'Datos clave de inclusión', bullets: ['Titularidad de cuenta: Brasil ≈ 84%', 'Titularidad de cuenta: Chile ≈ 82%', 'Quintiles bajos ≈ 60%', 'Persisten brechas (género, territorio)'], footnote: 'Global Findex (World Bank 2021/2025)' },
  { id: 'findings-br', title: 'Hallazgos — Brasil', bullets: ['Open Finance expandido (2020 →)', 'Eficiencia y competencia como foco', 'Riesgo: marginación zonas rurales', 'Falta métricas públicas de equidad'], footnote: 'Banco Central do Brasil (2020) / FGV (2022)' },
  { id: 'findings-cl', title: 'Hallazgos — Chile', bullets: ['Ley Fintec 21.521 + NCG 514 (SFA)', 'Implementación completa julio 2026', 'Riesgo: estandarización técnica parcial', 'Oportunidad: métricas fairness tempranas'], footnote: 'Congreso de Chile (2023) / CMF (2024)' },
  { id: 'comparison', title: 'Comparación Brasil vs Chile', bullets: ['Necesidad común: métricas de equidad claras', 'Brasil: fortaleza técnica', 'Chile: marco normativo emergente', 'Riesgo compartido: sesgos en datos alternativos'], footnote: 'Monografía / BCB / CMF' },
  { id: 'regulation', title: 'Brechas regulatorias', bullets: ['Principios sin mecanismos operativos', 'Accountability y auditoría técnica limitada', 'Explicabilidad insuficiente al usuario', 'Alinear con estándares OCDE (IA confiable)'], footnote: 'OCDE (2019) / Monografía' },
  { id: 'recommendations', title: 'Recomendaciones prioritarias', bullets: ['Auditorías algorítmicas periódicas obligatorias', 'Model cards regulatorias estandarizadas', 'Regulación datos alternativos con validación'], footnote: 'Monografía (2025)' },
  { id: 'limitations', title: 'Limitaciones y agenda futura', bullets: ['Sin acceso a modelos propietarios', 'Evidencia de sesgos fragmentaria', 'Pilotos de mitigación y estudios controlados', 'Comparar con UE / EE.UU. y apelación'], footnote: 'Monografía (2025)' },
  { id: 'conclusions', title: 'Conclusiones', bullets: ['Algoritmos reflejan desigualdades de origen', 'Open Finance / SFA: oportunidad condicionada', 'Gobernanza algorítmica = ventaja competitiva'], footnote: 'Monografía (2025)' }
]
let current = 0
function $(id: string) { return document.getElementById(id) }
function createSlideElement(s: Slide): HTMLElement {
  const slide = document.createElement('section'); slide.className = 'slide'; slide.dataset.id = s.id
  const h = document.createElement('h1'); h.className = 'slide-title'; h.textContent = s.title; slide.appendChild(h)
  const ul = document.createElement('ul'); ul.className = 'slide-bullets'
  s.bullets.forEach((b, i) => { const li = document.createElement('li'); li.className = 'bullet'; li.textContent = b; li.style.transitionDelay = `${i * 120}ms`; ul.appendChild(li) })
  slide.appendChild(ul)
  if (s.footnote) { const f = document.createElement('div'); f.className = 'footnote'; f.textContent = s.footnote; slide.appendChild(f) }
  return slide
}
function renderDeck() {
  const root = $('#app'); if (!root) return
  root.innerHTML = ''
  const deck = document.createElement('div'); deck.className = 'deck'
  slides.forEach((s, idx) => { const el = createSlideElement(s); if (idx === current) el.classList.add('active'); el.querySelectorAll('.bullet').forEach(b => b.classList.add('arc-enter')); deck.appendChild(el) })
  root.appendChild(deck); requestAnimationFrame(animateActiveSlide)
}
function animateActiveSlide() {
  document.querySelectorAll('.slide').forEach((s, idx) => {
    const bullets = s.querySelectorAll('.bullet')
    if (idx === current) {
      s.classList.add('active')
      bullets.forEach((b, i) => {
        b.classList.add('anticipation')
        setTimeout(() => { b.classList.remove('anticipation'); b.classList.add('elast', 'arc-enter-active'); setTimeout(() => b.classList.add('pulse'), 120); setTimeout(() => b.classList.remove('pulse'), 1200) }, 140 + i * 140)
      })
    } else { s.classList.remove('active'); bullets.forEach(b => b.classList.remove('arc-enter-active')) }
  })
}
function updateProgress() {
  let bar = $('#progress') as HTMLDivElement | null
  if (!bar) { bar = document.createElement('div'); bar.id = 'progress'; bar.style.position = 'fixed'; bar.style.left = '0'; bar.style.top = '0'; bar.style.height = '4px'; bar.style.background = 'linear-gradient(90deg,#D9A24F,#1F3A4B)'; bar.style.width = '0%'; bar.style.transition = 'width 600ms cubic-bezier(.22,.9,.37,1)'; document.body.appendChild(bar) }
  bar.style.width = (((current + 1) / slides.length) * 100) + '%'
}
function goto(index: number) { current = (index + slides.length) % slides.length; const active = document.querySelector('.slide.active'); if (active) active.classList.remove('active'); setTimeout(() => { renderDeck(); updateProgress() }, 160) }
function bindControls() {
  $('#prev')?.addEventListener('click', () => goto(current - 1))
  $('#next')?.addEventListener('click', () => goto(current + 1))
  window.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === ' ') goto(current + 1); if (e.key === 'ArrowLeft') goto(current - 1) })
}

// Diagnóstico adicional
function diag(msg: string){console.log('[diag]', msg)}

// En init añadir diagnósticos
function init() {
  const appEl = document.getElementById('app');
  if(!appEl){console.error('[error] #app no encontrado en el DOM'); return}
  diag('Elemento #app encontrado');
  bindControls();
  renderDeck();
  updateProgress();
  diag('Slides renderizadas: ' + document.querySelectorAll('.slide').length);
  if(document.querySelectorAll('.slide').length === 0){
    console.error('[error] No se generaron slides. Revisar función renderDeck.')
  }
  console.log('Presentación lista')
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init()
