import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/app.css';
import App from './app';

class ErrorBoundary extends React.Component {
 
	// Constructor for initializing Variables etc in a state
	// Just similar to initial line of useState if you are familiar
	// with Functional Components
	constructor(props) {
	  super(props);
	  this.state = { error: null, errorInfo: null };
	}
   
	// This method is called if any error is encountered
	componentDidCatch(error, errorInfo) {
   
	  // Catch errors in any components below and
	  // re-render with error message
	  this.setState({
		error: error,
		errorInfo: errorInfo
	  })
   
	  // You can also log error messages to an error
	  // reporting service here
	}
   
	// This will render this component wherever called
	render() {
	  if (this.state.errorInfo) {
   
		// Error path
		return (
		  <div>
			<h2>An Error Has Occurred</h2>
			<details>
			  {this.state.error && this.state.error.toString()}
			  <br />
			  {this.state.errorInfo.componentStack}
			</details>
		  </div>
		);
	  }
	  // Normally, just render children, i.e. in
	  // case no error is Found
	  return this.props.children;
	}
  }

//debugger;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </React.StrictMode>
);

