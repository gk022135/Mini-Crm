"use client"


import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface AuthResponse {
    success: boolean;
    message: string;
    data?: any;
}


// Signup Component
const SignupForm: React.FC<{
    onToggle: () => void;
    onSuccess?: (data: any) => void;
}> = ({ onToggle, onSuccess }) => {
    const [formData, setFormData] = useState<SignupFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Check password strength
        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }

        // Clear errors when user starts typing
        if (error) setError('');
    };

    const calculatePasswordStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        return strength;
    };

    const getPasswordStrengthText = (strength: number): string => {
        const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        return texts[strength] || 'Very Weak';
    };

    const getPasswordStrengthColor = (strength: number): string => {
        const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
        return colors[strength] || 'bg-gray-300';
    };

    const validateForm = (): boolean => {
        if (!formData.firstName.trim()) {
            setError('First name is required');
            return false;
        }
        if (!formData.lastName.trim()) {
            setError('Last name is required');
            return false;
        }
        if (!formData.email) {
            setError('Email is required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!formData.password) {
            setError('Password is required');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (!acceptTerms) {
            setError('Please accept the terms and conditions');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("hi there", response.data);

            if (response.data.success) {
                setSuccess('Account created successfully! Please check your email to verify your account.');

                // Store token if provided
                if (response.data?.token) {
                    localStorage.setItem('authToken', response.data.token);
                }

                // Call success callback after a short delay
                setTimeout(() => {
                    onSuccess?.(response.data);
                }, 2000);
            } else {
                setError(response.data.message || 'Signup failed');
            }

        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full max-w-md mx-auto text-black">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-2">Create Account</h2>
                <p className="text-gray-600">Join us and start managing your leads effectively</p>
            </div>

            <div>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">
                            First Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                autoComplete="given-name"
                                required
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="First name"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Last name"
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div className="mb-6">
                    <label htmlFor="signup-email" className="block text-sm font-medium text-black mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <label htmlFor="signup-password" className="block text-sm font-medium text-black mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="signup-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Create a password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                        </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                        <div className="mt-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-gray-500">Password Strength</span>
                                <span className="text-xs text-black">{getPasswordStrengthText(passwordStrength)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start mb-6">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-black">
                        I agree to the{' '}
                        <button type="button" className="text-blue-600 hover:text-blue-500 font-medium">
                            Terms of Service
                        </button>{' '}
                        and{' '}
                        <button type="button" className="text-blue-600 hover:text-blue-500 font-medium">
                            Privacy Policy
                        </button>
                    </label>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="flex items-center p-3 mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="flex items-center p-3 mb-6 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {success}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mb-6"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Creating Account...
                        </>
                    ) : (
                        'Create Account'
                    )}
                </button>

                {/* Toggle to Login */}
                <div className="text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <button
                        type="button"
                        onClick={onToggle}
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;