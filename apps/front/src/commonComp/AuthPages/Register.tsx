import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { register } from '../../redux/Slice/authSlice';
import { type RegisterPayload } from '../../redux/types/auth.types';
import { useNavigate } from 'react-router-dom';
import { useEmailValidator } from '../../api/useEmailValidator'; // ⬅️ import hook

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterPayload>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });
  

  const {
    validateEmail,
    available,
    checking,
    error: emailError,
  } = useEmailValidator();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (available === false) {
      alert('Email is already taken');
      return;
    }

    try {
      await dispatch(register(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit}>

        {/* First Name */}
        <div className="mb-4">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Email Field with Validation */}
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => validateEmail(formData.email)}
            className={`w-full p-2 border rounded ${
              available === false ? 'border-red-500' : available === true ? 'border-green-500' : ''
            }`}
            required
          />
          {checking && <p className="text-sm text-blue-500">Checking email...</p>}
          {available === false && <p className="text-sm text-red-500">Email already exists</p>}
          {available === true && <p className="text-sm text-green-600">Email is available</p>}
          {emailError && <p className="text-sm text-red-400">{emailError}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block mb-2">Phone (Optional)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
