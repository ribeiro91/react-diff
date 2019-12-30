import React from "react";

const ErrorBanner = props => {
  console.info(props);
  if (!props.isValidated && !props.isValid) return null;
  if (!props.isValid && props.isValidated)
    return <div className="alert alert-danger">{props.errorMessage}</div>;
};

export default ErrorBanner;
