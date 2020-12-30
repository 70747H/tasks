// Reference: https://docs.nestjs.com/techniques/validation#auto-validation
export const classValidatorOptions = {
  // Make sure that there's no unexpected data
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,

  /**
   * Detailed error messages since this is 4xx
   */
  disableErrorMessages: false,

  validationError: {
    /**
     * WARNING: Avoid exposing the values in the error output (could leak sensitive information)
     */
    value: false,
  },

  /**
   * Transform the JSON into a class instance when possible.
   * Depends on the type of the data on the controllers
   */
  transform: true,
};