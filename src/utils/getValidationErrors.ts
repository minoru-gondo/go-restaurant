import { ValidationError } from "yup";

interface IErrors {
  [key: string]: string;
}

export default function getValidationErrors(errors: ValidationError): IErrors {
  const validationErrors: IErrors = {}
  errors.inner.forEach(erro => {
    validationErrors[erro.path] = erro.message
  })
  return validationErrors;
}
