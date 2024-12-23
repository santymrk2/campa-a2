import React, {Suspense, useState} from 'react';
import ModalSelect from './ModalSelect.jsx'
const Spline = React.lazy(() => import('@splinetool/react-spline'));

function App() {
  const [code, setCode] = useState('')
  const [level, setLevel] = useState(0)
  const [objectSelected, setObjectSelected] = useState('')


  let splineRef = null;

  function onLoadEvent(spline) {
    splineRef = spline; // Guarda una referencia a la instancia de Spline
  }

  function changeVariable() {
    if (splineRef) {
      splineRef.setVariableValue('element1', true);
    }
  }

  function onSplineMouseDownEvent(e) {
    if (e.target.name === 'Rueda') {
      console.log('Seleccionaste la rueda!');
      setObjectSelected('Rueda')
    } else if (e.target.name === 'Espejo') {
      console.log('Seleccionaste el espejo!');
      setObjectSelected('Espejo')
    } else if (e.target.name === 'Freno') {
      console.log('Seleccionaste el freno!');
      setObjectSelected('Freno')
    } 
  }
  return (
    <div className='relative h-screen w-screen'>
      {
        level ? 
          <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <div className="relative h-screen bg-gray-100">
                {/* Contenedor de los círculos */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex gap-4">
                  {/* Círculo 1 */}
                  <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
                  {/* Círculo 2 */}
                  <div className="w-16 h-16 bg-green-500 rounded-full"></div>
                  {/* Círculo 3 */}
                  <div className="w-16 h-16 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          : null
      }

      <Suspense fallback={<div className=''>Loading...</div>}>
        <Spline 
          className='absolute inset-0 w-full h-full'
          scene="https://prod.spline.design/y78v6iQJSnivWTWK/scene.splinecode"
          onSplineMouseDown={onSplineMouseDownEvent}
          onLoad={onLoadEvent}
        />
      </Suspense>
      {
        objectSelected != '' ? 
          <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <ModalSelect part={objectSelected} setPart={setObjectSelected} setChange={changeVariable()}/>
            </div>
          </div>
          : null
      }

      
    </div>
  )
}

export default App
