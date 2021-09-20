
document.getElementById("button").addEventListener("click", ()=>{sentimentor()});
const loadingEl = document.getElementById("loading");
const catImgEl = document.createElement("img");

async function sentimentor (){
    try {
 
        const url = "https://sentim-api.herokuapp.com/api/v1/";
        const body = JSON.stringify({ "text": document.getElementById("text").value })
        const headers = {  
            Accept: "application/json",
            "Content-Type": "application/json" 
        }

        loadingEl.hidden=false;
        const response = await fetch (url,{
            method: "POST",
            headers,
            body
        })
        const data = await response.json();
        console.log(data.error)
        loadingEl.hidden=true;
        
        const result = data.result;

        document.getElementById("result").textContent = `The result is: ${result.type},${result.polarity}`

        const color = document.getElementById("result");
        if (result.type === 'positive'){
            color.classList = "positive";
        }
        if (result.type === 'negative'){
            color.classList = "negative";
        }
        if (result.type === 'neutral'){
            color.classList = "neutral";
        }
        console.log(response)
        catImgEl.setAttribute("src", `https://http.cat/${response.status}`);
        document.getElementById("catImg").append(catImgEl);
        if (!response.ok){
            throw response.status 
        }

    }
    catch(error){
        const errorEl= document.getElementById('mistake');
        errorEl.textContent= 'You had a API problem ' + error;
    }
}