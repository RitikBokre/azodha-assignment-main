import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setPersonalInfo,
  setCurrentStep,
} from "../../store/slices/onboardingSlice";
import OnboardingLayout from "../../components/OnboardingLayout";
import { useState } from "react";

const Step1PersonalProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector((state) => state.onboarding.personalInfo);
  const [preview, setPreview] = useState(personalInfo.profilePicture);

  const formik = useFormik({
    initialValues: {
      name: personalInfo.name || "",
      age: personalInfo.age || "",
      email: personalInfo.email || "",
      profilePicture: personalInfo.profilePicture || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number()
        .required("Age is required")
        .positive("Age must be positive")
        .integer("Age must be an integer")
        .min(13, "Must be at least 13 years old"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      dispatch(setPersonalInfo(values));
      dispatch(setCurrentStep(2));
      navigate("/onboarding/step2");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        formik.setFieldValue("profilePicture", result);
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <OnboardingLayout
      showBack={false}
      renderButtons={() => (
        <div className="card-actions justify-end mt-8">
          <button
            type="submit"
            form="personal-profile-form"
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      )}
    >
      <h2 className="card-title text-3xl mb-2">Personal Profile</h2>
      <p className="text-base-content/70 mb-6">Tell us about yourself</p>

      <form
        id="personal-profile-form"
        onSubmit={formik.handleSubmit}
        className="space-y-6"
      >
        <div className="form-control">
          <div className="flex flex-col sm:flex-row gap-2">
            <label
              className="label sm:w-32 sm:justify-start sm:pt-2 p-0 pb-1 sm:pb-0"
              htmlFor="name"
            >
              <span className="label-text font-medium text-gray-700">
                Full Name
              </span>
            </label>
            <div className="flex-1">
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="Enter your full name"
                className={`input input-bordered w-full ${
                  formik.touched.name && formik.errors.name ? "input-error" : ""
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <label className="label p-0 pt-1">
                  <span className="label-text-alt text-error">
                    {formik.errors.name as string}
                  </span>
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="form-control">
          <div className="flex flex-col sm:flex-row gap-2">
            <label
              className="label sm:w-32 sm:justify-start sm:pt-2 p-0 pb-1 sm:pb-0"
              htmlFor="age"
            >
              <span className="label-text font-medium text-gray-700">Age</span>
            </label>
            <div className="flex-1">
              <input
                id="age"
                name="age"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                placeholder="Enter your age"
                className={`input input-bordered w-full ${
                  formik.touched.age && formik.errors.age ? "input-error" : ""
                }`}
              />
              {formik.touched.age && formik.errors.age && (
                <label className="label p-0 pt-1">
                  <span className="label-text-alt text-error">
                    {formik.errors.age as string}
                  </span>
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="form-control">
          <div className="flex flex-col sm:flex-row gap-2">
            <label
              className="label sm:w-32 sm:justify-start sm:pt-2 p-0 pb-1 sm:pb-0"
              htmlFor="email"
            >
              <span className="label-text font-medium text-gray-700">
                Email
              </span>
            </label>
            <div className="flex-1">
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
                className={`input input-bordered w-full ${
                  formik.touched.email && formik.errors.email
                    ? "input-error"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <label className="label p-0 pt-1">
                  <span className="label-text-alt text-error">
                    {formik.errors.email as string}
                  </span>
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="form-control">
          <div className="flex flex-col sm:flex-row gap-2">
            <label className="label sm:w-32 sm:justify-start sm:pt-2 p-0 pb-1 sm:pb-0">
              <span className="label-text font-medium text-gray-700">
                Profile Picture
              </span>
            </label>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                {preview && (
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={preview} alt="Preview" />
                    </div>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="profilePicture"
                    className="btn btn-outline btn-sm"
                  >
                    {preview ? "Change" : "Upload"}
                  </label>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="text-xs text-base-content/60 mt-1">
                    PNG, JPG up to 10MB
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </OnboardingLayout>
  );
};

export default Step1PersonalProfile;
