import { getData } from "./Storage"

let token = getData("token");
token = null;
let colorPrimario = getData("colorPrimario");
let colorSecundario = getData("colorSecundario");
let colorTerciario = getData("colorTerciario");

if (token == null) {
    colorPrimario = "#385273";
    colorSecundario = "#A3B2CF";
    colorTerciario = "#00264D";
}


export default {
    C_PRIMARIO: colorPrimario,
    C_SECUNDARIO: colorSecundario,
    C_TERCIARIO: colorTerciario,
}