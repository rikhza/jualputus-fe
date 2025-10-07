interface ProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function Progress({ currentStep, totalSteps, steps }: ProgressProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-150
                    ${isCompleted ? 'bg-emerald-600 text-white' : ''}
                    ${isCurrent ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-slate-200 text-slate-500' : ''}
                  `}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className={`mt-2 text-xs font-medium hidden sm:block ${isCurrent ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {step}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div className={`h-0.5 flex-1 mx-2 ${stepNumber < currentStep ? 'bg-emerald-600' : 'bg-slate-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
