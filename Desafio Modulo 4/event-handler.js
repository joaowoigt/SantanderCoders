import { getApiData } from "./api-handler.js"
import { queryConverter} from "./utils.js"

// Event module

const input = document.querySelector("#main-search")

// Activate search feature
export const inputOnBlurEvent = () => {
    input.addEventListener("blur", () => {
        searchApiWithQuery()
    })
}

// Clear search result
export const inputOnFocusEvent = () => {
    input.addEventListener("focus", () => {
        deleteExistingSearchResultElements()
    })
}

const searchApiWithQuery = () => {
    const query = input.value
    const queryFormated = queryConverter(query.trim().toLowerCase())
    getApiData(queryFormated)
}

export const deleteExistingSearchResultElements = () => {
    const allNewCards = document.getElementsByClassName("new-card")
    while(allNewCards.length > 0) {
        allNewCards[0].parentNode.removeChild(allNewCards[0])
    }

    const searchResult = document.getElementsByClassName("search-result-text")
    while(searchResult.length > 0) {
        searchResult[0].parentNode.removeChild(searchResult[0])
    }

    const searchResultButton = document.getElementsByClassName("search-result-state-button")
    while(searchResultButton.length > 0)  {
        searchResultButton[0].parentNode.removeChild(searchResultButton[0])
    }
    
    const stateSearched = document.getElementsByClassName("state-searched")
    while(stateSearched.length > 0)  {
        stateSearched[0].parentNode.removeChild(stateSearched[0])
    }
   
    const cancelSearch = document.getElementsByClassName("cancel-search")
    while(cancelSearch.length > 0)  {
        cancelSearch[0].parentNode.removeChild(cancelSearch[0])
    }
}
