
const loadingEl = document.getElementById("loading");
document.getElementById("button").addEventListener("click", ()=>{sentimentor()});

async function sentimentor (){
 
    const url = "https://sentim-api.herokuapp.com/api/v1/";
    const body = JSON.stringify({ "text": document.getElementById("text").value })
    const headers = {  
        Accept: "application/json",
        "Content-Type": "application/json" 
    }
    console.log("body "+body)
    console.log("headers "+headers)
    loadingEl.hidden=false;
    const respone = await fetch (url,{
        method: "POST",
        headers,
        body
    })
    const data = await respone.json();
    loadingEl.hidden=true;
    console.log(data)

    document.getElementById("result").textContent = `The result is: ${data.result.type}`
   
    const color = document.getElementById("result");
    if (data.result.type === 'positive'){
        color.classList = "positive";
    }
    if (data.result.type === 'negative'){
        color.classList = "negative";
    }
    if (data.result.type === 'neutral'){
        color.classList = "neutral";
    }

}


