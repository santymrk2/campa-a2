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
    setSplineRef(spline) // Guarda una referencia a la instancia de Spline
  }

  function onSplineMouseDownEvent(e) {
    setPartSelected('')
    const selection = e.target.name;
    console.log(selection)
    let auxParts = parts
    const part = auxParts.find((p) => p.parte == selection);
    console.log(part)
    if (part.estado === false) {
      setPartSelected(selection);
    } else {
      setAlert('El objeto ya fue desbloqueado');
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

      // Actualizamos el nivel
      const desbloqueados = parts.filter((p) => p.estado === true).length;
      setLevel(desbloqueados + 1);
      console.log("Nivel: ", desbloqueados)


    } else {
      setAlert('El codigo es incorrecto')
    }
    setPartSelected('')
  }


  useEffect(() => {
    if (success) {
      setAlert(false);
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 10000/2); 

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [success]);

  useEffect(() => {
    if (alert) {
      setSuccess(false);
      const timer = setTimeout(() => {
        setAlert(false);
      }, 10000/2); 

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [alert]);


  return (
    <div className='relative h-screen w-screen'>
      <Suspense fallback={<div className='text-black'>Loading...</div>}>
        <div className=" absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10/12 gap-4 z-10">
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
          <div className=' absolute top-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10/12' >
            <Alert className='mt-4' strong="Error" text={alert}/>
          </div>
        }

        {
          success && 
          <div className=' absolute top-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10/12' >
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
