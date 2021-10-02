export const validateEmail = (email: string): boolean =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+[.][a-zA-Z0-9-]{2,})+$/.test(
    email
  )

export const validateInput = (
  element: HTMLInputElement | HTMLTextAreaElement | null
): void => {
  if (element?.validity.valueMissing) {
    return element.setCustomValidity(`${element.placeholder} is required`)
  }

  if (element?.validity.tooShort) {
    return element.setCustomValidity(
      `${element.placeholder} needs to be ${element.minLength} characters or longer`
    )
  }

  if (element?.validity.tooLong) {
    return element.setCustomValidity(
      `${element.placeholder} needs to be ${element.maxLength} characters or shorter`
    )
  }

  if (element?.type === 'email' && !validateEmail(element.value)) {
    return element.setCustomValidity(`${element.placeholder} is invalid`)
  }

  return element?.setCustomValidity('')
}
