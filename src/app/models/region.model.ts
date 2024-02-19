export interface Region {
    confirmed: number;
    countrycode: { iso2: string; iso3: string };
    countryregion: string;
    deaths: number;
    lastupdate: string;
    location: { lat: number; lng: number};
    recovered: number;
    fatal:number
}