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
		  
			<div className="center">
			<div className="line" />
			<div className="divider">•</div>
			</div>

			<div className="right">
			<h2 className="userInfo">Username: {user.username}</h2>
		  	<h2 className="userInfo">URL: {user.profileUrl}</h2>
			</div>

		  </div>
      </div>
  
    );
  };
  
  export default Dash;