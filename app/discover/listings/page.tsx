import { getListings } from '@/app/immoAction'
import React from 'react'

export default function Listings(data: any) {
    const res = getListings(new FormData());
    console.log(res);
    return (
        <div>
            <h1>Our Recommended Areas for PLACEHOLDER</h1>
        </div>
    )
}
