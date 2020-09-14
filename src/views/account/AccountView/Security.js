import React from 'react';
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
import {forgetPin} from 'src/Api/index';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Security = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  return (
    <Formik
      initialValues={{
        mobile: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone Number is required'),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          values.orgId="725550";
            console.log(values,"Api Payload");
            forgetPin(values)
            .then(response=>{
                console.log(response,"From Vetezi forgot pin")
                if(response.data.responseCode=='01')
                {
                  setStatus({ success: false });
                  setErrors({ submit: response.data.responseMessage });
                  setSubmitting(false);
                }
                else if(response.data.responseCode=='00'){
                  resetForm();
                  setStatus({ success: true });
                  setSubmitting(false);
                  enqueueSnackbar(response.data.responseMessage, {
                    variant: 'success'
                  });
                  console.log(response.data.responseData,"Api Success")
                }
              })
          // // NOTE: Make API request
          // await wait(500);
          // resetForm();
          // setStatus({ success: true });
          // setSubmitting(false);
          // enqueueSnackbar('Password updated', {
          //   variant: 'success'
          // });
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
            <CardHeader title="Get Pin" />
            <Divider />
            <CardContent>
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
                Get Pin
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

Security.propTypes = {
  className: PropTypes.string
};

export default Security;
