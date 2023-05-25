"use client";

import { Heading, Link, Text, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "./fetcher";
import WeatherResponse from "./model";

export default function Home() {
  const { data, error } = useSWR<WeatherResponse>(
    "https://api.open-meteo.com/v1/forecast?latitude=39.9526&longitude=-75.1652&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=1&timezone=America%2FNew_York",
    fetcher
  );

  if (error) return <Text>Failed to load</Text>;
  if (!data) return <Text>Loading...</Text>;

  console.log(data);

  return (
    <VStack>
      <Heading>Weather</Heading>
      <Text>Latitude: {data.latitude}</Text>
      <Text>Longitude: {data.longitude}</Text>
      <Text>
        Current Temperature: {data.current_weather.temperature}
        {data.hourly_units.temperature_2m}
      </Text>
      <Link href="https://open-meteo.com/">Weather data by Open-Meteo.com</Link>
    </VStack>
  );
}
