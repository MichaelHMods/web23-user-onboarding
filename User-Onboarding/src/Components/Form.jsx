import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const AcctForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        if (status) {
            setUsers([status]);
            
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

            {users.map(users =>(
                
                <ul key={users.id}>
                    
                    <li>Name:{users.name}</li>
                    <li>Email:{users.email} </li>
                    <li>Password:{users.password}</li>
                </ul>
            ))}
        </div>
        )
};

const FormikForm = withFormik({
    mapPropsToValues({name, email, password, tos}) {
        return {
            names: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false,
        }
    },

validationSchema: Yup.object().shape({
    name: Yup.string().required("Name Required"),
    email: Yup.string().required(),
    password: Yup.string().required().min( 8, "8 characters minimum"),
    
}),

handleSubmit(values, { setStatus }) {
    axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            setStatus(res.data);
            console.log(res);
        })
        .catch(err => console.log(err.response)); 
}
})(AcctForm);

// const higherOrderComponent(this-one-houses-function)(this-one-houses-component);


export default FormikForm;
