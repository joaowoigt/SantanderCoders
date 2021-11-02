
// Some const and fuctions to help make the code more clear
export const amenitiesDictionary = {
    PETS_ALLOWED : "Permitido animais de estimação",
    ELEVATOR: "Elevador",
    ELECTRONIC_GATE: "Portão Eletronico",
    CINEMA: "Cinema",
    GYM: "Academia",
    GATED_COMMUNITY: "Condominio",
    PLAYGROUND: "Parquinho para crianças",
    SAUNA: "Sauna",
    GARDEN: "Jardim",
    PARTY_HALL: "Salão de festas",
    FURNISHED: "Mobiliado",
    FIREPLACE: "Lareira",
    POOL: "Piscina",
    BARBECUE_GRILL: "Churrasqueira",
    AIR_CONDITIONING: "Ar condicionado",
    BICYCLES_PLACE: "Estacionamento de bicicletas",
    SPORTS_COURT: "Quadra esportiva",
    AMERICAN_KITCHEN: "Cozinha americana" ,
    TENNIS_COURT: "Quadra de Tenis",
    LAUNDRY: "Lavanderia"
}

const saoPauloApiQuery =  {state: "sp", city: "sao-paulo"}
const rioDeJaneiroApiQuery = {state: "rj", city: "rio-de-janeiro"}
const saoPauloQueryPossibilities = ["sao paulo", "sap paulo", "saopaulo", "são paulo", "sao paulp", "sp"] 
const rioDeJaneiroQueryPossibilities = ["rio de janeiro", "rip de janeiro", "riodejaneiro", "roi de janeiro", "rio janeiro", "rj"] 

export const queryConverter = (query) => {
    if (saoPauloQueryPossibilities.includes(query)) {
        return saoPauloApiQuery
    }
    if (rioDeJaneiroQueryPossibilities.includes(query)) {
        return rioDeJaneiroApiQuery
    } else {
       return query
    }
}