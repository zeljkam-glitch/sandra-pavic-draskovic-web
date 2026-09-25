"use client";

import { useState } from "react";
const days = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"];
const meals = ["Doručak", "Ručak", "Večera"];
export function MealPlanner() {
  const [plan, setPlan] = useState<Record<string, string>>({});
  const [shopping, setShopping] = useState("");
  const [prepared, setPrepared] = useState("");
  function save() {
    const content = "MOJ TJEDNI PLAN\n\n" + days.map(day => day + "\n" + meals.map(meal => `${meal}: ${plan[`${day}-${meal}`] || "Nije upisano"}`).join("\n")).join("\n\n") + "\n\nPOPIS ZA KUPNJU\n" + shopping;
    setPrepared(content);

  }
  return <div className="meal-planner"><h2>Moj tjedni plan</h2><p>Upiši obroke koje želiš pripremiti. Ne moraš popuniti sve dane.</p><div className="planner-days">{days.map(day => <fieldset key={day}><legend>{day}</legend><div>{meals.map(meal => <label key={meal}>{meal}<input maxLength={200} value={plan[`${day}-${meal}`] || ""} placeholder="Tvoja ideja za obrok" onChange={event => setPlan({ ...plan, [`${day}-${meal}`]: event.target.value })}/></label>)}</div></fieldset>)}</div><label className="shopping-label">Što trebam kupiti?<textarea rows={5} maxLength={4000} value={shopping} onChange={event => setShopping(event.target.value)} placeholder="Zapiši sastojke, svaki u novi red."/></label><button className="button" onClick={save}>Pripremi moj plan</button>{prepared && <div><p role="status">Plan je spreman. Preuzmi ga ili kopiraj iz polja ispod.</p><a className="arrow-link" href={`data:text/plain;charset=utf-8,${encodeURIComponent(prepared)}`} download="moj-tjedni-plan.txt">Preuzmi plan kao tekst ↓</a><label className="shopping-label">Tvoj plan za kopiranje<textarea readOnly rows={10} value={prepared}/></label></div>}</div>;
}
