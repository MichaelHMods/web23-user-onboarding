import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const AcctForm = ({ errors, touched, values, status }) => {
    const [person, setPerson] = useState([status]);
    useEffect(() => {
        if (status) {
            setPerson([status]);
        }
    }, [status]);

    return (
        <div className="form">
            <h1>The form that I am making</h1>
            <Form>
                <Field type='text' name='name' placeholder="Name"/>
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field type='email' name='email' placeholder="email@email.com"/>
                {touched.email && errors.email && (
                    <p className="error">{errors.email} </p>
                )} 
                <Field type='text' name='password' placeholder="password"/>
                {touched.password && errors.password && (
                    <p className="error">{errors.password} </p>
                )}
                <label>
                    ToS 
                    <Field
                        type='checkbox'
                        name="tos"
                        checked={values.tos}
                    />

                </label>
                <button type="submit">Submit</button>
            </Form>
        </div>
        )
};

const FormikForm = withFormik({
    mapPropsToValues({}) {
        return {
            names: name 
        }
    }
})


export default AcctForm;
