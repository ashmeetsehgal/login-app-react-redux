import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 2) {
    errors.username = 'Minimum be 2 characters or more';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const renderField = ({
  input, id, label, type, meta: { touched, error, warning },
}) => (
  <div>
    <label htmlFor={id}>{label}
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span >{error}</span>) || (warning && <span>{warning}</span>))}
    </label>
  </div>
);

const formSubmit = (values) => {
  const { username, password } = values;
  console.log(password);
  fetch(`https://swapi.co/api/people/?search=${username}`)
    .then(res => res.json())
    .then((data) => {
      if (data.count === 0) {
        console.log('no user');
      } else {
        data.results.map((i) => {
          if (i.name.toLowerCase() === username.toLowerCase()) {
            if (i.birth_year === password) {
              console.log('login');
              return 0;
            }
            console.log('invalid password');
          }
        });
      }
    });
};

const LoginPage = (props) => {
  const {
    handleSubmit, pristine, submitting, reset,
  } = props;

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div>
          Login
        <Field
          id='username'
          name='username'
          placeholder='Username'
          type='text'
          component={renderField}
        />
        <Field
          name='password'
          placeholder='Password'
          type='password'
          component={renderField}
        />
        <button
          type='submit'
          disabled={pristine || submitting}
        >
          Submit
        </button>
        <button
          value='button'
          onClick={reset}
          disabled={pristine || submitting}
        >
          Clear
        </button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: 'login',
  validate,
})(LoginPage);
