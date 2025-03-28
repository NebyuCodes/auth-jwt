import Joi from "joi";

export const renewTokenValidation = Joi.object({
  user: Joi.string().required().messages({
    "string.base": "User ID should be a string",
    "string.empty": "User ID can not be empty",
    "any.required": "User ID is required",
  }),
});
