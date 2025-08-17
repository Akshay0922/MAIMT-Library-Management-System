// src/pages/VendorPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VendorForm } from './VendorForm';
import axios from 'axios';
import { toast } from 'react-toastify';

export const VendorPage = () => {
  const navigate = useNavigate();

  const handleNext = async (vendorBillData) => {
    try {
      const res = await axios.post('http://localhost:3000/library/vendor/bill', vendorBillData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Vendor Bill Saved!");
        navigate("/add-new-book"); // ✅ go to next page
      } else {
        toast.error("Failed to save vendor bill");
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  return (
    <div>
      <VendorForm onNext={handleNext} />
    </div>
  );
};

