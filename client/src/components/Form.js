import React from 'react';

export default (props) => {

  // getting the value from propss and assigning it to the variable
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  function handleSubmit(event) {
    // preventing the default function and calls submit button from props
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    // preventing the default function and calls cancel button from props
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="grid-100 pad-bottom">
            <button className="button" type="submit" onClick={ handleSubmit }>{ submitButtonText }</button>
            <button className="button button-secondary" onClick={ handleCancel }>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  // if there is erors, display error
  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
