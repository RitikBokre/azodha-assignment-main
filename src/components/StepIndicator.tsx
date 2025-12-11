interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
    return (
        <ul className="steps steps-horizontal w-full">
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isPast = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;

                return (
                    <li
                        key={stepNumber}
                        className={`step ${isPast || isCurrent ? 'step-primary' : ''}`}
                        data-content={isPast ? '✓' : stepNumber}
                    >
                        Step {stepNumber}
                    </li>
                );
            })}
        </ul>
    );
};

export default StepIndicator;
