"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		const pablo: user = {
			max_spmkt_dist: 10,
			max_pt_dist: 10,
			//children_count: 0,
			max_school_dist: 0,

			sqm: 50,
			obj_type: workspace.apartment, //or "house"

			workplace: "Boltzmannstraße 3 85748 Garching bei München",

			self_capital: 50000,
			income: 5000,
			state: "Bayern", //everything else is disgusting (nrw is okay because leonardo might live there)
			payment_rate: 2000,

		}

		//const max_val: number = aggCosts(pablo.self_capital, pablo.income, pablo.payment_rate, pablo.state);
		const max_val = 2000000;

		//let immoList = getImmoLists(pablo.workplace, pablo.obj_type, "Garching bei München", pablo.sqm, max_val);
		//if (immoList == null) {
		//	console.log("no data from immo");
		//}
		//getImmoLists(pablo.workplace, pablo.obj_type, "Garching bei München", pablo.sqm, max_val);
		getImmoLists(pablo.workplace, pablo.obj_type, "München", pablo.sqm, max_val);
	}, []);

	const aggCosts = async (self_capital: number, income: number, payment_rate: number, state: string) => {

	}

	const getImmoLists = async (search_around: string, obj_type: workspace, city: string, sqm: number, max_val: number) => {

		let type = "";
		if (obj_type == workspace.apartment) {
			type = "APARTMENTBUY";
		}
		else if (obj_type == workspace.house) {
			type = "HOUSEBUY";
		}
		else {
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
		
	}

	enum workspace {
		house,
		apartment
	}

	type user = {
		max_spmkt_dist: number,
		max_pt_dist: number,
		//children_count: 0,
		max_school_dist: number,

		sqm: number,
		obj_type: workspace, //or "house"

		workplace: string,

		self_capital: number,
		income: number,
		state: string, //everything else is disgusting (nrw is okay because leonardo might live there)
		payment_rate: number,

	}

	type listing_address = {
		'ISO_3166-1_alpha-2': string,
		'ISO_3166-1_alpha-3': string,
		'_category': string,
		'_type': string,
		city: string,
		continent: string,
		country: string,
		country_code: string,
		political_union: string,
		postcode: string,
		state: string,
		state_code: string,
		suburb: string,
		lat: number,
		lon: number,
		displayName: string,
	}

	type listing_locationFactor_populationTrend = {
		from: number,
		to: number,
	}

	type listing_locationFactor_microLocation_schools_address = {
		country: string,
		city: string,
		housenumber: string,
		street: string,
		postcode: string,
	}

	type listing_locationFactor_microLocation_schools = {
		address: listing_locationFactor_microLocation_schools_address,
		distance: number,
		name: string,
	}

	type listing_locationFactor_microLocation_supermarkets_address = {
		city: string,
		housenumber: string,
		street: string,
		postcode: string,
	}

	type listing_locationFactor_microLocation_supermarkets = {
		address: listing_locationFactor_microLocation_supermarkets_address,
		distance: number,
		name: string,
		openingHours: string,
	}

	type listing_locationFactor_microLocation_kindergarten_address = {
		country: string,
		city: string,
		housenumber: string,
		street: string,
		postcode: string,
		suburb: string,
	}

	type listing_locationFactor_microLocation_kindergarten_contact = {
		website: string,
		phone: string,
		fax: string,
	}

	type listing_locationFactor_microLocation_kindergarten = {
		address: listing_locationFactor_microLocation_supermarkets_address,
		distance: number,
		maxAge: string,
		contact: listing_locationFactor_microLocation_kindergarten_contact,
		minAge: string,
		name: string,
		openingHours: string,
	}

	type listing_locationFactor_microLocation_publicTransport = {
		distance: number,
		name: string,
		operator: string,
		transportTypes: string[],
		network: string,
	}

	type listing_locationFactor_microLocation = {
		schools: listing_locationFactor_microLocation_schools[],
		supermarkets: listing_locationFactor_microLocation_supermarkets[],
		kindergarten: listing_locationFactor_microLocation_kindergarten[],
		publicTransport: listing_locationFactor_microLocation_publicTransport[],
	}

	type listing_locationFactor_unemploymentRateOrPopulationMeta_historicValues = {
		[key: string]: number,
	}

	type listing_locationFactor_unemploymentRateOrPopulationMeta = {
		historicValues: listing_locationFactor_unemploymentRateOrPopulationMeta_historicValues,
	}

	type listing_locationFactor = {
		population: number,
		populationTrend: listing_locationFactor_populationTrend,
		hasUniversity: boolean,
		unemploymentRate: number,
		numberOfStudents: number,
		score: number,
		unemploymentRateScore: number,
		universityScore: number,
		populationScore: number,
		populationTrendScore: number,
		microLocation: listing_locationFactor_microLocation,
		unemploymentRateMeta: listing_locationFactor_unemploymentRateOrPopulationMeta,
		populationMeta: listing_locationFactor_unemploymentRateOrPopulationMeta,
	}

	type listing_location = {
		lat: number,
		lon: number,
	}

	type listing_platforms = {
			name: string,
			id: string,
			url: string,
			creationDate: string,
			publishDate: string,
			active: boolean,
	}

	type listing_aggregations_districtOrLocationOrSimilarListing = {
		name: string,
		buyingPrice: number,
		pricePerSqm: number,
		grossReturn: number,
	}

	type listing_aggregations = {
		district: listing_aggregations_districtOrLocationOrSimilarListing,
		location: listing_aggregations_districtOrLocationOrSimilarListing,
		similarListing: listing_aggregations_districtOrLocationOrSimilarListing,
	}

	type listing_oAddress_immosocial24 = {
		street: null //TODO: find out type
		postcode: string,
		location: string,
	}

	type listing_oAddress = {
		immosocial24: listing_oAddress_immosocial24,
	}

	type listing_originalAddress = {
		street: string,
		postcode: string,
		location: string,
	}

	type listing_images = {
		id: string,
		originalUrl: string,
		title: string
	}

	type listing_buyingPriceHistory = {
		buyingPrice: number,
		platformName: string,
		creationDate: string,
	}

	type listing = {
		id: string,
		title: string,
		realtorCompany: string,
		zip: string,
		buyingPrice: number,
		squareMeter: number,
		comission: string, //TODO: find out type
		platforms: listing_platforms[],
		rentPricePerSqm: number,
		pricePerSqm: number,
		rentPrice: number,
		rentPriceCurrent: number,
		rentPriceCurrentPerSqm: number,
		address: listing_address,
		energyCertificate: boolean,
		region: string,
		foreClosure: boolean,
		locationFactor: listing_locationFactor,
		grossReturn: number,
		grossReturnCurrent: null, //TODO: find out type
		constructionYear: number,
		condition: string,
		lastRefurbishment: null, //TODO: find out type
		numberOfFloors: number,
		cellar: boolean,
		numberOfParkingSpaces: number,
		heatingType: string,
		active: boolean,
		rented: boolean,
		location: listing_location,
		publishDate: string,
		buildingType: string,
		plotArea: number,
		rooms: number,
		privateOffer: boolean,
		aggregations: listing_aggregations,
		livingUnits: null, //TODO: find out type
		commercialUnits: number,
		leasehold: boolean,
		priceInMarket: number,
		constructionPhase: string,
		oAddress: listing_oAddress,
		originalAddress: listing_originalAddress,
		images: listing_images[],
		buyingPriceHistory: listing_buyingPriceHistory[],
		priceReduced: boolean,
		priceIncreased: boolean,
		runningTime: number,
		lastUpdatedAt: string,
		favorite: number,
		favoriteDate: null, //TODO: find out type
		cashFlow: number,
		ownCapitalReturn: null, //TODO: find out type
		cashFlowPerLivingUnit: number,
	}

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
