"use client"
import Image from 'next/image';
import heat from '../assets/heat.svg';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';

import { useEffect, useRef, useState } from 'react';


export default function FormWrapper() {
    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
    const [selectedRegion, setSelectedRegion] =
        useState<google.maps.places.PlaceResult | null>(null);
    const [selectedWorkplace, setSelectedWorkplace] =
        useState<google.maps.places.PlaceResult | null>(null);
    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY || ''} version="weekly" libraries={['places']}
        >
            <section className="bg-white py-4 antialiase">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <Image src={heat} alt="Heat" className='mx-auto' />
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 sm:text-4xl md:mt-6" >Choosing The Right Place</h2 >
                    <form action="#" className="w-full space-y-6 lg:space-y-8">
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
                                <p className="mb-3 font-medium">What you need to know so that the process of sending the product for service goes smoothly:</p>
                                <ol className="list-outside list-decimal space-y-2 ps-4">
                                    <li>You can send the products sold by eMAG for service by completing the product repair form. To service the products sold by eMAG Marketplace partners, follow the steps shown in the pages dedicated to them.</li>
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
                                                <select id="category" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500">
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

                                <div><h3 className="text-2xl font-semibold text-gray-900 mb-2">Preferences</h3>
                                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-4">
                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            <div className="sm:col-span-2">
                                                <label htmlFor="workplace" className="block mb-2 text-sm font-medium text-gray-900">Choose your Workplace</label>
                                                <div className="autocomplete-control">
                                                    <PlaceAutocomplete onPlaceSelect={setSelectedWorkplace} workplace />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">What home type are we favoring?</label>
                                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option>Select a category</option>
                                                    <option value="house">House</option>
                                                    <option value="apartment">Apartment</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                                <button type="button" className="w-full rounded-lg  border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </form>
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
