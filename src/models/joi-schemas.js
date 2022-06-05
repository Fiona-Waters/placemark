/**
 * Application Joi Schemas
 *
 * @author Fiona Waters
 * @date 05/06/2022
 * @version 4
 */

import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("donald@duck.com").required(),
    password: Joi.string().example("secret").required(),
    permission: Joi.string().example("ADMIN"),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Donald").required(),
  lastName: Joi.string().example("Duck").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const SpotSpec = Joi.object()
  .keys({
    placeName: Joi.string().example("Winnies").required(),
    lat: Joi.number().example(22.22).required(),
    lng: Joi.number().example(-12.32).required(),
    description: Joi.string().example("A lovely shop").required(),
    category: Joi.string().example("Shop").required(),
    images: Joi.array().items(Joi.object({
        _id: IdSpec,
        img: Joi.string(),
        imgid: Joi.string(),
    })),
    craftid: IdSpec,
  })
  .label("Spot");

export const SpotSpecPlus = SpotSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("SpotPlus");

export const SpotSpecArray = Joi.array().items(SpotSpecPlus).label("SpotArray");

export const CraftSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Knitting"),
    userid: IdSpec,
    spots: SpotSpecArray,
    img: Joi.string(),
    imgid: Joi.string()
  })
  .label("Craft");

export const CraftSpecPlus = CraftSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CraftPlus");

export const CraftArraySpec = Joi.array().items(CraftSpecPlus).label("CraftArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
