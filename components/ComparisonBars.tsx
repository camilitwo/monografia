// @ts-ignore
import React from 'react'
// @ts-ignore
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'

const data = [
  { indicador: 'Adultos con cuenta (%)', Chile: 82, Brasil: 84 },
  { indicador: 'Pago digital (%)', Chile: 68, Brasil: 76 },
  { indicador: 'Crédito formal (%)', Chile: 27, Brasil: 20 },
  { indicador: 'Pagos instantáneos (%)', Chile: 14, Brasil: 43 }
]

export const ComparisonBars: React.FC = () => (
  <div style={{ width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', maxWidth:'900px', margin:'0 auto' }}>
    {/* Usar aspect ratio para no depender de altura padre explícita */}
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="indicador"
          interval={0}
          tick={{ fontSize:'clamp(11px, 1.3vh, 14px)' }}
          height={80}
          angle={-15}
          textAnchor="end"
        />
        <YAxis tick={{ fontSize:'clamp(11px, 1.3vh, 14px)' }} />
        <Tooltip
          formatter={(v:number)=> v + '%'}
          contentStyle={{ fontSize:'clamp(11px, 1.2vh, 13px)' }}
        />
        <Legend wrapperStyle={{ fontSize:'clamp(12px, 1.4vh, 15px)' }} />
        <Bar dataKey="Chile" fill="#1F3A4B" radius={[4,4,0,0]} />
        <Bar dataKey="Brasil" fill="#D9A24F" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
    <p style={{ fontSize:'clamp(10px, 1.1vh, 13px)', color:'#6B7280', marginTop:12, textAlign:'center' }}>
      Fuentes: World Bank Global Findex 2021/2025; BIS 2024 (PIX); Adaptado para comparación Chile–Brasil.
    </p>
  </div>
)
