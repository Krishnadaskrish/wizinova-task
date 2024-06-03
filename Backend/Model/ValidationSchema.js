const joi = require("@hapi/joi");

const joiRegistrationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().lowercase().required(),
  mobile: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  password: joi
    .string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

module.exports = {
  joiRegistrationSchema,
};
