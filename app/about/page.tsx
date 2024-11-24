"use client";
import Image from "next/image";
import imgFinance from '../../app/assets/stock-finances.jpg'
import imgInterhyp from '../../app/assets/stock-beratung.jpg'
import imgSeller from '../../app/assets/stock-hausbesuch.jpg'
import imgNotary from '../../app/assets/stock-notary.webp'

export default function Home() {
  return (
    <div className="bg-white">
        <div className="w-vw -mt-36 h-[45rem] bg-[url('../app/assets/sunset-city-gradient.jpg')] bg-cover bg-no-repeat grid place-items-center">
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-white to-white p-2">
            About
          </h2>
        </div>
      </div>

        <ul className="text-center list-disc list-inside">
          <li>A hackaTUM project</li>
          <li>by Edwin, Leonardo, Patrick & Timon</li>
          <li>created by the wonderful team you find on the start page</li>
          <li>thank you so much to interhyp!</li>
        </ul>
    </div>
  );
}
