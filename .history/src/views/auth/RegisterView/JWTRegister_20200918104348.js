import React, { useState }  from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import {registerUser,sendMail} from 'src/Api/index';


const useStyles = makeStyles(() => ({
  root: {}
}));

const JWTRegister = ({ className, ...rest }) => {
  const [spinner, setSpinner] = useState(false);
  const classes = useStyles();
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        mobile: '',
        password: '',
        policy: false,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        firstName: Yup.string().min(2).max(64).required('First Name is required'),
        lastName: Yup.string().min(2).max(64).required('Last Name is required'),
        mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone Number is required'),
        password: Yup.string().min(8).max(32).required('Password is required'),
        policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          setSpinner(true);
          values.orgId="725550"
          registerUser(values)
          .then(response=>{
            setSpinner(false);
            // console.log(response,"From Vetezi api")
            if(response.data.responseCode=='01')
            {
              setStatus({ success: false });
              setErrors({ submit: response.data.responseMessage });
              setSubmitting(false);
            }
            else if(response.data.responseCode=='00'){
              let userId=response.data.responseData.userGlobalId;
              let userAcountBalance = response.data.responseData.userAccountBalance;

            let mailPayload={
              "email": values.email,
              "message": "You just signed up on Vezeti web application with the following details",
                "mailSubject":"Successfull Registration Vezeti Platform",
                "firstName":values.firstName,
                "lastName":values.lastName,
                "phone":values.mobile,
                "accountBalance":userAcountBalance
              };
                sendMail(mailPayload)
                .then(res=>{
                  // console.log(res,"mail response")
                  register(values.email, values.firstName, values.lastName, values.mobile, values.password,userId,userAcountBalance);
                  setStatus({ success: true });
                  setSubmitting(false);
                })
                .catch(errorMail=>{
                  register(values.email, values.firstName, values.lastName, values.mobile, values.password,userId,userAcountBalance);
                  setStatus({ success: true });
                  setSubmitting(false);
                })




            }
          })
        } catch (err) {
          setSpinner(false);
          console.error(err);
          // setStatus({ success: false });
          // setErrors({ submit: err.message });
          // setSubmitting(false);
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
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
          error={Boolean(touched.firstName && errors.firstName)}
          fullWidth
          helperText={touched.firstName && errors.firstName}
            label="First Name"
            margin="normal"
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.lastName && errors.lastName)}
            fullWidth
            helperText={touched.lastName && errors.lastName}
            label="Last Name"
            margin="normal"
            name="lastName"
            value={values.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.mobile && errors.mobile)}
            fullWidth
            helperText={touched.mobile && errors.mobile}
            label="Phone Number"
            margin="normal"
            name="mobile"
            value={values.mobile}
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
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
          <Box
            alignItems="center"
            display="flex"
            mt={2}
            ml={-1}
          >
            <Checkbox
              checked={values.policy}
              name="policy"
              onChange={handleChange}
            />
            <Typography
              variant="body2"
              color="textSecondary"
            >
              I have read the
              {' '}
              <Link
                component="a"
                href="#"
                color="secondary"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>
              {errors.policy}
            </FormHelperText>
          )}
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
              Register
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

JWTRegister.propTypes = {
  className: PropTypes.string
};

export default JWTRegister;
