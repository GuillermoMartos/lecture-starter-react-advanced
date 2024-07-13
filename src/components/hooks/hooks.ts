import { ChangeEvent, useState } from 'react';

type FormFields = {
    email: string;
    password: string;
    fullName?: string;
  };

const useForm = (initialFields: FormFields, validations: Record<string, (value: string)
    =>
    string | null>)=>
{
  const [ formData, setFormData ] = useState(initialFields);
  const [ errors, setErrors ] =
      useState<Record<string, string | null>>(Object.keys(initialFields)
        .reduce((acc, key) =>
        {
          acc[key] = null;
          return acc;
        }, {} as Record<string, string | null>));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (validations[name]) {
      const error = validations[name](value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  return { formData, errors, handleChange };
};

export default useForm;
