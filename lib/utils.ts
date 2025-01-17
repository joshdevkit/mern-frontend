import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_URL } from "@/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default http;
