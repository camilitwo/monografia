// @ts-ignore
import React from 'react'
// @ts-ignore
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Datos transaccionales bancarios', value: 40 },
  { name: 'Pagos digitales / billeteras', value: 25 },
  { name: 'Datos de comportamiento (apps)', value: 20 },
  { name: 'Datos laborales / demográficos', value: 10 },
  { name: 'Otros (geolocalización, consumo)', value: 5 }
]
const colors = ['#1F3A4B','#2E8B57','#F2C94C','#EB5757','#9CA3AF']

export const DataPie: React.FC = () => (
  <div style={{ width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', maxWidth:'900px', margin:'0 auto' }}>
    {/* aspect ratio evita altura 0 en flujos con animaciones */}
    <ResponsiveContainer width="100%" aspect={2}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="35%"
          outerRadius="65%"
          paddingAngle={2}
        >
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)}
        </Pie>
        <Tooltip
          formatter={(v:number)=> v + '%'}
          contentStyle={{ fontSize:'clamp(11px, 1.2vh, 13px)' }}
        />
        <Legend wrapperStyle={{ fontSize:'clamp(11px, 1.3vh, 14px)' }} />
      </PieChart>
    </ResponsiveContainer>
    <p style={{ fontSize:'clamp(10px, 1.1vh, 13px)', color:'#6B7280', marginTop:8, textAlign:'center' }}>
      Fuentes: FGV 2022; IDB 2024; Roa et al. (2020). Distribución típica en modelos alternativos de scoring.
    </p>
  </div>
)
