import Spline from '@splinetool/react-spline';
import './App.css'

function App() {
  return (
    <div className='m-0 p-0'>
      <Spline className='w-full h-full fixed top-0 left-0' scene="https://draft.spline.design/y78v6iQJSnivWTWK/scene.splinecode" />
      <p>Loading</p>
    </div>
  )
}

export default App
