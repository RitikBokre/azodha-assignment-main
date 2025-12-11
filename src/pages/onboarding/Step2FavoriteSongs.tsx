import { useNavigate } from 'react-router-dom';
import { useFormik, FieldArray, FormikProvider, getIn } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFavoriteSongs, setCurrentStep } from '../../store/slices/onboardingSlice';
import OnboardingLayout from '../../components/OnboardingLayout';

const Step2FavoriteSongs = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const favoriteSongs = useAppSelector((state) => state.onboarding.favoriteSongs);

    const formik = useFormik({
        initialValues: {
            songs: favoriteSongs.length > 0 ? favoriteSongs : [''],
        },
        validationSchema: Yup.object({
            songs: Yup.array()
                .of(Yup.string().required('Song name is required'))
                .min(1, 'At least one song is required'),
        }),
        onSubmit: (values) => {
            const filteredSongs = values.songs.filter((song) => song.trim() !== '');
            dispatch(setFavoriteSongs(filteredSongs));
            dispatch(setCurrentStep(3));
            navigate('/onboarding/step3');
        },
    });

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
                        form="favorite-songs-form"
                        className="btn btn-primary"
                    >
                        Next
                    </button>
                </div>
            )}
        >
            <h2 className="card-title text-3xl mb-2">Favorite Songs</h2>
            <p className="text-base-content/70 mb-6">Add your favorite songs to your profile</p>

            <FormikProvider value={formik}>
                <form id="favorite-songs-form" onSubmit={formik.handleSubmit} className="space-y-3">
                    <FieldArray name="songs">
                        {({ push, remove }) => (
                            <div className="space-y-4">
                                {formik.values.songs.map((song, index) => (
                                    <div key={index} className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <div className="form-control">
                                                <div className="join w-full">
                                                    <span className="btn btn-neutral join-item no-animation">
                                                        {index + 1}
                                                    </span>
                                                    <input
                                                        name={`songs.${index}`}
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.songs[index]}
                                                        placeholder="Enter song name"
                                                        className={`input input-bordered join-item w-full bg-white ${getIn(formik.touched, `songs.${index}`) && getIn(formik.errors, `songs.${index}`)
                                                            ? 'input-error'
                                                            : ''
                                                            }`}
                                                    />
                                                </div>
                                                {getIn(formik.touched, `songs.${index}`) && getIn(formik.errors, `songs.${index}`) && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-error">
                                                            {typeof getIn(formik.errors, `songs.${index}`) === 'string'
                                                                ? getIn(formik.errors, `songs.${index}`)
                                                                : 'Invalid song name'}
                                                        </span>
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                        {(formik.values.songs.length > 1 || song.trim() !== '') && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="btn btn-square btn-ghost text-error"
                                                title={song.trim() === '' ? 'Cancel' : 'Remove'}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => push('')}
                                        className="btn btn-ghost btn-block border-2 border-dashed border-base-300 hover:border-primary hover:text-primary normal-case"
                                    >
                                        <span className='mr-2 text-lg'>+</span>
                                        Add Another Song
                                    </button>
                                </div>

                                {formik.values.songs.length > 0 && (
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
                                        <span>
                                            {formik.values.songs.length} song{formik.values.songs.length !== 1 ? 's' : ''} added
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </FieldArray>
                </form>
            </FormikProvider>
        </OnboardingLayout>
    );
};

export default Step2FavoriteSongs;
