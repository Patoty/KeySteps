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

		let immoList = getImmoLists(pablo.workplace, pablo.obj_type, "Garching bei München", pablo.sqm);
		if (immoList == null) {

		}
	}, []);

	const aggCosts = async (self_capital: number, income: number, payment_rate: number, state: string) => {

	}

	const getImmoLists = async (search_around: string, obj_type: workspace, city: string, sqm: number) => {

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


		try {

			const body_raw = JSON.stringify({
				"filter": {
					"type": type,
					"excludedFields": "true",
					"geoSearches": [{
						//"geoSearchType": "zipCode",
						//"zipCode": "85748",
						"geoSearchType": "city",
						"geoSearchQuery": city,
						"region": "Bayern",
					}],
					"averageAggregation": "buyingPrice",
					"sqmFrom": sqm_min,
					"sqmTo": sqm_max,


				}

			});

			const requestOptions = {
				method: "GET",
				body: body_raw,
			};
			
			let url = "https://api.thinkimmo.com/immo?type=APARTMENTBUY&excludedFields=true&geoSearches=[%7B%22geoSearchQuery%22:%22Garching+bei+M%C3%BCnchen%22,%22geoSearchType%22:%22zipCode%22,%22zipCode%22:%2285748%22,%22region%22:%22Bayern%22%7D]&averageAggregation=buyingPrice%3BpricePerSqm%3BsquareMeter%3BconstructionYear%3BrentPrice%3BrentPricePerSqm%3BrunningTime&termsAggregation=platforms.name.keyword,60";
			let mod_url = "https://api.thinkimmo.com/immo";

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
