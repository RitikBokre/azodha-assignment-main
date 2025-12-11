import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/slices/authSlice";
import { DEMO_CREDENTIALS } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      if (
        values.username === DEMO_CREDENTIALS.username &&
        values.password === DEMO_CREDENTIALS.password
      ) {
        dispatch(login(values.username));
        navigate("/onboarding");
      } else {
        setError("Invalid username or password");
      }
    },
  });

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Welcome Back!</h1>
          <p className="py-6">
            Sign in to continue your onboarding journey. Use the demo
            credentials to get started.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={formik.handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="Enter your username"
                className={`input input-bordered ${
                  formik.touched.username && formik.errors.username
                    ? "input-error"
                    : ""
                }`}
              />
              {formik.touched.username && formik.errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error text-sm ">
                    {formik.errors.username}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter your password"
                className={`input input-bordered ${
                  formik.touched.password && formik.errors.password
                    ? "input-error"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {formik.errors.password}
                  </span>
                </label>
              )}
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-control mt-6 flex justify-center">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>

            <div className="alert alert-info mt-4">
              <div className="text-xs">Demo Credentials</div>
              <div className="font-mono font-bold">
                {DEMO_CREDENTIALS.username} / {DEMO_CREDENTIALS.password}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
