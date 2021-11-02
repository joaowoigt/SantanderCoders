 import { createCard, changeItemsBySearch, createErrorResponse } from "./html-handler.js"

// Make api call and create html elements with response
export const getApiData = (query) => {
    if (query === "") {
        return 
    } else  {
        const endpoint =  `https://private-9e061d-piweb.apiary-mock.com/venda?state=${query.state}&city=${query.city}`
        const promise = fetch(endpoint).then(data => data.json())
        promise.then((result) => changeItemsBySearch(result)).catch( () => {
            createErrorResponse()
        })
        promise.then((result) => createCard(result.search.result.listings))
    }
}
