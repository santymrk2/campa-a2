const Alert = ({strong, text}) => {

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-3 rounded-lg" role="alert">
      <p className="font-bold">{strong}</p>
      <p>{text}</p>
    </div>
  );
};

export default Alert;