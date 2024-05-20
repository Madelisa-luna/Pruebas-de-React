import React, { useEffect, useState } from 'react'
import Componente1 from './Componente1'


const AirQualityScreen = () => {

    {/*Mandamos a traer la informacion para poder manipularla*/ }
    const [city, setCity] = useState('Puebla');
    const [aqi, setAqi] = useState(0);
    const [source, setSource] = useState('SNICA');
    const [station, setStation] = useState('Conocida');
    const [co, SetCo] = useState(0);
    const [dew, setDew] = useState(0);
    const [h, setH] = useState(0);
    const [no2, setNo2] = useState(0);
    const [o3, setO3] = useState(0);
    const [p, setP] = useState(0);
    const [pm10, setPm10] = useState(0);
    const [pm25, setPm25] = useState(0);
    const [so2, setSo2] = useState(0);
    const [t, setT] = useState(0);
    const [w, setW] = useState(0);
    const [wg, setWg] = useState(0);
    const [time, setTime] = useState('2024-05-17 10:00:00');
    const [scale, setScale] = useState(['primary', 'desconocida', 'Por determinar'])


    {/*Zonde api, aqui se manda a llamar la api y se realizan las modificaiones de ella*/ }
    const token = '5fa9ac164e1ea867b8112f7b2a440bb28c96a98c';

    {/*Funcion asincrona(Son promesas)*/ }
    const getAQI = async () => {
        const url = `https://api.waqi.info/feed/here/?token=${token}`;
        const respose = await fetch(url);
        const data = await respose.json();
        console.log(data);
        setCity(data.data.city.name);
        setAqi(data.data.aqi);
        setSource(data.data.attributions[0]);
        setTime(data.data.time.s);
        setScale(getScale(data.data.aqi));

    }


    {/*Funcion de menu para determinar los colores, mensaje, nivel y los iconos*/ }
    const getScale = (aqi) => {
        let color = "";
        let nivel = "";
        let mensaje = "";
        let icono = "";
        switch (true) {
            case aqi >= 0 && aqi <= 50:
                color = "succes";
                nivel = "Buena";
                mensaje = "No se anticipan impactos a la salud cuando la calidad del aire se encuentra en este intervalo.";
                icono = "";
                break;
            case aqi >= 51 && aqi <= 100:
                color = "warning";
                nivel = "Moderado";
                mensaje = "Las personas extraordinariamente sensitivas deben considerar limitación de los esfuerzos físicos excesivos y prolongados al aire libre.";
                break;
            case aqi >= 101 && aqi <= 150:
                color = "Orange";
                nivel = "Dañina a la Salud de los Grupos Sensitivos";
                mensaje = "Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar los esfuerzos físicos excesivos y prolongados al aire libre.";
                break;
            case aqi >= 151 && aqi <= 200:
                color = "danger";
                nivel = "Muy Dañina a la Salud";
                mensaje = "Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar los esfuerzos excesivos prolongados al aire libre; las demás personas, especialmente los niños, deben limitar los esfuerzos físicos excesivos y prolongados al aire libre.";
                break;
            case aqi >= 201 && aqi <= 300:
                color = "purple";
                nivel = "Muy Dañina a la Salud";
                mensaje = "Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar todos los esfuerzos excesivos al aire libre; las demás personas, especialmente los niños, deben limitar los esfuerzos físicos excesivos al aire libre.";
                break;
            default:
                color = "maroon";
                nivel = "Arriesgado";
                mensaje = "No salga de casa, es le fin del mundo xd";
                break;
        }
        return [color, nivel, mensaje];
    }

    {/*Esto es un hut para traer los datos*/ }
    useEffect(() => {
        getAQI();
    }, [])

    {/**/ }

    {/*Zona de HTML*/ }
    return (
        <>

            {/*Zona de cards para llamar los datos de la api*/}
            <div>
                Aplicacion de la calidad de aire
            </div>
            <div className='card card-info'>
                {/*Titulo de tarjeta*/}
                <div className='card-header'>
                    <h1 className='card-title'> {city} </h1>
                </div>
                {/*Cuerpo de tarjeta*/}
                <div className='card-body'>
                    <div className='row'>

                        <div className='col-md-6 col-xs-12'>
                            <Componente1 valor={aqi} texto="AQI"
                                icono="fas fa-paw" color={`gb-${scale[0]}`} descripcion={scale[1]} />
                        </div>

                        <div>
                            <p>
                                Fuente: <a href={source.url} target='_blank' title='Ir al sitio'>{source.name}</a>
                            </p>
                            <p>
                                fecha y hora: {time}
                            </p>
                            <p>
                                {scale[2]}
                            </p>
                        </div>

                        <div className='col-lg-4 col-md-6 col-xs-12'>
                            <Componente1 valor={10} texto="co" icono="fab fa-fort-awesome-alt" color="bg-primary" />
                        </div>
                        <div className='col-lg-4 col-md-6 col-xs-12'>
                            <Componente1 valor={5} texto="hola" icono="fas fa-paw" color="bg-blue" />
                        </div>
                    </div> {/*Fin de className="row"*/}
                </div>
                {/*Final de tarjeta*/}
                <div className='card-footer'>
                    <button className='btn btn-success'>Aceptar</button>
                    <button className='btn btn-secondary'>Cancelar</button>
                </div>
            </div>
        </>
    )
}

export default AirQualityScreen
