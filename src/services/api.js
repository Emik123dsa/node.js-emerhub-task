const API_SCHEMA = "";
import fetch from "isomorphic-fetch";
import qs from "qs";

import { camelizeKeys } from "humps";

import { schema, normalize } from "normalizr";

import { REQUEST } from "./methods";

const callApi = async (endpoint, queryUrl, schema) => {
  let schemaFetch = {
    method: schema,
  };

  if (schema.indexOf(REQUEST.POST) !== -1) {
    schemaFetch = {
      ...schemaFetch,
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(queryUrl),
    };
  }

  const API_BASE_URL =
    endpoint.indexOf(API_SCHEMA) === -1 ? API_SCHEMA + endpoint : endpoint;

  return await fetch(
    schema.indexOf(REQUEST.POST) !== -1
      ? API_BASE_URL
      : API_BASE_URL + "?" + qs.stringify(queryUrl),
    schemaFetch
  )
    .then((response) => response.json().then((json) => ({ json, response })))
    .then(({ response, json }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      const res = camelizeKeys(json);

      return Object.assign({}, res);
    })
    .then(
      (response) => ({ response }),
      (error) => ({ error: error || "API_SCHEMA ERROR" })
    );
};

export const fetchHistory = async ({ payload, schema }) =>
  await callApi(`/api/getHistoryBikes`, payload, schema);

export const fetchStolenBikes = async ({ payload, schema }) =>
  await callApi(`/api/getStolenBikes`, payload, schema);

export const createUser = async ({ payload, schema }) =>
  await callApi(`/api/createBikeUser`, payload, schema);

export const createBike = async ({ payload, schema }) =>
  await callApi(`/api/fillOutStolenBikes`, payload, schema);

export const createPolice = async ({ payload, schema }) =>
  await callApi(`/api/createPoliceQuery`, payload, schema);

export const resovleBike = async ({ payload, schema }) =>
  await callApi(`/api/resolveStolenBike`, payload, schema);
