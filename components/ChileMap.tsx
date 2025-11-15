// @ts-ignore
import React, { useMemo } from 'react'
import Highcharts from 'highcharts'
import HighchartsMap from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'
import chileMapData from '@highcharts/map-collection/countries/cl/cl-all.geo.json'

// Initialize Highcharts Map module
if (typeof Highcharts === 'object') {
  HighchartsMap(Highcharts)
}

const dataset = [
  { code: 'cl-ai', name: 'Aysén', bancarizacion: 69, pagos: 52, internet: 82, idfr: 58 },
  { code: 'cl-an', name: 'Antofagasta', bancarizacion: 83, pagos: 68, internet: 92, idfr: 77 },
  { code: 'cl-ap', name: 'Arica y Parinacota', bancarizacion: 71, pagos: 54, internet: 88, idfr: 63 },
  { code: 'cl-at', name: 'Atacama', bancarizacion: 72, pagos: 56, internet: 87, idfr: 64 },
  { code: 'cl-bi', name: 'Biobío', bancarizacion: 75, pagos: 60, internet: 88, idfr: 66 },
  { code: 'cl-co', name: 'Coquimbo', bancarizacion: 74, pagos: 59, internet: 88, idfr: 66 },
  { code: 'cl-ar', name: 'La Araucanía', bancarizacion: 67, pagos: 50, internet: 80, idfr: 56 },
  { code: 'cl-li', name: "O'Higgins", bancarizacion: 73, pagos: 57, internet: 86, idfr: 64 },
  { code: 'cl-ll', name: 'Los Lagos', bancarizacion: 73, pagos: 56, internet: 83, idfr: 61 },
  { code: 'cl-lr', name: 'Los Ríos', bancarizacion: 72, pagos: 55, internet: 85, idfr: 62 },
  { code: 'cl-ml', name: 'Maule', bancarizacion: 70, pagos: 54, internet: 84, idfr: 60 },
  { code: 'cl-rm', name: 'Metropolitana', bancarizacion: 88, pagos: 78, internet: 94, idfr: 86 },
  { code: 'cl-ma', name: 'Magallanes', bancarizacion: 81, pagos: 66, internet: 93, idfr: 76 },
  { code: 'cl-ta', name: 'Tarapacá', bancarizacion: 76, pagos: 61, internet: 90, idfr: 69 },
  { code: 'cl-vs', name: 'Valparaíso', bancarizacion: 82, pagos: 67, internet: 90, idfr: 74 },
  { code: 'cl-nb', name: 'Ñuble', bancarizacion: 68, pagos: 51, internet: 82, idfr: 57 }
]

const mapData = chileMapData as any

export const ChileMap: React.FC = () => {
  const options = useMemo(() => ({
    chart: {
      map: mapData,
      height: '100%',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, Roboto, Arial, sans-serif'
      }
    },
    title: { text: undefined },
    credits: { enabled: false },
    mapNavigation: {
      enabled: true,
      enableDoubleClickZoom: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    colorAxis: {
      min: 50,
      max: 90,
      stops: [[0, '#DFF3E5'], [0.5, '#5FA777'], [1, '#035E2C']],
      labels: {
        style: { fontSize: '11px' }
      }
    },
    tooltip: {
      useHTML: true,
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderColor: '#D9A24F',
      borderRadius: 10,
      borderWidth: 2,
      shadow: true,
      style: {
        fontSize: '14px',
        padding: '12px'
      },
      headerFormat: '<div style="font-size:18px; font-weight:bold; margin-bottom:10px; color:#D9A24F;">{point.name}</div>',
      pointFormat:
        '<div style="line-height:1.7;">' +
        '<b>IDFR:</b> {point.value}<br/>' +
        '<b>Bancarización:</b> {point.bancarizacion}%<br/>' +
        '<b>Pagos digitales:</b> {point.pagos}%<br/>' +
        '<b>Internet:</b> {point.internet}%' +
        '</div>'
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'bottom',
      itemStyle: {
        fontSize: '11px',
        fontWeight: 'normal'
      }
    },
    plotOptions: {
      map: {
        allAreas: false,
        states: {
          hover: {
            brightness: 0.3,
            borderColor: '#D9A24F',
            borderWidth: 4
          }
        }
      },
      series: {
        animation: {
          duration: 300
        }
      }
    },
    series: [{
      type: 'map',
      mapData,
      joinBy: ['hc-key', 'hc-key'],
      data: dataset.map(item => ({
        'hc-key': item.code,
        value: item.idfr,
        name: item.name,
        bancarizacion: item.bancarizacion,
        pagos: item.pagos,
        internet: item.internet
      })),
      states: {
        hover: {
          brightness: 0.3,
          borderColor: '#D9A24F',
          borderWidth: 4
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}',
        style: {
          fontSize: '12px',
          fontWeight: '600',
          color: '#1F3A4B',
          textOutline: '2.5px white'
        }
      },
      cursor: 'pointer'
    }]
  }), [])

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="mapChart"
        options={options}
      />
    </div>
  )
}

