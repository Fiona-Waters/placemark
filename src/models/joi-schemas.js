import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  permission: Joi.string(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const SpotSpec = {
  placeName: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  description: Joi.string().required(),
};

export const CraftSpec = {
  title: Joi.string().required(),
};