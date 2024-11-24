"use client"
import React, { useState } from 'react'
import FormWrapper from '../components/FormWrapper'
import Map from '../components/Map'

export default function Discover() {
  const [data, setData] = useState(null);
  return (
    <div>
      <div className="w-full h-96">
        {data ? <Map /> : <FormWrapper initData={setData} />
        }
      </div>
    </div>
  )
}