/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Image from 'next/image';
import Form from 'next/form'
import heat from '../assets/heat.svg';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';

import { useEffect, useRef, useState } from 'react';
import { getListings } from '../immoAction';
import { user, workspace } from '../actionDefinition';


export default function FormWrapper() {
    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
    const [selectedRegion, setSelectedRegion] =
        useState<google.maps.places.PlaceResult | null>(null);
    const [selectedWorkplace, setSelectedWorkplace] =
        useState<google.maps.places.PlaceResult | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // Convert FormData to a plain object or key-value pairs
        const formObject: Record<string, string> = {};
        formData.forEach((value, key) => {
            formObject[key] = value as string;
        });
        const workplaceLoc = selectedWorkplace?.geometry?.location?.toJSON();

        const data: user = {
            sqm_min: parseInt(formObject.sqmin),
            sqm_max: parseInt(formObject.sqmax),
            obj_type: formObject.category == "apartment" ? workspace.apartment : workspace.house,

            workplace: formObject.workplace,
            workplace_lat: +workplaceLoc?.lat,
            workplace_lon: +workplaceLoc?.lon,

            self_capital: +formObject.capital,
            income: +formObject.income,
            state: "Bayern", //everything else is disgusting (nrw is okay because leonardo might live there)
            payment_rate: +formObject.rate,

            weights: {
                school: +formObject.schoolweight,
                workplace: +formObject.worplaceweight,
                kindergarden: +formObject.kindergarden,
                supermarket: +formObject.supermarketweight,
                publicTransport: +formObject.publicTransportweight,
            },

            max_distances: {
                school: +formObject.school,
                workplace: +formObject.workplaceDis,
                kindergarden: +formObject.kindergarden,
                publicTransport: +formObject.publicTransport,
                supermarket: +formObject.supermarket,
            },

            city: "Garching bei München",
        };

        // const res = await getListings(data);
        // console.log(res)
        // initData(res);
    }
    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY || ''} version="weekly" libraries={['places']}
        >
            <section className="bg-white py-4 antialiase">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <Image src={heat} alt="Heat" className='mx-auto' />
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 sm:text-4xl md:mt-6" >Choosing The Right Place</h2 >
                    <Form onSubmit={handleSubmit} action={""} className="w-full space-y-6 lg:space-y-8">
                        {/* TODO Stepper functionality for form process */}
                        {/* <div className="space-y-6 sm:space-y-8">
                            <ol className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800  md:flex-row md:items-center lg:gap-6">
                                <li className="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                                    <svg className="h-5 w-5 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p className="text-sm font-medium leading-tight text-primary-700 dark:text-primary-500">Search</p>
                                </li>

                                <div className="hidden h-px w-8 shrink-0 bg-gray-200 dark:bg-gray-700 md:block xl:w-16"></div>

                                <li className="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                                    <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p className="text-sm font-medium leading-tight text-gray-500 dark:text-gray-400">Priorities</p>
                                </li>

                                <div className="hidden h-px w-8 shrink-0 bg-gray-200 dark:bg-gray-700 md:block xl:w-16"></div>

                                <li className="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                                    <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p className="text-sm font-medium leading-tight text-gray-500 dark:text-gray-400">Financials</p>
                                </li>

                                <div className="hidden h-px w-8 shrink-0 bg-gray-200 dark:bg-gray-700 md:block xl:w-16"></div>

                                <li className="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                                    <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p className="text-sm font-medium leading-tight text-gray-500 dark:text-gray-400">Listings</p>
                                </li>
                            </ol>
                        </div> */}

                        <div className="space-y-2">
                            <div className="my-4 rounded-lg bg-stone-100 p-4 text-sm sm:text-base" role="alert">
                                <p className="mb-3 font-medium">To find some potential places, let's first collect what is important to you:</p>
                                <ol className="list-outside list-decimal space-y-2 ps-4">
                                    <p>Let's first find out what type of home you are searching for. Then calculate your budget based on the money you have, your income and the monthly payment rate you are willing to pay for the house.
