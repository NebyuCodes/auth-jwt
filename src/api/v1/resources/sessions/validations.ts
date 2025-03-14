import Joi from "joi";

export const destroySessionValidation = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": "User ID should be a string",
    "string.empty": "User ID can not be empty",
    "any.required": "User ID is required",
  }),
  deviceId: Joi.string().required().messages({
    "string.base": "Device ID should be a string",
    "string.empty": "Device ID can not be empty",
    "any.required": "Device ID is required",
  }),
  ownerId: Joi.string().required().messages({
    "string.base": "Owner ID should be a string",
    "string.empty": "Owner ID can not be empty",
    "any.required": "Owner ID is required",
  }),
  ownerDeviceId: Joi.string().required().messages({
    "string.base": "User ID should be a string",
    "string.empty": "User ID can not be empty",
    "any.required": "User ID is required",
  }),
});
