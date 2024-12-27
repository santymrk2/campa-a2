const Warning = ({strong, text}) => {

  return (
    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 m-3 rounded-lg" role="alert">
      <p className="font-bold">{strong}</p>
      <p>{text}</p>
    </div>
  );
};

export default Warning;