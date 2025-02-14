import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import successAnimation from "../utils/success.json";
import { RiLoaderFill } from "react-icons/ri";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/forgot-password`, values);
        setSuccess(true);
        toast.success("Reset password link sent successfully!");
      } catch (error) {
        if (error.response?.status === 404 || error.response?.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Server error. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  if (success) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="p-10 text-center bg-white rounded-lg shadow-md">
          <img src="/eye_logo.png" alt="logo" className="mx-auto mb-2 h-10" />
          <h1 className="mb-4 text-3xl font-bold text-gray-900">SI HER</h1>
          <Lottie animationData={successAnimation} loop={false} className="mx-auto h-48" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Reset Password Link Sent!</h2>
          <p className="text-gray-600">Please check your email to reset your password.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 w-full max-w-md bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img src="/eye_logo.png" alt="logo" className="mx-auto mb-2 h-10" />
          <h1 className="text-xl font-bold text-gray-900">Forget Password</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className={`bg-gray-50 border rounded-lg w-full p-2.5 mt-1 ${
                formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300"
              } focus:ring-primary-600 focus:border-primary-600`}
              placeholder="name@company.com"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="mt-1 text-xs text-red-500">*{formik.errors.email}</p>
            )}
          </div>
          <div className="flex justify-between items-center text-sm">
            <Link to="/auth/login" className="text-[#3E21F3] hover:underline">
              Sign in instead?
            </Link>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="flex items-center justify-center gap-2 w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-gradient-to-b from-[#c8bafd] to-[#3e21f3] hover:opacity-90 disabled:opacity-80"
          >
            {loading ? (
              <>
                <RiLoaderFill className="text-lg animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgetPassword;
