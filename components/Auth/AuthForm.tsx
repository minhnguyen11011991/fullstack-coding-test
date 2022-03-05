import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Field, Form, Formik } from 'formik';

import { AuthContext } from 'store/auth-context';
import Main from 'components/Main/main';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const initialValues = {
    email: '',
    password: ''
  };
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false)
  const authContext = useContext(AuthContext);

  const handleClick = () => setShowPassword(!showPassword)

  const switchAuthModeHandler = (resetForm) => {
    setIsLogin((prevState) => !prevState);
    resetForm();
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

  const submitHandler = (values, actions) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    actions.resetForm();

    if (!isLogin) {
      authContext.signUp(values);
    } else {
      authContext.login(values);
    }
  };

  return (
    <Main>
      <section className={classes.auth}>
        <Heading as='h1'>{isLogin ? 'Login' : 'Sign Up'}</Heading>
        <Formik initialValues={initialValues} onSubmit={submitHandler}>
          {(props) => (
            <Form>
              <Field name='email' validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor='email'>Your email</FormLabel>
                    <Input {...field} id='email' placeholder='Enter email' />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='password' validate={validatePassword}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor='password'>Your password</FormLabel>
                    <InputGroup size='md'>
                      <Input
                        pr='4.5rem'
                        {...field}
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                      />
                      <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <div className={classes.actions}>
                <Button
                  mt={4}
                  colorScheme='teal'
                  isLoading={props.isSubmitting}
                  type='submit'>
                  {isLogin ? 'Login' : 'Create Account'}
                </Button>
                <Button
                  mt={4}
                  className={classes.toggle}
                  type='button'
                  onClick={switchAuthModeHandler.bind(null, props.resetForm)}>
                  {isLogin ? 'Create new account' : 'Login with existing account'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </Main>
  );
};

export default AuthForm;
