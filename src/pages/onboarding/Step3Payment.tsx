import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPaymentInfo, setCurrentStep } from '../../store/slices/onboardingSlice';
import OnboardingLayout from '../../components/OnboardingLayout';

const Step3Payment = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const paymentInfo = useAppSelector((state) => state.onboarding.paymentInfo);

    const formik = useFormik({
        initialValues: {
            cardNumber: paymentInfo.cardNumber || '',
            expiryDate: paymentInfo.expiryDate || '',
            cvv: paymentInfo.cvv || '',
        },
        validationSchema: Yup.object({
            cardNumber: Yup.string()
                .matches(/^[0-9]{16}$/, 'Card number must be 16 digits')
                .required('Card number is required'),
            expiryDate: Yup.string()
                .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Format must be MM/YY')
                .required('Expiry date is required'),
            cvv: Yup.string()
                .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits')
                .required('CVV is required'),
        }),
        onSubmit: (values) => {
            dispatch(setPaymentInfo(values));
            dispatch(setCurrentStep(4));
            navigate('/onboarding/step4');
        },
    });

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        return cleaned.slice(0, 16);
    };

    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    return (
        <OnboardingLayout
            renderButtons={(handleBack) => (
                <div className="card-actions justify-between mt-8">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="btn btn-outline"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        form="payment-form"
                        className="btn btn-primary"
                    >
                        Next
                    </button>
                </div>
            )}
        >
            <h2 className="card-title text-3xl mb-2">Payment Information</h2>
            <p className="text-base-content/70 mb-6">Secure your account with payment details</p>

            <form id="payment-form" onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="form-control">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <label className="label sm:w-32 sm:justify-start sm:pt-2 p-0 pb-1 sm:pb-0" htmlFor="cardNumber">
                            <span className="label-text font-medium text-gray-700">Card Number</span>
                        </label>
                        <div className="flex-1">
                            <input
                                id="cardNumber"
                                name="cardNumber"
                                type="text"
                                onChange={(e) => {
                                    formik.setFieldValue('cardNumber', formatCardNumber(e.target.value));
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.cardNumber}
                                placeholder="1234 5678 1234 5678"
                                maxLength={16}
                                className={`input input-bordered w-full ${formik.touched.cardNumber && formik.errors.cardNumber ? 'input-error' : ''
                                    }`}
                            />
                            {formik.touched.cardNumber && formik.errors.cardNumber && (
                                <label className="label p-0 pt-1">
                                    <span className="label-text-alt text-error">{formik.errors.cardNumber}</span>
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 ml-0 sm:ml-32 sm:pl-2">
                    <div className="form-control">
                        <label className="label p-0 pb-1" htmlFor="expiryDate">
                            <span className="label-text font-medium text-gray-700">Expiry Date</span>
                        </label>
                        <input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            onChange={(e) => {
                                formik.setFieldValue('expiryDate', formatExpiryDate(e.target.value));
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.expiryDate}
                            placeholder="MM/YY"
                            maxLength={5}
                            className={`input input-bordered w-full ${formik.touched.expiryDate && formik.errors.expiryDate ? 'input-error' : ''
                                }`}
                        />
                        {formik.touched.expiryDate && formik.errors.expiryDate && (
                            <label className="label p-0 pt-1">
                                <span className="label-text-alt text-error">{formik.errors.expiryDate}</span>
                            </label>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label p-0 pb-1" htmlFor="cvv">
                            <span className="label-text font-medium text-gray-700">CVV</span>
                        </label>
                        <input
                            id="cvv"
                            name="cvv"
                            type="text"
                            onChange={(e) => {
                                const cleaned = e.target.value.replace(/\D/g, '');
                                formik.setFieldValue('cvv', cleaned.slice(0, 4));
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.cvv}
                            placeholder="123"
                            maxLength={4}
                            className={`input input-bordered w-full ${formik.touched.cvv && formik.errors.cvv ? 'input-error' : ''
                                }`}
                        />
                        {formik.touched.cvv && formik.errors.cvv && (
                            <label className="label p-0 pt-1">
                                <span className="label-text-alt text-error">{formik.errors.cvv}</span>
                            </label>
                        )}
                    </div>
                </div>

                <div className="alert alert-info">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-current shrink-0 w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span className="text-sm">
                        This is a demo. Your payment information is stored locally and not transmitted anywhere.
                    </span>
                </div>
            </form>
        </OnboardingLayout>
    );
};

export default Step3Payment;
