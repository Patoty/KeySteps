"use client";
import Image from "next/image";
import { argv0 } from "process";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const user_inst: user = {
      max_spmkt_dist: 1000,
      max_pt_dist: 1000,
      //children_count: 0,
      max_school_dist: 10000,
	  max_kindergarden_dist: 0,

      sqm: 50,
      obj_type: workspace.apartment, //or "house"

      workplace: "Boltzmannstraße 3 85748 Garching bei München",
	  max_workplace_dist: 5000,

      self_capital: 50000,
      income: 5000,
      state: "Bayern", //everything else is disgusting (nrw is okay because leonardo might live there)
      payment_rate: 2000,
    };

	const school_weight = 5;
	const workplace_weight = 10;
	const kindergarden_weight = 0;
	const supermarket_weight = 7;
	const pt_weight = 0;

	const user_weights: weightOrMetric = {
		school: 5,
		workplace: 10,
		kindergarden: 0,
		supermarket: 7,
		publicTransport: 0,
	}


    const city = "Garching bei München";


	async function my_main_function() {
		const max_val: number = await aggCosts(
			user_inst.self_capital, 
			user_inst.income, 
			user_inst.payment_rate, 
			user_inst.state
		);

		let immoList: listing[] = await getImmoLists(
			user_inst.workplace,
			user_inst.obj_type,
			city,
			user_inst.sqm,
			max_val,
		);

		if (immoList) {
			const workplace_lat = 69;
			const workplace_lon = 69;

			immoList.forEach((element:listing, _index: number) => {
				const lat = workplace_lat - element.address.lat;
				const lon = workplace_lon - element.address.lon;
				const squared_sum = Math.pow(lat, 2) + Math.pow(lon, 2);

				element.workplaceDistance = Math.sqrt(squared_sum);

				const loc = element.locationFactor.microLocation;
				const user_metric: weightOrMetric = {
					workplace: user_inst.max_workplace_dist - element.workplaceDistance,
					school: user_inst.max_school_dist - Math.min.apply(user_inst.max_school_dist, loc.schools.map((val: listing_locationFactor_microLocation_schools,_index:number) => {
						return val.distance;
					})),
					kindergarden: user_inst.max_kindergarden_dist - Math.min.apply(user_inst.max_kindergarden_dist, loc.kindergarten.map((
						val: listing_locationFactor_microLocation_kindergarten, _index: number
					) => {
						return val.distance;
					})),
					supermarket: user_inst.max_spmkt_dist - Math.min.apply(user_inst.max_spmkt_dist, loc.supermarkets.map((
						val: listing_locationFactor_microLocation_supermarkets, _index: number
					) => {
						return val.distance;
					})),
					publicTransport: user_inst.max_pt_dist - Math.min.apply(user_inst.max_pt_dist, loc.publicTransport.map((
						val: listing_locationFactor_microLocation_publicTransport, _index: number
					) => {
						return val.distance;
					})),
				}
				element.customMetric = calculateCustomMetric(user_weights, user_metric); 
			});
			
		}
		else {
			console.log("no data from immo");
			return null;
		}
	}

	my_main_function();

  }, []);

  const aggCosts = async (
    self_capital: number,
    income: number,
    payment_rate: number,
    state: string,
  ) => {
    /*
    The API call didn't work because of CORS errors we didn't get resolved...
    We decided to reverse engineer the BudgetCalculator instead and build an approximation ourselves. See below

    const requestOptions = {
      method: "POST",
      body: {
        calculationMode: "AMORTIZATION",
        equityCash: 50500,
        additionalLoan: 0,
        //desiredTotalTime: 0,
        monthlyRate: 2000,
        federalState: "DE-BW",
        amortisation: 1.5,
        fixedPeriod: 10,
        salary: 5000,
      },
      headers: {
        "content-type": "application/json",
      },
    };

    //let url = "https://api.thinkimmo.com/immo?type=APARTMENTBUY&excludedFields=true&geoSearches=[%7B%22geoSearchQuery%22:%22Garching+bei+M%C3%BCnchen%22,%22geoSearchType%22:%22zipCode%22,%22zipCode%22:%2285748%22,%22region%22:%22Bayern%22%7D]&averageAggregation=buyingPrice%3BpricePerSqm%3BsquareMeter%3BconstructionYear%3BrentPrice%3BrentPricePerSqm%3BrunningTime&termsAggregation=platforms.name.keyword,60";
    let mod_url =
      "https://www.interhyp.de/customer-generation/budget/calculateMaxBuyingPower";

    const response = await fetch(mod_url, requestOptions);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }

    // Parse the JSON response
    const data = await response.json();
    const res = data.results;

    // Log the fetched data to the browser's console
    console.log("Fetched data from the server:", data);
    //console.log("Fetched data from the server:", res);
    return res;
     */
    //Our own implementation for the budget calculator
    const interest = 3.61;
    const amort = 1.5;
    //credit * (interest +  amort) = annuity = 12* monthly payment = 12* payment rate
    //=> credit budget = annuity / (interest + amort) = (payment_rate * 12) / (interest + amort)
    const credit_budget = (payment_rate * 12) / (interest + amort);

    const kaufnebenkosten = (3.5 + 2 + 3.75) / 100; // 3.5 % Grunderwerbssteuer , 2% notary's office + 3.75 % for the broker/ Makler
    //We chose constant 3.5% because we mainly work with bavaria. For proper implementation we would use the API, which handles different property tax already.
    //We prepared user input for the federal state already to give it to the API for when we make the API work.

    const budget =
      credit_budget + self_capital - credit_budget * kaufnebenkosten; //simple solution for now that gives a somewhat reasonable value. For future we would implement the API call

    return budget;
  };

  	const calculateCustomMetric = (user_weights: weightOrMetric, user_metric: weightOrMetric) => {
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

		return weight ? metric/weight : metric;
	}
  const getImmoLists = async (
    search_around: string,
    obj_type: workspace,
    city: string,
    sqm: number,
    max_val: number,
  ) => {
    let type = "";
    if (obj_type == workspace.apartment) {
      type = "APARTMENTBUY";
    } else if (obj_type == workspace.house) {
      type = "HOUSEBUY";
    } else {
      type = "APARTMENTBUY";
    }

    const sqm_max = sqm + 20;
    const sqm_min = sqm < 20 ? 0 : sqm - 20;
    const sqm_max_price = max_val / sqm_max;

    const geoSearch = `[{"geoSearchType":"city","region":"Bayern","geoSearchQuery":"${city}"}]`;

    try {
      const requestOptions = {
        method: "GET",
      };

      const results = 1000;

      let mod_url = `https://api.thinkimmo.com/immo?type=${type}&excludedFields=true&size=${results}&sqmFrom=${sqm_min}&sqmTo=${sqm_max}&pricePerSqmTo=${sqm_max_price}&excludedFields=true&geoSearches=${geoSearch}`;

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

  enum workspace {
    house,
    apartment,
  }

  type user = {
    max_spmkt_dist: number,
    max_pt_dist: number,
    //children_count: 0,
    max_school_dist: number,
	max_kindergarden_dist: number,

    sqm: number,
    obj_type: workspace, //or "house"

    workplace: string,
	max_workplace_dist: number,

    self_capital: number,
    income: number,
    state: string, //everything else is disgusting (nrw is okay because leonardo might live there)
    payment_rate: number,
  };

  type weightOrMetric = {
	  workplace: number,
	  school: number,
	  publicTransport: number,
	  kindergarden: number, 
	  supermarket: number,
  }

  type listing_address = {
    "ISO_3166-1_alpha-2": string;
    "ISO_3166-1_alpha-3": string;
    _category: string;
    _type: string;
    city: string;
    continent: string;
    country: string;
    country_code: string;
    political_union: string;
    postcode: string;
    state: string;
    state_code: string;
    suburb: string;
    lat: number;
    lon: number;
    displayName: string;
  };

  type listing_locationFactor_populationTrend = {
    from: number;
    to: number;
  };

  type listing_locationFactor_microLocation_schools_address = {
    country: string;
    city: string;
    housenumber: string;
    street: string;
    postcode: string;
  };

  type listing_locationFactor_microLocation_schools = {
    address: listing_locationFactor_microLocation_schools_address;
    distance: number;
    name: string;
  };

  type listing_locationFactor_microLocation_supermarkets_address = {
    city: string;
    housenumber: string;
    street: string;
    postcode: string;
  };

  type listing_locationFactor_microLocation_supermarkets = {
    address: listing_locationFactor_microLocation_supermarkets_address;
    distance: number;
    name: string;
    openingHours: string;
  };

  type listing_locationFactor_microLocation_kindergarten_address = {
    country: string;
    city: string;
    housenumber: string;
    street: string;
    postcode: string;
    suburb: string;
  };

  type listing_locationFactor_microLocation_kindergarten_contact = {
    website: string;
    phone: string;
    fax: string;
  };

  type listing_locationFactor_microLocation_kindergarten = {
    address: listing_locationFactor_microLocation_supermarkets_address;
    distance: number;
    maxAge: string;
    contact: listing_locationFactor_microLocation_kindergarten_contact;
    minAge: string;
    name: string;
    openingHours: string;
  };

  type listing_locationFactor_microLocation_publicTransport = {
    distance: number;
    name: string;
    operator: string;
    transportTypes: string[];
    network: string;
  };

  type listing_locationFactor_microLocation = {
    schools: listing_locationFactor_microLocation_schools[];
    supermarkets: listing_locationFactor_microLocation_supermarkets[];
    kindergarten: listing_locationFactor_microLocation_kindergarten[];
    publicTransport: listing_locationFactor_microLocation_publicTransport[];
  };

  type listing_locationFactor_unemploymentRateOrPopulationMeta_historicValues =
    {
      [key: string]: number;
    };

  type listing_locationFactor_unemploymentRateOrPopulationMeta = {
    historicValues: listing_locationFactor_unemploymentRateOrPopulationMeta_historicValues;
  };

  type listing_locationFactor = {
    population: number;
    populationTrend: listing_locationFactor_populationTrend;
    hasUniversity: boolean;
    unemploymentRate: number;
    numberOfStudents: number;
    score: number;
    unemploymentRateScore: number;
    universityScore: number;
    populationScore: number;
    populationTrendScore: number;
    microLocation: listing_locationFactor_microLocation;
    unemploymentRateMeta: listing_locationFactor_unemploymentRateOrPopulationMeta;
    populationMeta: listing_locationFactor_unemploymentRateOrPopulationMeta;
  };

  type listing_location = {
    lat: number;
    lon: number;
  };

  type listing_platforms = {
    name: string;
    id: string;
    url: string;
    creationDate: string;
    publishDate: string;
    active: boolean;
  };

  type listing_aggregations_districtOrLocationOrSimilarListing = {
    name: string;
    buyingPrice: number;
    pricePerSqm: number;
    grossReturn: number;
  };

  type listing_aggregations = {
    district: listing_aggregations_districtOrLocationOrSimilarListing;
    location: listing_aggregations_districtOrLocationOrSimilarListing;
    similarListing: listing_aggregations_districtOrLocationOrSimilarListing;
  };

  type listing_oAddress_immosocial24 = {
    street: null; //TODO: find out type
    postcode: string;
    location: string;
  };

  type listing_oAddress = {
    immosocial24: listing_oAddress_immosocial24;
  };

  type listing_originalAddress = {
    street: string;
    postcode: string;
    location: string;
  };

  type listing_images = {
    id: string;
    originalUrl: string;
    title: string;
  };

  type listing_buyingPriceHistory = {
    buyingPrice: number,
    platformName: string,
    creationDate: string,
  };

  type listing = {
    id: string,
    title: string,
    realtorCompany: string,
    zip: string,
    buyingPrice: number,
    squareMeter: number;
    comission: string; //TODO: find out type
    platforms: listing_platforms[];
    rentPricePerSqm: number;
    pricePerSqm: number;
    rentPrice: number;
    rentPriceCurrent: number;
    rentPriceCurrentPerSqm: number;
    address: listing_address;
    energyCertificate: boolean;
    region: string;
    foreClosure: boolean;
    locationFactor: listing_locationFactor;
    grossReturn: number;
    grossReturnCurrent?: number; 
    constructionYear?: number,
    condition?: string,
    lastRefurbishment?: string,
    numberOfFloors?: number,
    cellar?: boolean,
    numberOfParkingSpaces?: number,
    heatingType?: string,
    active?: boolean,
    rented?: boolean,
    location: listing_location,
    publishDate?: string,
    buildingType?: string,
    plotArea?: number,
    rooms?: number,
    privateOffer?: boolean,
    aggregations?: listing_aggregations,
    livingUnits?: number, 
    commercialUnits?: number,
    leasehold?: boolean,
    priceInMarket: number,
    constructionPhase?: string,
    oAddress?: listing_oAddress,
    originalAddress?: listing_originalAddress,
    images?: listing_images[],
    buyingPriceHistory?: listing_buyingPriceHistory[],
    priceReduced?: boolean,
    priceIncreased?: boolean,
    runningTime?: number,
    lastUpdatedAt?: string,
    favorite?: number,
    favoriteDate?: string,
    cashFlow?: number,
    ownCapitalReturn?: number,
    cashFlowPerLivingUnit: number,
	workplaceDistance?: number,
	customMetric?: number,
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:const(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
