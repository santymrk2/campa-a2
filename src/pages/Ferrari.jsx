import React, {Suspense, useEffect, useState} from 'react';
import ModalSelect from '../components/ModalSelect.jsx'
import PartsJSON from '../ferrari.json'
import Alert from '../components/Alert.jsx'
import Success from '../components/Success.jsx'
import Warning from '../components/Warning.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js'
const Spline = React.lazy(() => import('@splinetool/react-spline'));

function Ferrari() {
  const [parts, setParts] = useLocalStorage('parts-ferrari-v2', PartsJSON.data)
  const [level, setLevel] = useState(0)
  const [partSelected, setPartSelected] = useState('')
  const [splineRef, setSplineRef] = useState(null)
  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [warning, setWarning] = useState(false)
  const [showModal, setShowModal] = useState(false)

  function onLoadEvent(spline) {
 // Guarda una referencia a la instancia de Spline
    setSplineRef(spline)

    if(parts) {
        parts.forEach((p) => {
        if(p.estado) spline.setVariable(p.parte, true)
      })
      setLevel(parts.filter((p) => p.estado === true).length)
    }
  }

  function onSplineMouseDownEvent(e) {
    const selection = e.target.name

    let auxParts = parts

    const part = auxParts.find((p) => p.parte == selection)

    if (part.estado === false) {
      setPartSelected(selection)
      setShowModal(true)
    } else {
      setWarning('El objeto ya fue desbloqueado')
      setShowModal(false)
    }
  }

  function desbloquearParte(partName, codigo) {
    // Verificamos si el codigo es correcto
    if(parts.find((p) => p.parte == partName).codigo == codigo) {
      // Cambiamos el estado de la parte
      setParts(parts.map((p) => p.parte == partName ? {...p, estado: true} : p))
      // Desbloqueamos el objeto en el spline
      splineRef.setVariable(partName, true)
      // Mostramos el mensaje de exito
      setSuccess(true)
    } else {
      setAlert('El codigo es incorrecto')
      setPartSelected('')
    }
  }

  function toggleModal() {
    setShowModal(false)
  }

  useEffect(() => {
    if (success) {
      setAlert(false);
      setWarning(false);
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 10000/2); 

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [success]);

  useEffect(() => {
    if (alert) {
      setSuccess(false);
      setWarning(false);
      const timer = setTimeout(() => {
        setAlert(false);
      }, 10000/2); 

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [alert]);

  
  useEffect(() => {
    if (warning) {
      setSuccess(false);
      setAlert(false);
      const timer = setTimeout(() => {
        setWarning(false);
      }, 10000/2); 

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [warning]);

  useEffect(() => {
    if(parts && splineRef) {
      parts.forEach((p) => {
        if(p.estado) splineRef.setVariable(p.parte, true)
      })
      setLevel(parts.filter((p) => p.estado === true).length)
    }
  }, [parts]);


  return (
    <div className='relative transform-none h-dvh w-screen overflow-hidden overscroll-none bg-zinc-700'>
      <Suspense fallback={<div className='absolute inset-0 flex items-center justify-center font-black'>Loading...</div>}>
        <div className=" absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10/12 gap-4 z-10">
          { 
            Array.from({ length: level }).map((_, i) => (
              <div key={i} className="w-16 h-16 bg-green-500 rounded-full"></div>
            ))
          }
        </div>
        
        <Spline 
          className='absolute inset-0 w-full h-full'
          scene="https://prod.spline.design/rKdTDhZnFK06kgHe/scene.splinecode"
          onSplineMouseDown={onSplineMouseDownEvent}
          onLoad={onLoadEvent}
        />
        
        {
          alert && 
          <div className=' absolute top-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10/12' >
            <Alert className='mt-4' strong="Error" text={alert}/>
          </div>
        }

        {
          warning && 
          <div className=' absolute top-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10/12' >
            <Warning className='mt-4' strong="" text={warning}/>
          </div>
        }

        {
          success && 
          <div className=' absolute top-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10/12' >
            <Success className='mt-4' strong="Codigo Ingresado con Exito"/>
          </div>
        }

        {
          showModal &&
            <div className='absolute inset-0 flex items-center justify-center bg-black/50 z-20'>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <ModalSelect part={partSelected} setPart={setPartSelected} functionCheck={desbloquearParte} toggleModal={toggleModal} />
              </div>
            </div>
        }
      </Suspense>
    </div>
  )
}

export default Ferrari
