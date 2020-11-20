import React from 'react'
import s from "./WeatherForecast.module.css";


export const WeatherForecast=(props)=>{

const renderData=props.data.length>1?props.data.map((i,index)=>{return <div key={index} className={s.item}>
  <div className={s.temp}>{Math.round(i.temp)}&#176;C</div>
  <div className={s.name}>{i.name}</div>
  <div className={s.date}>{i.date}</div>
  <div className={s.clouds}>{i.clouds<50?'Clear':'Cloudy'}, Wind-{i.wind} meter per second</div>
</div>}):props.data.map((i,index)=>{return <div key={index} className={s.itemOne}>
  <div className={s.temp}>{Math.round(i.temp)}&#176;C</div>
  <div className={s.name}>{i.name}</div>
  <div className={s.date}>{i.date}</div>
  <div className={s.clouds}>{i.clouds<50?'Clear':'Cloudy'}, Wind-{i.wind} meter per second</div>
</div>})

  return (
    <div className={s.mainInfo}>
    {renderData}
    </div>
  );
}