Afterwards decide in what radius you need certain facilities like schools, supermarkets or a workplace that you provide.</p>
                                </ol>
                            </div>

                            <div className='gap-6 grid lg:grid-cols-2'>
                                <div><h3 className="text-2xl font-semibold text-gray-900 mb-2">I am looking for...</h3>
                                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-4">
                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            <div className="sm:col-span-2">
                                                <label htmlFor="cities" className="block mb-2 text-sm font-medium text-gray-900">Choose a dream city</label>
                                                <div className="autocomplete-control">
                                                    <PlaceAutocomplete onPlaceSelect={setSelectedRegion} />
                                                </div>
                                            </div>
                                            <div className='grid grid-rows-auto grid-cols-2 gap-x-4 w-max'>
                                                <label htmlFor="category" className="text-sm mb-2 font-medium text-gray-900">What home type are we favoring?</label>
                                                <label htmlFor="sqmin" className="text-sm mb-2 font-medium text-gray-900">Square meter range</label>
                                                <select id="category" name="category" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option>Select a category</option>
                                                    <option value="house">House</option>
                                                    <option value="apartment">Apartment</option>
                                                </select>

                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={9998} min={0} name="sqmin" id="sqmin" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                    <input placeholder='120' type='number' max={9999} min={1} name="sqmax" id="sqmax" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Preferences</h3>
                                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-4">
                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            <div className="sm:col-span-2">
                                                <label htmlFor="workplace" className="block mb-2 text-sm font-medium text-gray-900">Choose your Workplace</label>
                                                <div className="autocomplete-control">
                                                    <PlaceAutocomplete onPlaceSelect={setSelectedWorkplace} workplace />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div><h3 className="text-2xl font-semibold text-gray-900 mb-2">Financial Situation (€)</h3>
                                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-4">
                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            <div className='grid grid-rows-auto grid-cols-3 gap-x-4 w-max'>
                                                <label htmlFor="capital" className="text-sm mb-2 font-medium text-gray-900">Self Capital</label>
                                                <label htmlFor="income" className="text-sm mb-2 font-medium text-gray-900">Income</label>
                                                <label htmlFor="rate" className="text-sm mb-2 font-medium text-gray-900">Payment Rate</label>

                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={99999998} min={0} name="capital" id="capital" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={99999998} min={0} name="income" id="income" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={99999998} min={0} name="rate" id="rate" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div><h3 className="text-2xl font-semibold text-gray-900 mb-2">Distance to next (km)</h3>
                                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-4">
                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            <div className='grid grid-rows-auto grid-cols-5 gap-x-4 w-max'>
                                                <label htmlFor="school" className="text-sm mb-2 font-medium text-gray-900">School</label>
                                                <label htmlFor="workplaceDis" className="text-sm mb-2 font-medium text-gray-900">Workplace</label>
                                                <label htmlFor="kindergarden" className="text-sm mb-2 font-medium text-gray-900">Kindergarden</label>
                                                <label htmlFor="supermarket" className="text-sm mb-2 font-medium text-gray-900">Supermarket</label>
                                                <label htmlFor="publicTransport" className="text-sm mb-2 font-medium text-gray-900">Public Transport</label>

                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={9998} min={0} name="school" id="school" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={9998} min={0} name="workplaceDis" id="workplaceDis" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={9998} min={0} name="kindergarden" id="kindergarden" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={9998} min={0} name="supermarket" id="supermarket" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={9998} min={0} name="publicTransport" id="publicTransport" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>

                                                <label htmlFor="schoolweight" className="text-sm mb-2 font-medium text-gray-900">and weights</label>
                                                <label htmlFor="workplaceweight" className="text-sm mb-2 font-medium text-gray-900"></label>
                                                <label htmlFor="kindergardenweight" className="text-sm mb-2 font-medium text-gray-900"></label>
                                                <label htmlFor="supermarketweight" className="text-sm mb-2 font-medium text-gray-900"></label>
                                                <label htmlFor="publicTransportweight" className="text-sm mb-2 font-medium text-gray-900"></label>

                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={5} min={0} name="schoolweight" id="schoolweight" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={5} min={0} name="workplaceweight" id="workplaceweight" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={5} min={0} name="kindergardenweight" id="kindergardenweight" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={5} min={0} name="supermarketweight" id="supermarketweight" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>
                                                <div className='flex gap-x-4'>
                                                    <input placeholder='0' type='number' max={5} min={0} name="publicTransportweight" id="publicTransportweight" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                                <button type="submit" className="w-full rounded-lg  border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">See Listings</button>
                            </div>
                        </div>
                    </Form>
                </div >
            </section >
        </APIProvider>
    )
}

interface PlaceAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    workplace?: boolean;
}

const PlaceAutocomplete = ({ onPlaceSelect, workplace }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ['geometry', 'name', 'formatted_address'],
            types: workplace ? ["geocode"] : ['(cities)'],
            componentRestrictions: { country: ['de'] },
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener('place_changed', () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);

    return (
        <div className="autocomplete-container">
            <input ref={inputRef} placeholder={workplace ? "Technical University Munich" : 'Garching bei München'} required name={workplace ? "workplace" : "cities"} id={workplace ? "workplace" : "cities"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
        </div>
    );
};
