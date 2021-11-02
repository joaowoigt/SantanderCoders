import { deleteExistingSearchResultElements } from "./event-handler.js"
import { amenitiesDictionary } from "./utils.js"

const container = document.querySelector('main')

export const createCard = (arr) => {
    arr.map((proprietie) => {

        const newCard = document.createElement("div")
        newCard.style.display = "flex"
        newCard.style.flexDirection = "row"
        newCard.style.borderRadius = "4px"
        newCard.style.marginBottom = "8px"
        newCard.style.border = "1px solid rgba(0,0,0,.125)"
        newCard.className = "new-card"
  
        const imgDiv = document.createElement("div")
        imgDiv.style.display = "flex"
        imgDiv.style.width = "37%"
        imgDiv.style.height = "100%"
        imgDiv.style.borderRadius = "4px"
        imgDiv.style.overflow = "hidden"
        imgDiv.style.backgroundImage = `url(${proprietie.medias[0].url})`
        imgDiv.style.backgroundPosition = "center"
        imgDiv.style.objectFit = "fill"

        const specificationsDiv = document.createElement("div")
        specificationsDiv.style.display = "flex"
        specificationsDiv.style.flexDirection = "column"
        specificationsDiv.style.padding = "16px"
        specificationsDiv.style.marginLeft = "32px"

        const address = document.createElement("h5")
        const name = document.createElement("h3")
        const state = (proprietie.link.data.city === "Rio de Janeiro") ? "RJ" : "Sp"
        address.innerText = `${proprietie.link.data.street}, ${proprietie.link.data.streetNumber} - ${proprietie.link.data.neighborhood}, ${proprietie.link.data.city} - ${state} `
        address.style.color = "#b0b9c3"
        name.innerText = `${proprietie.link.name}`

        const comoditiesDiv = document.createElement("div")
        comoditiesDiv.style.display = "flex"
        comoditiesDiv.style.flexDirection = "row"
        
        const usableArea = document.createElement("h5")
        usableArea.innerText = (proprietie.listing.totalAreas[0] != undefined) ? `${proprietie.listing.totalAreas[0]} m²` : "-"
        usableArea.style.marginRight = "8px"

        const rooms = document.createElement("h5")
        rooms.innerText = `${proprietie.listing.bedrooms[0]} quartos`
        rooms.style.marginRight = "8px"

        const bathrooms = document.createElement("h5")
        bathrooms.innerText = `${proprietie.listing.bathrooms[0]} banheiros`
        bathrooms.style.marginRight = "8px"

        const parkingSpaces = document.createElement("h5")
        parkingSpaces.innerText = `${proprietie.listing.parkingSpaces} vagas`

        const amenitiesDiv = document.createElement("div")
        amenitiesDiv.style.display = "flex"
        amenitiesDiv.style.flexDirection = "row"

        createAmenitesItems(proprietie.listing.amenities, amenitiesDiv)
        
        const priceDiv = document.createElement("div")
        priceDiv.style.marginTop = "90px"

        const price = document.createElement("h3")
        const princeFormated = new Intl.NumberFormat({style: "currency", currency: "BRL"}).format(proprietie.listing.pricingInfos[0].price)
        price.innerText = `R$ ${princeFormated}`

        const monthlyCondonFee = document.createElement("h3")
        const monthlyCondonFeeFormated =(proprietie.listing.pricingInfos[0].monthlyCondoFee != undefined) ? new Intl.NumberFormat({style: "currency", currency: "BRL"}).format(parseInt(proprietie.listing.pricingInfos[0].monthlyCondoFee)) : "-"
        monthlyCondonFee.innerText = `Condominio: R$ ${monthlyCondonFeeFormated}` 
       
        specificationsDiv.appendChild(address)
        specificationsDiv.appendChild(name)

        comoditiesDiv.appendChild(usableArea)
        comoditiesDiv.appendChild(rooms)
        comoditiesDiv.appendChild(bathrooms)
        comoditiesDiv.appendChild(parkingSpaces)

        priceDiv.appendChild(price)
        priceDiv.appendChild(monthlyCondonFee)

        specificationsDiv.appendChild(comoditiesDiv)
        specificationsDiv.appendChild(amenitiesDiv)
        specificationsDiv.appendChild(priceDiv)

        newCard.appendChild(imgDiv)
        newCard.appendChild(specificationsDiv)

        container.appendChild(newCard)
    })
}

