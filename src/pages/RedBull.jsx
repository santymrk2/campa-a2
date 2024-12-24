import React, {Suspense, useEffect, useState} from 'react';
import ModalSelect from '../ModalSelect.jsx'
import PartsJSON from '../redbull.json'
const Spline = React.lazy(() => import('@splinetool/react-spline'));

function App() {
  const [parts, setParts] = useState(PartsJSON.data);
  const [level, setLevel] = useState(0)
  const [objectSelected, setObjectSelected] = useState('')
  const [splineRef, setSplineRef] = useState(null)

  function onLoadEvent(spline) {
    console.log('El objeto spline guardado es: ', spline)
    setSplineRef(spline) // Guarda una referencia a la instancia de Spline
  }

  function onSplineMouseDownEvent(e) {
    const selection = e.target.name;
    console.log(`Seleccionaste la ${selection}!`)

    if(parts.find((p) => (p.parte == selection)).estado == false){
      setObjectSelected(selection)
    } else {
      alert('El objeto ya fue desbloqueado')
    }
  }

  function desbloquearParte(partName, codigo) {
    let auxParts = parts;
    let part = auxParts.filter((p) => {p.parte == partName})
    if(part) {
      if(part.codigo == codigo){
        console.log('La parte ha sido desbloqueada')
        // Aca hay que actualizar el estado y hacer que se elimine
        setParts(auxParts.forEach((p) => p.parte == partName ? p.estado = true : null))
        splineRef.setVariable(partName, true)

      } else {
        alert('El codigo es incorrecto')
      }
    }
  }
/*
  useEffect(()=> {
    let auxParts = parts;
    if (splineRef) {
      auxParts.forEach((p) => {
        p.ESTADO = true;
        splineRef.setVariable(p.codigo, p.estado)})
    }
  }, [code])*/
  useEffect(()=> {
    //cambiar las bolas
    if(parts){
      let desbloqueados = parts.filter((p) => p.estado == true)
      setLevel(desbloqueados.length)
    } else {
      setLevel(0)
    }
  }, [parts])

  return (
    <div className='relative h-screen w-screen'>
      <Suspense fallback={<div className='text-black'>Loading...</div>}>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
          { 
            level == 1 ? <div className="w-16 h-16 bg-green-500 rounded-full"></div> : null
          }
          {
            level == 2 ?
            <>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
            </>
            : null
          }
                  {
            level == 3 ? 
            <>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
            </>
            : null
          }
        </div>

        <Spline 
          className='absolute inset-0 w-full h-full'
          scene="https://prod.spline.design/y78v6iQJSnivWTWK/scene.splinecode"
          onSplineMouseDown={onSplineMouseDownEvent}
          onLoad={onLoadEvent}
        />

        {
          objectSelected != '' ? 
            <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <ModalSelect part={objectSelected} setPart={setObjectSelected} functionCheck={desbloquearParte} />
              </div>
            </div>
            : null
        }
      </Suspense>


    </div>
  )
}

export default App
