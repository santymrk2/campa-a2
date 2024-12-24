import React, {Suspense, useEffect, useState} from 'react';
import ModalSelect from '../components/ModalSelect.jsx'
import PartsJSON from '../redbull.json'
import Alert from '../components/Alert.jsx'
import Success from '../components/Success.jsx'
const Spline = React.lazy(() => import('@splinetool/react-spline'));

function App() {
  const [parts, setParts] = useState(PartsJSON.data);
  const [level, setLevel] = useState(0)
  const [partSelected, setPartSelected] = useState('')
  const [splineRef, setSplineRef] = useState(null)
  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)




  function onLoadEvent(spline) {
    console.log('El objeto spline guardado es: ', spline)
    setSplineRef(spline) // Guarda una referencia a la instancia de Spline
  }

  function onSplineMouseDownEvent(e) {
    const selection = e.target.name;

    const elementoActivo = parts.find((p) => (p.parte == selection)).estado == false
    if(elementoActivo){
      setPartSelected(selection)
    } else {
      return(
        setAlert('El objeto ya fue desbloqueado')
      )
    }
  }

  function desbloquearParte(partName, codigo) {
    let auxParts = parts;
    let part = auxParts.filter((p) => p.parte == partName)[0]
    if(part) {
      if(part.codigo == codigo){
        console.log(`La parte ${partName} ha sido desbloqueada`)
        // Aca hay que actualizar el estado y hacer que se elimine
        auxParts = auxParts.forEach(
          (p) => { p.parte == partName ? p.estado = true : null})
        setParts(auxParts)
        splineRef.setVariable(partName, true)
        setPartSelected('')
        return (
          setSuccess(true)
        )
      } else {
        setPartSelected('')
        return (
          setAlert('El codigo es incorrecto')
        )

      }
    }
  }
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 10000/2); 

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [success]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 10000/2); 

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [alert]);

  useEffect(()=> {
    // cambiar las bolas
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
            level == 1 && <div className="w-16 h-16 bg-green-500 rounded-full"></div>
          }
          {
            level == 2 &&
            <>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
            </>
          }
                  {
            level == 3 &&
            <>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
              <div className="w-16 h-16 bg-green-500 rounded-full"></div>
            </>
          }
        </div>
        
        <Spline 
          className='absolute inset-0 w-full h-full'
          scene="https://prod.spline.design/y78v6iQJSnivWTWK/scene.splinecode"
          onSplineMouseDown={onSplineMouseDownEvent}
          onLoad={onLoadEvent}
        />
        
        {
          alert && 
          <div className=' absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10/12' >
            <Alert className='mt-4' strong="Error" text={alert}/>
          </div>
        }

        {
          success && 
          <div className=' absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10/12' >
            <Success className='mt-4' strong="Codigo Ingresado con Exito"/>
          </div>
        }

        {
          partSelected != '' &&
            <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <ModalSelect part={partSelected} setPart={setPartSelected} functionCheck={desbloquearParte} />
              </div>
            </div>
        }
      </Suspense>
    </div>
  )
}

export default App
