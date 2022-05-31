import { COUNTRY_ID, COUNTRY_NAME, TOWN_AREAS } from "./enums";

export type DbPlayer = {
  id: string;
  name: string;
  color: string;
  actions: [number, number][];
  position: [number, number];
  destination: [number, number];
  active: [number, number];
  km?: number;
};

export type DbTime = {
  id: string;
  timestamp: number;
  time: number;
  day: number;
  year: number;
  season: number;
};

export type DbTown = {
  id: string;
  location: [number, number];
  area: TOWN_AREAS;
  country: COUNTRY_ID;
  name: COUNTRY_NAME;
  population: number;
  is_tower: boolean;
};

export type DbTraveler = {
  id: string;
  origin: [number, number];
  destination: [number, number];
  position: [number, number];
  active: [number, number];
  actions: [number, number][];
  name: string;
  sex: SEX;
};

export enum SEX {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export type KeysOf<T> = { [K in keyof T]: T[K] };
