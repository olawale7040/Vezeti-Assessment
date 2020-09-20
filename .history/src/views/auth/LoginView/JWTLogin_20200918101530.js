import React, { useState }  from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {loginUser} from 'src/Api/index';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {}
}));

const JWTLogin = ({ className, ...rest }) => {
  const [spinner, setSpinner] = useState(false);
  const classes = useStyles();
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();

//   handleSubmit=()=>{
//     Axios.post("http://localhost:5000/reset-password", {
//       "email": "lukuman7040@gmail.com","message": "You just logged in to your Vezeti account",
//       "mailSubject":"Successfull Login Vezeti Platform",
//       "firstName":"Adekunle",
//       "lastName":"Luqman",
//       "phone":"07067388688",
//       "accountBalance":"20,000"
//     })
//   .then(response=>{
//       console.log("Success sendgrid",response);
//       }

//   )
// }

  return (
    <Formik
      initialValues={{
        email: 'demo@devias.io',
        password: 'Password123',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          setSpinner(true);
          values.orgId="725550";
          values.typeEmailOrPhone="email";
          loginUser(values)
          .then(response=>{
            setSpinner(false);
            console.log("api response",response.data.responseData)
            if(response.data.responseCode=='01')
            {
              setStatus({ success: false });
              setErrors({ submit: response.data.responseMessage });
              setSubmitting(false);
            }
            else if(response.data.responseCode=='00'){
              let user=response.data.responseData;
              login(user);
              setStatus({ success: true });
            setSubmitting(false);
            }
          })
          // await login(values.email, values.password);

          // if (isMountedRef.current) {
          //   setStatus({ success: true });
          //   setSubmitting(false);
          // }
        } catch (err) {
          setSpinner(false);
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Log In
              {spinner?
                <img
                                  src="/preloader.gif"
                                //   style="margin-left:20px;"
                                  className="button-spinner"
                                />
                             : null }
            </Button>
          </Box>
          
        </form>
      )}
    </Formik>
  );
};

JWTLogin.propTypes = {
  className: PropTypes.string,
};

export default JWTLogin;