const createAmenitesItems = (arr, div) => {
   arr.map((amenites) => {
        const span = document.createElement("span")
        span.style.background = "#ebebeb"
        span.style.borderRadius = "8px"
        span.style.paddingRight = '4px'
        span.style.paddingLeft = "4px"
        span.style.fontSize = "0.8rem"
        span.style.color = "#adafb6"
        span.style.marginRight = "8px"
        span.innerText = amenitiesDictionary[amenites]
        div.appendChild(span)
    })
}

export const changeItemsBySearch = (obj) => {
    const stateSearchedContainer = document.querySelector(".state-searched-container")
    
    const stateSearched = document.createElement("h6")
    stateSearched.innerText = `${obj.search.result.listings[0].listing.address.city} - ${obj.search.result.listings[0].listing.address.stateAcronym}`
    stateSearched.className = "state-searched"

    const cancelButton = document.createElement("button")
    const cancelButtonText = document.createElement("h6")
    cancelButtonText.innerText = "X"
    cancelButton.style.background = "transparent"
    cancelButton.style.border = "none"
    cancelButton.style.color = "#8e9d75"
    cancelButton.className = "cancel-search"
    cancelButton.addEventListener("click", () => {
        deleteExistingSearchResultElements()
    })
    cancelButton.appendChild(cancelButtonText)
   
    stateSearchedContainer.appendChild(stateSearched)
    stateSearchedContainer.appendChild(cancelButton)

    const searchResultDiv = document.querySelector(`.search-result`)
    

    const searchResult = document.createElement("h4")
    searchResult.innerText = `${obj.search.totalCount} imóveis à venda em ${obj.search.result.listings[0].listing.address.city} - ${obj.search.result.listings[0].listing.address.stateAcronym} `
    searchResult.className = "search-result-text"
    
    searchResultDiv.appendChild(searchResult)

    const buttonStateResultDiv = document.querySelector(".search-result-state")
    const buttonStateSearched = document.createElement(`button`)
    buttonStateSearched.className = "search-result-state-button"
    buttonStateSearched.style.background = "transparent"
    buttonStateSearched.style.borderRadius = "16px"
    buttonStateSearched.style.border = "#2196F3 solid 1px"
    buttonStateSearched.style.color = "#2196F3"
    buttonStateSearched.style.padding = "4px"
    buttonStateSearched.style.marginBottom = "16px"
    buttonStateSearched.innerText = `${obj.search.result.listings[0].listing.address.city} - ${obj.search.result.listings[0].listing.address.stateAcronym} X`
    buttonStateSearched.addEventListener("click", () => {
        deleteExistingSearchResultElements()
    })

    buttonStateResultDiv.appendChild(buttonStateSearched)
 
}

export const createErrorResponse = () => {
    const errorDiv = document.createElement("div")
    errorDiv.className = "new-card"
    errorDiv.style.display = "flex"
    errorDiv.style.flexDirection = "column"
    errorDiv.style.alignItems = "center"

    const errorMessage1 = document.createElement("h1")
    errorMessage1.innerText = "OOOOPS!"
    errorMessage1.style.fontWeight = "900"

    const errorMessage2 = document.createElement("h1")
    errorMessage2.innerText = "ALGO DEU ERRADO NA SUA BUSCA."
    errorMessage2.style.fontWeight = "900"

    const errorMessage3 = document.createElement("h1")
    errorMessage3.innerText = "status 500!"
    errorMessage3.style.fontWeight = "900"
    errorMessage3.style.color = "red"

    const errorMessage4 = document.createElement("h1")
    errorMessage4.innerText = "POR FAVOR, TENTE NOVAMENTE!"
    errorMessage4.style.fontWeight = "900"

    errorDiv.appendChild(errorMessage1)
    errorDiv.appendChild(errorMessage2)
    errorDiv.appendChild(errorMessage3)
    errorDiv.appendChild(errorMessage4)
    container.appendChild(errorDiv)
}
