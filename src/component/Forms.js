import React from 'react';

import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Forms({errors, touched}) {
    return (
        <div>
            <Form>
                <Field type='text' name='name' placeholder='Enter your name'/>
                {touched.name && errors.name && (<p>{errors.name}</p>)}
                <Field type='email' name='email' placeholder='Enter your email'/>
                {touched.email && errors.email && (<p>{errors.email}</p>)}
                <Field type='password' name='password' placeholder='Enter your password'/>
                {touched.password && errors.password && (<p>{errors.password}</p>)}
                <label>
                    Terms of service 
                    <Field type='checkbox' name='terms'/>
                </label>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    )
}

const FormikForms = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3).required('You need to input your name!'),
        email: Yup.string().email().required('Input your email!'),
        password: Yup.string().min(5).required('We need a password!')
    }),
    handleSubmit(values, {setStatus}) {
        axios
          .post('https://reqres.in/api/users', values)
          .then(res => {
                setStatus(res.data);
                console.log(res.data)
            })
          .catch(err => console.log(err.response));
    }
})(Forms);
export default FormikForms;