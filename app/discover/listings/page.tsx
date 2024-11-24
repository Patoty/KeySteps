import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default async function Listings() {

    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;

    // const mockListings = [];
    // for (let i = 0; i < 100; i++) {
    //     mockListings.push(
    //         {
    //             id: Math.random() * 1000 * Math.random(),
    //             title: "Moderne Gartenwohnung in Garching",
    //             zip: "85748",
    //             buyingPrice: Math.random() * 1200000,
    //             similarListing: {
    //                 buyingPrice: Math.random() * 85000,
    //             },
    //             rooms: Math.round(Math.random() * 5),
    //             squareMeter: Math.round(Math.random() * 140),
    //             pricePerSqm: Math.round(Math.random() * 100000),
    //             metaScore: {
    //                 score: Math.random() * 10,
    //                 model: "05, 2024",
    //             },
    //             address: {
    //                 "ISO_3166-1_alpha-2": "DE",
    //                 "ISO_3166-1_alpha-3": "DEU",
    //                 "ISO_3166-2": ["DE-BY"],
    //                 _category: "place",
    //                 _normalized_city: "Garching bei München",
    //                 _type: "city",
    //                 continent: "Europe",
    //                 country: "Deutschland",
    //                 country_code: "de",
    //                 county: "Landkreis München",
    //                 political_union: "European Union",
    //                 postcode: "85748",
    //                 state: "Bayern",
    //                 state_code: "BY",
    //                 town: "Garching bei München",
    //                 lat: (48.086042 + (Math.random() * 0.115197)),
    //                 lon: (11.451377 + (Math.random() * 0.210578)),
    //                 displayName: "85748 Garching bei München, Deutschland",
    //             },
    //             energyEfficiencyClass: "A",
    //             constructionYear: Math.round(Math.random() * 2024),
    //             apartmentType: "GROUND_FLOOR",
    //             condition: "MINT_CONDITION",
    //             aggregations: {
    //                 similarListing: {
    //                     name: null,
    //                     buyingPrice: 766000,
    //                     pricePerSqm: 8063.1578947368425,
    //                     grossReturn: 2.9013054830287204,
    //                 },
    //             },
    //             images: [
    //                 {
    //                     id: "0f98472c370b890323547bb90049a0bb",
    //                     originalUrl:
    //                         "https://pictures.immobilienscout24.de/listings/f8dd85a4-9d67-4d72-8a8c-08d518b6fdef-1846845157.jpg/ORIG/resize/1024x1024/format/jpg",
    //                     title: "Wohnzimmer",
    //                 },
    //                 {
    //                     id: "5514bf4285d15f2878af7521bd0828a8",
    //                     originalUrl:
    //                         "https://pictures.immobilienscout24.de/listings/3bfc71ce-73df-4ec2-9411-170add43eba1-1846845162.jpg/ORIG/resize/1024x1024/format/jpg",
    //                     title: "IMG_7625",
    //                 },
    //                 {
    //                     id: "6d4cea5f734b55c8ef79957fad1ea7fb",
    //                     originalUrl:
    //                         "https://pictures.immobilienscout24.de/listings/0bb80b39-d844-421b-b5fe-46d4d8964b70-1846845165.jpg/ORIG/resize/1024x1024/format/jpg",
    //                     title: "IMG_7629",
    //                 },
    //                 {
    //                     id: "20941de65152908eb9b6880a7eb5c4b5",
    //                     originalUrl:
    //                         "https://pictures.immobilienscout24.de/listings/d412ee9a-74ef-471b-b5d6-63c8e92f4785-1846845170.jpg/ORIG/resize/1024x1024/format/jpg",
    //                     title: "IMG_7632",
    //                 },
    //                 {
    //                     id: "d4c2f4a87a9fea30eacf580387951467",
    //                     originalUrl:
    //                         "https://pictures.immobilienscout24.de/listings/615e9ff9-36eb-4092-bb1c-3e10518bdabd-1846845175.jpg/ORIG/resize/1024x1024/format/jpg",
    //                     title: "Hausansicht",
    //                 },
    //             ],
    //         },
    //     );
    // }

    return (
        <div>
            <h1>Our Recommended Areas for XYZ</h1>
            <div>
                <APIProvider apiKey={GOOGLE_MAPS_API_KEY || ''} version="weekly">
                    {/* <Map
                        defaultCenter={INITIAL_CENTER}
                        defaultZoom={10}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}>
                        <Marker
                            position={center}
                            draggable
                            onDrag={e =>
                                setCenter({ lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0 })
                            }
                        />
                        <Polygon strokeWeight={1.5} encodedPaths={POLYGONS} />
                        <Polyline
                            strokeWeight={10}
                            strokeColor={'#ff22cc88'}
                            encodedPath={POLYGONS[11]}
                        />
                        <Circle
                            radius={radius}
                            center={center}
                            onRadiusChanged={setRadius}
                            onCenterChanged={changeCenter}
                            strokeColor={'#0c4cb3'}
                            strokeOpacity={1}
                            strokeWeight={3}
                            fillColor={'#3b82f6'}
                            fillOpacity={0.3}
                            editable
                            draggable
                        />
                    </Map>
                    <ControlPanel
                        center={center}
                        radius={radius}
                        onCenterChanged={setCenter}
                        onRadiusChanged={setRadius}
                    /> */}
                </APIProvider>
            </div>
        </div >
    )
}
