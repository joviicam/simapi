import { getData } from "./Storage"

let token = getData("token");
token = null;
let colorPrimario = "";
let colorSecundario = "";
let colorTerciario = "";

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