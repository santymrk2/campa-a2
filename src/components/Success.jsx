const Success = ({strong}) => {

  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-3 rounded-lg" role="alert">
      <p className="font-bold">{strong}</p>
    </div>
  );
};

export default Success;