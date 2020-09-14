import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import wait from 'src/utils/wait';
import {changeEmailAddress} from 'src/Api/index';
import useAuth from 'src/hooks/useAuth';
const useStyles = makeStyles(() => ({
  root: {}
}));

const ForgotPin = ({ className,...rest }) => {
  const [spinner, setSpinner] = useState(false);
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        email: '',
        newEmail: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        newEmail: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
            // console.log(user,"Payload for changing email");
            values.orgId="725550";
            let payload={
                currentEmail:values.email,
                newEmail:values.newEmail,
                orgId:"725550",
                userId:user.userId,
            }
            // console.log(payload,"Payload for changing email");
            changeEmailAddress(payload)
            .then(response=>{
                console.log(response,"From Vetezi change email")
                if(response.data.responseCode=='01')
                {
                  setStatus({ success: false });
                  setErrors({ submit: response.data.responseMessage });
                  setSubmitting(false);
                }
                else if(response.data.responseCode=='00'){
                  
                  console.log(response.data.responseData,"Api Success")
                     resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar(response.data.responseMessage, {
            variant: 'success'
          });
                }
              })


        //   // NOTE: Make API request
        //   await wait(500);
        //   resetForm();
        //   setStatus({ success: true });
        //   setSubmitting(false);
        //   enqueueSnackbar('Password updated', {
        //     variant: 'success'
        //   });
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
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
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Change Email" />
            <Divider />
            <CardContent>
                <span className="spanError">Not working at the moment, endpoint returns not 404 error (Not Found)</span>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Current Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  </Grid>
                  </Grid>
                  <Grid
                container
                spacing={3}
              >
                  <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TextField
            error={Boolean(touched.newEmail && errors.newEmail)}
            fullWidth
            helperText={touched.newEmail && errors.newEmail}
            label="New Email Address"
            margin="normal"
            name="newEmail"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.newEmail}
            variant="outlined"
          />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Change Email
                {spinner?
                <img
                                  src="/preloader.gif"
                                //   style="margin-left:20px;"
                                  className="button-spinner"
                                />
                             : null }
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

ForgotPin.propTypes = {
  className: PropTypes.string,
};

export default ForgotPin;
