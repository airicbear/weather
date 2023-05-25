"use client";

import { Heading, Link, Text, VStack } from "@chakra-ui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

  const currentTime = new Date(data.current_weather.time);

  return (
    <VStack>
      <Heading>Weather</Heading>
      <Text>Latitude: {data.latitude}</Text>
      <Text>Longitude: {data.longitude}</Text>
      <Text>
        Current Temperature:{" "}
        <b>
          {data.current_weather.temperature}
          {data.hourly_units.temperature_2m}
        </b>
      </Text>
      <ResponsiveContainer width="90%" height={400}>
        <LineChart data={data.hourly.temperature_2m}>
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey={(v) => v} stroke="#8884d8" />
          <XAxis
            label={{ value: "Hour", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            type="number"
            domain={["dataMin - 5", "dataMax + 5"]}
            scale="linear"
            label={{
              value: data.hourly_units.temperature_2m,
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <ReferenceLine x={currentTime.getHours()} stroke="red" />
        </LineChart>
      </ResponsiveContainer>
      <Link href="https://open-meteo.com/">Weather data by Open-Meteo.com</Link>
    </VStack>
  );
}
