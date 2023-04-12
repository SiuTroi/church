import './Loading.scss';

function Loading({position, bg, zIndex}) {
  return (
    <div className="spinner" style={{ position: position, backgroundColor: bg, zIndex: zIndex}}>
      <div className="spinner-inner"></div>
      <div className="spinner-inner"></div>
      <div className="spinner-inner"></div>
    </div>
  );
}

export default Loading;
