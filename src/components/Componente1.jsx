import React from 'react'

const Componente1 = ({valor, texto, color, icono, descripcion}) => {
  return (
    <>
      <div>
        Componente 1
      </div>
      <div className="col-lg-3 col-6">
        <div className={`small-box bg-danger ${color}`}>
          <div className="inner">
            <h3>{valor}</h3>
            <p>{texto}</p>
          </div>
          <div className="icon">
            <i className={icono}></i>
          </div>
          <a href="#" className="small-box-footer">{descripcion}<i className="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>
    </>
  )
}

export default Componente1;
