import { useState } from "react";

const ModalSelect = ({part, setPart, functionCheck}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }
  
  function handleClick() {
    console.log(inputValue);
    functionCheck(part, inputValue)
  }

  return (
    <div className='flex flex-col justify-center gap-3'>

      <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">Ingrese el codigo del elemento: {part}</label>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
        <input 
          type="text" 
          name="price" 
          id="price" 
          className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="codigo"/>
        </div>
      </div>
      <button className="text-center rounded-md bg-white border px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" onClick={handleClick}>Aceptar</button>
      <button className="text-center rounded-md bg-gray-300 border px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-white hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" onClick={() => setPart('')}>Cancelar</button>
    </div>

  );
};

export default ModalSelect;
