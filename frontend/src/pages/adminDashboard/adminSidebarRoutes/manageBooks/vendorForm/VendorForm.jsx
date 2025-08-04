// src/components/VendorForm.jsx
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import './vendorForm.css';

const validationSchema = Yup.object().shape({
  vendor: Yup.string().required('Vendor name is required'),
  billNo: Yup.string().required('Bill No is required'),
  billDate: Yup.date().required('Bill Date is required'),
  cost: Yup.number().min(0).required('Cost is required')
});

export const VendorForm = ({ onNext }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleVendorSuggest = async (value, setFieldValue) => {
    setFieldValue('vendor', value);
    if (!value) return setSuggestions([]);
    try {
      const res = await fetch(`http://localhost:3000/library/vendor/search?query=${value}`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Vendor suggestion error:', err);
    }
  };

  const handleVendorSelect = (name, setFieldValue) => {
    setFieldValue('vendor', name);
    setSuggestions([]);
  };

  return (
    <div className="vendor-form-container">
      <Container>
        <Card className="p-4">
          <h5 className="text-center fw-bold mb-4">Vendor Bill Details</h5>

          <Formik
            initialValues={{ vendor: '', billNo: '', billDate: '', cost: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => onNext(values)} // ✅ just pass data up
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
              <Form noValidate onSubmit={handleSubmit}>
                {/* Vendor Input */}
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Vendor</Form.Label>
                      <div className="input-suggestion-wrapper">
                        <Form.Control
                          type="text"
                          name="vendor"
                          value={values.vendor}
                          onChange={(e) => handleVendorSuggest(e.target.value, setFieldValue)}
                          onBlur={handleBlur}
                          isInvalid={touched.vendor && !!errors.vendor}
                          autoComplete="off"
                        />
                        {suggestions.length > 0 && (
                          <ul className="suggestion-box">
                            {suggestions.map((v) => (
                              <li key={v._id} onClick={() => handleVendorSelect(v.name, setFieldValue)}>
                                {v.name}
                              </li>
                            ))}
                          </ul>
                        )}
                        <Form.Control.Feedback type="invalid">{errors.vendor}</Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>

                  {/* Bill No */}
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Bill No</Form.Label>
                      <Form.Control
                        type="text"
                        name="billNo"
                        value={values.billNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.billNo && !!errors.billNo}
                      />
                      <Form.Control.Feedback type="invalid">{errors.billNo}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* Bill Date */}
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Bill Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="billDate"
                        value={values.billDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.billDate && !!errors.billDate}
                      />
                      <Form.Control.Feedback type="invalid">{errors.billDate}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Cost */}
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Cost on Bill</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        name="cost"
                        value={values.cost}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.cost && !!errors.cost}
                      />
                      <Form.Control.Feedback type="invalid">{errors.cost}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className="w-100 submit-btn">
                  Save & Continue
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </div>
  );
};
