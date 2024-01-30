import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import LoadingSpinner from "./spinner";
import { CartContext } from "../store/cartContextProvider";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";

function AddItems() {
  //const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = (values) => {
    //await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        console.log(typeof(values.price));
        if (!values.name) {
          errors.name = "Name is Required";
        }
        console.log(errors);
        return errors;
      }}
      initialValues={{ name: "", retireStatus: "false" }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name">
            {({ input, meta }) => (
              <div>
                <label>Item Name</label>
                <input {...input} type="text" placeholder="Item Name" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div>
            <label>Retire Status</label>
            <Field name="retireStatus" component="select">
              <option value="true">Retired From Menu</option>
              <option value="false">Show to User</option>
            </Field>
          </div>
          <Field name="price">
            {({ input, meta }) => (
              <div>
                <label>Item Price</label>
                <input {...input} type="number" placeholder="Item Price" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="description">
            {({ input, meta }) => (
              <div>
                <label>Item Description</label>
                <input {...input} type="text" placeholder="Item Description" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>

          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  );
}

export default AddItems;
