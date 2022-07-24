const Dash = ({ user }) => {
    return (
    
      <div className="canvas">
          <h1 className="canvasTitle">Welcome {user.displayName}!</h1>
          <div className="wrapper">
		  <div className="left">
		  <img
                src={user.photos[0].value}
                alt=""
                className="bigAvatar"
            />
          </div>
		  </div>
      </div>
  
    );
  };
  
  export default Dash;