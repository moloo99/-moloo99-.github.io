let voteData = {  //all this is dummy data, will be modified later on, as needed
  "image_id": "asf2",
  "sub_id": "my-user-1234",
  "value": 1
}

let favData = {  //all this is dummy data, will be modified later on, as needed
  "image_id": "9ccXTANkb",
  "sub_id": "my-user-1234"
}



// GET REQUEST
function getCat() {
  axios
    .get('https://api.thecatapi.com/v1/images/search')
    .then(res => showCat(res))
    .catch(err => console.log(error));
}

getCat();

//this will show the cat in the inner HTML
function showCat(res){
  document.getElementById('gato').innerHTML = `
  <img  class="card-img-top" src='${res.data[0]["url"]}'>
  `;
  console.log(res.data[0]["id"]);
  voteData.image_id = res.data[0]["id"];
  favData.image_id =res.data[0]["id"];
  console.log(voteData.image_id);
  console.log(favData.image_id);
}

// POST REQUEST
function votedCute() {
  voteData.value = 0;
  axios
    .post('https://api.thecatapi.com/v1/votes', voteData,
    {
      "headers": {'x-api-key': '80bbdd0f-a6a8-47f9-ae53-3cc63cd413fe'}
    })
    .then(res => console.log(res))
    .catch(err => console.error(err))
    ;
  getCat();
}

// POST REQUEST
function votedUgly() {
  
  axios
    .post('https://api.thecatapi.com/v1/votes', voteData,
    {
      "headers": {'x-api-key': '80bbdd0f-a6a8-47f9-ae53-3cc63cd413fe'}
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
  getCat();
}


function getVotes(){
  console.log("getting the votes....")
axios
    .get('https://api.thecatapi.com/v1/votes', {"headers": {'x-api-key': '80bbdd0f-a6a8-47f9-ae53-3cc63cd413fe'}})
    .then(res => showVotes(res))
    .catch(err => console.log(error));
    
}

function showVotes(res){
  document.getElementById('votos').innerHTML = `
  <p>${JSON.stringify(res.data)}</p>
  `;
  
}



// Code to upload a cat image
const uploadcat = (event) => {
  console.log('event',event.files)
  const formdata= new FormData()
  formdata.append('file',event.files[0])
  fetch('https://api.thecatapi.com/v1/images/upload',{
      method:"post",
      headers: {
         
          "x-api-key":"80bbdd0f-a6a8-47f9-ae53-3cc63cd413fe"
      },
      body: formdata
  }).then((res)=>res.json()).then((data)=>{
      console.log('data',data)
      alert(`ID-${data.id} url=${data.url} approved=${data.approved}`)
  })
}


// Event listeners
document.getElementById('show-a-cat').addEventListener('click', getCat);
document.getElementById('cute').addEventListener('click', votedCute);
document.getElementById('ugly').addEventListener('click', votedUgly);
document.getElementById('check-votes').addEventListener('click', getVotes);

