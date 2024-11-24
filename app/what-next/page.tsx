"use client";
import Image from "next/image";
import imgFinance from '../../app/assets/stock-finances.jpg'
import imgInterhyp from '../../app/assets/stock-beratung.jpg'
import imgSeller from '../../app/assets/stock-hausbesuch.jpg'
import imgNotary from '../../app/assets/stock-notary.webp'

export default function Home() {
  return (
    <div className="bg-white">
        <ol className="relative border-l-4 border-primary">
            <li className="mb-10 ms-4">
                <div className="absolute w-4 h-4 bg-primary rounded-full mt-0 -start-2.5 border border-primary dark:border-primary dark:bg-gray-700"></div>
                <time className="mb-1 text-xl leading-none text-primary">1. Prepare Your Financials</time>
                <section className="bg-white dark:bg-gray-900">
                    <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                        <Image src={imgFinance} width="520" hight="408" alt="" className="rounded-xl"></Image>
                        <div className="mt-4 md:mt-0">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">1. Prepare Your Financials</h2>
                            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                                Good financial documents will you help with getting a loan at the bank and impress potential sellers.
                                We recomment you prepare:
                                <ul className="list-disc list-inside">
                                  <li>A SCHUFA report (Schufa Auskunft)</li>
                                  <li>A proof of salary (Gehaltsnachweis)</li>
                                  <li>Calculation of your total household income:
                                    <br/>Salaries, 13th Salaries, Bonuses, Other incomes</li>
                                  <li>Calculation of your total equities:
                                    <br/>Cash, Stocks, Fonds, Other Houses, Gold, ...</li>
                                </ul>
                            </p>
                            <a href="https://www.immobilienscout24.de/wissen/bauen/banktermin-vereinbaren.html" className="inline-flex items-center text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                                Requirements for further steps
                            </a>
                        </div>
                    </div>
                </section>
            </li>

            <li className="mb-10 ms-4">
                <div className="absolute w-4 h-4 bg-primary rounded-full mt-0 -start-2.5 border border-primary dark:border-primary dark:bg-gray-700"></div>
                <time className="mb-1 text-xl leading-none text-primary">2. Contact Bank / Interhyp</time>
                <section className="bg-white dark:bg-gray-900">
                    <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                        <div className="mt-4 md:mt-0">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">2. Contact Bank / Interhyp</h2>
                            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                                <ul className="list-disc list-inside">
                                  <li>Make an Appointment with your local bank or interhyp branch</li>
                                  <li>A good first impression is important, make sure to come prepared and well dressed.</li>
                                  <li>Bring your financial documents from step 1 to talk about possibilities and difficulties</li>
                                  <li>Make sure to talk about future plans that influence your financial situation (job perspectives, children, retirement plans...)</li>
                                  <li>Find out what you can look for and go for it</li>
                                </ul>
                            </p>
                            <a href="https://www.interhyp.de/standorte/" className="inline-flex items-center text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                                Contact the Interhyp
                            </a>
                        </div>
                        <Image src={imgInterhyp} width="520" hight="408" alt="" className="rounded-xl"></Image>
                    </div>
                </section>
            </li>

            <li className="ms-4">
                <div className="absolute w-4 h-4 bg-primary rounded-full mt-0 -start-2.5 border border-primary dark:border-primary dark:bg-gray-700"></div>
                <time className="mb-1 text-xl leading-none text-primary">3. Find Your Home</time>
                <section className="bg-white dark:bg-gray-900">
                    <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                        <Image src={imgSeller} width="520" hight="408" alt="" className="rounded-xl"></Image>
                        <div className="mt-4 md:mt-0">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">3. Find Your Home</h2>
                            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                                <ul className="list-disc list-inside">
                                  <li>Write the sellers of potential houses in the areas you found to be fitting before</li>
                                  <li>Make sure to visit in person before you buy</li>
                                  <li>Just like with the bank, a good first impression is key.</li>
                                  <li>Agree on a price with the seller</li>
                                </ul>
                            </p>
                            <a href="https://www.drklein.de/haussuche.html" className="inline-flex items-center text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                                Tipps & Tricks
                            </a>
                        </div>
                    </div>
                </section>
            </li>

            <li className="mb-10 ms-4">
                <div className="absolute w-4 h-4 bg-primary rounded-full mt-0 -start-2.5 border border-primary dark:border-primary dark:bg-gray-700"></div>
                <time className="mb-1 text-xl leading-none text-primary">4. Close The Deal!</time>
                <section className="bg-white dark:bg-gray-900">
                    <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                        <div className="mt-4 md:mt-0">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">4. Close The Deal!</h2>
                            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                                <ul className="list-disc list-inside">
                                  <li>Make an appointment with the bank to sign the loan contract</li>
                                  <li>Make an appointment at a notary's office to sign the buying contract</li>
                                  <li>Make sure to have the notary's office appointment within the notice period of the bank (usually 2 weeks)</li>
                                  <li>After signing both contracts you have successfully bought your new home.</li>
                                </ul>
                            </p>
                            <a href="https://www.interhyp.de/ratgeber/der-baufinanzierungsprozess/" className="inline-flex items-center text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                                More about the process
                            </a>
                        </div>
                        <Image src={imgNotary} width="520" hight="408" alt="" className="rounded-xl"></Image>
                    </div>
                </section>
            </li>
        </ol>
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-primary">Numbers In Germany</h2>
                <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">4-12 months</dt>
                        <dd className="font-light text-gray-500 dark:text-gray-400">in average, to buy a home</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">866.000</dt>
                        <dd className="font-light text-gray-500 dark:text-gray-400">real estate transactions per year</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">41.8%</dt>
                        <dd className="font-light text-gray-500 dark:text-gray-400">of Germans own their own home</dd>
                    </div>
                </dl>
            </div>
        </section>
    </div>
  );
}
