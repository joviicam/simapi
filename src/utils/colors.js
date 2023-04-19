import { getData } from "./Storage"

/* async function getColors() {
  let colorPrimario = await getData("colorPrimario") ? await getData("colorPrimario") : "#385273";
  let colorSecundario = await getData("colorSecundario") ? await getData("colorSecundario") : "#A3B2CF";
  let colorTerciario = await getData("colorTerciario") ? await getData("colorTerciario") : "#00264D";

  return {
    C_PRIMARIO: colorPrimario,
    C_SECUNDARIO: colorSecundario,
    C_TERCIARIO: colorTerciario,
  }
}

export default getColors(); */

let token = getData("token");
token = null; 
let colorPrimario = getData("colorPrimario") ? getData("colorPrimario") : "#385273";
let colorSecundario = getData("colorSecundario") ? getData("colorSecundario") : "#A3B2CF";
let colorTerciario = getData("colorTerciario") ? getData("colorTerciario") : "#00264D";

export function setColors(c1, c2, c3){
    colorPrimario = c1;
    colorSecundario = c2;
    colorTerciario = c3;
    console.log("setColors: " + colorPrimario + " " + colorSecundario + " " + colorTerciario)
} 

if (token == null) {
    colorPrimario = "#385273";
    colorSecundario = "#A3B2CF";
    colorTerciario = "#00264D";
} else {
    colorPrimario = getData("colorPrimario");
    colorSecundario = getData("colorSecundario");
    colorTerciario = getData("colorTerciario");
} 


export default {
    C_PRIMARIO: colorPrimario,
    C_SECUNDARIO: colorSecundario,
    C_TERCIARIO: colorTerciario,
} 

let C_PRIMARIO = "#385273";
let C_SECUNDARIO = "#A3B2CF";
let C_TERCIARIO = "#00264D";



export {C_PRIMARIO, C_SECUNDARIO, C_TERCIARIO}