var links=document.querySelectorAll("nav .nav-link")
let row = document.getElementById("rowData");
let dataContainer=[] ;

for (var i=0;i<links.length;i++){
    links[i].addEventListener("click" ,function(eventInfo){
        var innerWord=eventInfo.target.innerHTML;

getRecipes(innerWord);

    })
}




function displayData() {
    var cartona = ``;
    for (var i = 0; i <dataContainer.length; i++) {
        cartona+= `<div class="col-md-4 py-4">
        <div class="item">
        <h3>${dataContainer[i].recipe_id}</h3>
        <img   data-toggle="modal" data-target="#merit" src='${dataContainer[i].image_url}' onclick='
        getSingleRecipe(${dataContainer[i].recipe_id})' class='w-100'/>
       
        <h3>${dataContainer[i].title}</h3>
            <p>publisher:${dataContainer[i].publisher}</p>
            <a class='btn btn-warning' href='${dataContainer[i].source_url}' target='_blank'>source </a>
        </div>
   </div>`;
    }
    row.innerHTML=cartona;
}

getRecipes('pasta');


async function getRecipes(x){
    let response =await fetch(`https://forkify-api.herokuapp.com/api/search?q=${x}`);
    let myData = await response.json();
    dataContainer=myData.recipes;
    console.log(dataContainer)
    displayData()
}

let recipeData;
let rowRecipe=document.getElementById("rowRecipe")

async function getSingleRecipe(id){
    let res =await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeData= await res.json();
    recipeData=recipeData.recipe;
    console.log(recipeData)
    displaySingleRecpie();
}

function displaySingleRecpie() {
    let str = `<img src="${recipeData.image_url}" class="w-100" alt="">
    <h2>${recipeData.title}</h2>
    <p>${recipeData.publisher}</p>
    <p>${recipeData.ingredients}</p>`;
    rowRecipe.innerHTML=str;
    
  }
  


//   function getRecipes(x){
//     var req = new XMLHttpRequest();
//     req.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${x}`);
//     req.send();
//     req.addEventListener('readystatechange', function() {
//         if (req.readyState == 4 && req.status == 200) {
//             dataContainer = JSON.parse(req.response).recipes;
//             displayData();
//             console.log(req.response)
//             console.log(dataContainer)
//         }
//     })
//     {}
//     }