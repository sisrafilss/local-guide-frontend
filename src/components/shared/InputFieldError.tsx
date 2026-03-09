import { getInputFieldError, IInputErrorState } from '@/lib/getInputFieldError';
import { FieldError } from '../ui/field';

interface InputFieldErrorProps {
  field: string;
  state: IInputErrorState;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  const errorMessage = getInputFieldError(field, state);
  
  if (errorMessage) {
    return (
      <FieldError className="text-red-500 font-bold italic text-[10px] uppercase tracking-wider mt-1.5 ml-1 animate-in fade-in slide-in-from-left-2 duration-300">
        {errorMessage}
      </FieldError>
    );
  }

  return null;
};

export default InputFieldError;
