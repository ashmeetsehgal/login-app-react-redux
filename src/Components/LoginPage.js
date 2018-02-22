import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import loginAction from '../Actions/loginAction';

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

const LoginPage = (props) => {
  const {
    handleSubmit, pristine, submitting, reset,
  } = props;

  const formSubmit = (values) => {
    const { login } = props;
    const { username, password } = values;
    fetch(`https://swapi.co/api/people/?search=${username}`)
      .then(res => res.json())
      .then((data) => {
        if (data.count === 0) {
          console.log('no user');
        } else {
          data.results.map((i) => {
            if (i.name.toLowerCase() === username.toLowerCase()) {
              if (i.birth_year === password) {
                const isLuke = username.toLowerCase === 'luke skywalker';
                console.log('login');
                login({
                  isUserLoggedIn: true,
                  username,
                  isLuke,
                });
                return 0;
              }
              console.log('invalid password');
            }
          });
        }
      });
  };

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

const mapStateToProps = state => ({
  isUserLoggedIn: state.loginReducer.isUserLoggedIn,
  username: state.loginReducer.username,
  isLuke: state.loginReducer.isLuke,
});

const mapDispatchToProps = dispatch => ({
  login: props => dispatch(loginAction(props)),
});

const LoginPageComponent = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default reduxForm({
  form: 'login',
  validate,
})(LoginPageComponent);
