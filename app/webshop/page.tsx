import type {Metadata} from "next";
import {GuideCatalog} from "../guide-catalog";
export const metadata:Metadata={title:"E-knjige i edukativni vodiči s receptima",description:"Digitalni vodiči Sandre Drašković o biljnoj prehrani, smoothie-jima, sokovima, sirovim juhama i blagdanskim receptima.",alternates:{canonical:"/webshop"}};
export default function Page(){return <GuideCatalog/>;}
