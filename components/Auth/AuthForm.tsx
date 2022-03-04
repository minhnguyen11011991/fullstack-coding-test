import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function validateEmail(value) {
    let error
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!value) {
      error = 'Email is required';
    } else if (!regex.test(value)) {
      error = 'Email is invalid';
    }
    return error
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Password is required';
    }
    return error;
  }

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className={classes.auth}>
      <Heading as='h1'>{isLogin ? 'Login' : 'Sign Up'}</Heading>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}>
        {(props) => (
          <Form>
            <Field name='email' validate={validateEmail}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel htmlFor='email'>Your email</FormLabel>
                  <Input {...field} id='email' placeholder='email' />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password' validate={validatePassword}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
                  <FormLabel htmlFor='password'>Your password</FormLabel>
                  <Input {...field} id='password' placeholder='password' />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <div className={classes.actions}>
              <Button
                mt={4}
                colorScheme='teal'
                isLoading={props.isSubmitting}
                type='submit'
              >
                {isLogin ? 'Login' : 'Create Account'}
              </Button>

              <Button
                mt={4}
                className={classes.toggle}
                type='button'
                onClick={switchAuthModeHandler}
              >
                {isLogin ? 'Create new account' : 'Login with existing account'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AuthForm;
