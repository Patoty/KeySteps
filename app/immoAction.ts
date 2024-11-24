/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { getAggCost } from "./aggAction";

import {
  listing,
  listing_locationFactor_microLocation_kindergarten,
  listing_locationFactor_microLocation_publicTransport,
  listing_locationFactor_microLocation_schools,
  listing_locationFactor_microLocation_supermarkets,
  user,
  weightOrMetric,
  workspace,
} from "./actionDefinition";

// DUMMY DATA
// const user_inst: user = {
//   sqm_min: 60,
//   sqm_max: 40,
//   obj_type: workspace.apartment, //or "house"

//   workplace: "Boltzmannstraße 3 85748 Garching bei München",
//   workplace_lat: 69,
//   workplace_lon: 69,

//   self_capital: 50000,
//   income: 5000,
//   state: "Bayern", //everything else is disgusting (nrw is okay because leonardo might live there)
//   payment_rate: 2000,

//   weights: {
//     school: 5,
//     workplace: 10,
//     kindergarden: 0,
//     supermarket: 7,
//     publicTransport: 0,
//   },

//   max_distances: {
//     school: 10000,
//     workplace: 5000,
//     kindergarden: 0,
//     publicTransport: 1000,
//     supermarket: 1000,
//   },

//   city: "Garching bei München",
// };

export async function getListings(user_inst: user) {
  const max_val: number = await getAggCost(
    user_inst.self_capital,
    user_inst.income,
    user_inst.payment_rate
  );

  // eslint-disable-next-line prefer-const
  let immoList: listing[] = await getImmoLists(
    user_inst.workplace,
    user_inst.obj_type,
    user_inst.city,
    user_inst.sqm_min,
    user_inst.sqm_max,
    max_val
  );

  if (immoList) {
    immoList.forEach((element: listing, _index: number) => {
      const lat = user_inst.workplace_lat - element.address.lat;
      const lon = user_inst.workplace_lon - element.address.lon;
      const squared_sum = Math.pow(lat, 2) + Math.pow(lon, 2);

      element.workplaceDistance = Math.sqrt(squared_sum);

      const loc = element.locationFactor.microLocation;
      const user_metric: weightOrMetric = {
        workplace:
          user_inst.max_distances.workplace - element.workplaceDistance,
        school:
          user_inst.max_distances.school -
          Math.min.apply(
            user_inst.max_distances.school,
            loc.schools.map(
              (
                val: listing_locationFactor_microLocation_schools,
                _index: number
              ) => {
                return val.distance;
              }
            )
          ),
        kindergarden:
          user_inst.max_distances.kindergarden -
          Math.min.apply(
            user_inst.max_distances.kindergarden,
            loc.kindergarten.map(
              (
                val: listing_locationFactor_microLocation_kindergarten,
                _index: number
              ) => {
                return val.distance;
              }
            )
          ),
        supermarket:
          user_inst.max_distances.supermarket -
          Math.min.apply(
            user_inst.max_distances.supermarket,
            loc.supermarkets.map(
              (
                val: listing_locationFactor_microLocation_supermarkets,
                _index: number
              ) => {
                return val.distance;
              }
            )
          ),
        publicTransport:
          user_inst.max_distances.publicTransport -
          Math.min.apply(
            user_inst.max_distances.publicTransport,
            loc.publicTransport.map(
              (
                val: listing_locationFactor_microLocation_publicTransport,
                _index: number
              ) => {
                return val.distance;
              }
            )
          ),
      };
      element.customMetric = calculateCustomMetric(
        user_inst.weights,
        user_metric
      );
    });
  } else {
    console.log("no data from immo");
    return null;
  }
}

const calculateCustomMetric = (
  user_weights: weightOrMetric,
  user_metric: weightOrMetric
) => {
  let weight = 0;
  let metric = 0;

  metric += user_weights.workplace * user_metric.workplace;
  metric += user_weights.supermarket * user_metric.supermarket;
  metric += user_weights.kindergarden * user_metric.kindergarden;
  metric += user_weights.school * user_metric.school;
  metric += user_weights.publicTransport * user_metric.publicTransport;

  weight += user_weights.workplace;
  weight += user_weights.supermarket;
  weight += user_weights.kindergarden;
  weight += user_weights.school;
  weight += user_weights.publicTransport;

  return weight ? metric / weight : metric;
};

const getImmoLists = async (
  search_around: string,
  obj_type: workspace,
  city: string,
  sqm_min: number,
  sqm_max: number,
  max_val: number
) => {
  const type = user.obj_type == workspace.house ? "HOUSEBUY" : "APARTMENTBUY";

  const sqm_max_price = max_val / user.sqm_max;

  const geoSearch = `[{"geoSearchType":"city","region":"${user.state}","geoSearchQuery":"${user.city}"}]`;

  try {
    const requestOptions = {
      method: "GET",
    };

    const results = 1000;

    const mod_url = `https://api.thinkimmo.com/immo?type=${type}&excludedFields=true&size=${results}&sqmFrom=${sqm_min}&sqmTo=${sqm_max}&pricePerSqmTo=${sqm_max_price}&excludedFields=true&geoSearches=${geoSearch}`;

    const response = await fetch(mod_url, requestOptions);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }

    // Parse the JSON response
    const data = await response.json();
    const res = data.results;

    // Log the fetched data to the browser's console
    console.log("Fetched data from the server:", data);
    console.log("Fetched res from the server:", res);
    console.log("Fetched flat res from the server:", res.flat());
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
