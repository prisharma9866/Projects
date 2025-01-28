let key = "041b580a0b194d79bff11031934050fe";
let cardData = document.querySelector(".cardData");
let searchBtn = document.getElementById("searchBtn");
let inputData = document.getElementById("inputData");
let searchType = document.getElementById("type");

 const defaultImage = "https://tse2.mm.bing.net/th?id=OIP.quWuFs3R3xzjJNeeSST4IQAAAA&pid=Api&P=0&h=180";
// Function to fetch news data
const getData = async (input = "World") => {
    try {
        let res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        let jsonData = await res.json();

        console.log(jsonData.articles); // Debugging log
        searchType.innerText = "Search: " + input;
        inputData.value = "";
        cardData.innerHTML = "";

        if (jsonData.articles.length === 0) {
            cardData.innerHTML = `
                <div class="card">
                    <img src="${defaultImage}" alt="No News Available">
                    <h3>No news available</h3>
                    <p>Try searching for something else!</p>
                </div>
            `;
            return;
        }

        jsonData.articles.forEach((article) => {
            let divs = document.createElement("div");
            divs.classList.add("card");
            cardData.appendChild(divs);

            // Default values for missing data
            let imageUrl = article.urlToImage || defaultImage;
            let title = article.title || "No Title is available";
            let description = article.description || "No Description Available";

            divs.innerHTML = `
                <img src="${imageUrl}" alt="">
                <h3>${title}</h3>
                <p>${description}</p>
            `;
            divs.addEventListener("click", () => {
                window.open(article.url);
            });
        });
    } catch (error) {
        console.error(error);
        cardData.innerHTML = `
            <div class="card">
                <img src="${defaultImage}" alt="Error Image">
                <h3>Error</h3>
                <p>Could not fetch news data. Please try again later.</p>
            </div>
        `;
    }
};

// Event listener for page load
window.addEventListener("load", () => {
    getData(); // Fetch default news for "India"
});

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    let inputText = inputData.value.trim();
    getData(inputText);
});

// Function for category navigation click
function navClick(navName) {
    document.getElementById("politics").style.color = navName === "politics" ? "rgb(0,140,255)" : "white";
    document.getElementById("sports").style.color = navName === "sports" ? "rgb(0,140,255)" : "white";
    document.getElementById("technology").style.color = navName === "technology" ? "rgb(0,140,255)" : "white";

    getData(navName); // Fetch news for the selected category
}
