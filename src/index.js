document.addEventListener('DOMContentLoaded', () => {
  //  response => { return response.json() }
  // fetch('http://localhost:3000/dogs') // GET request
  // .then(response => response.json())
  // .then(json => {
  //   console.log(json)
  // })

  function init(){
    fetch('http://localhost:3000/dogs')
  .then(function(response){
    return response.json()
  }).then(function(json){
    // Now that we have the JSON
    // Iterate through the data and
    const table = document.querySelector('#table-body')
    table.innerHTML = ""
    setTimeout(function(){
      json.forEach(function(dog){
          // render the pieces we want into the table
          // We need to find the table, and tell it what to add
          // const table = document.querySelector('#table-body')
          table.innerHTML += `<tr><td>${dog["name"]}</td> <td>${dog.breed}</td> <td>${dog["sex"]}</td> <td><button data-id=${dog.id}>Edit</button></td></tr>`


          // We want to add an event listener
          // We need to know what event
          // And what location
      })
    }, 3000)

  })
}
init()
  //


  // Event Delegation
  // We are going to add the event listener
  const table = document.querySelector('#table-body')
  table.addEventListener('click', function(event){
    if(event.target.innerText === 'Edit'){
      let dogId = event.target.dataset.id
      fetch(`http://localhost:3000/dogs/${dogId}`) // GET /dogs/1
      .then(response => response.json())
      .then(function(json){
        let dogForm = document.getElementById('dog-form')

        // <input data-beef=""> => dataset.beef
        dogForm[3].dataset.id = json.id
        let nameInput = dogForm[0] // first input field
        let breedInput = dogForm[1] // second input
        let sexInput = dogForm[2] // third input

        // Set the values through the form
        nameInput.value = json.name
        breedInput.value = json.breed
        sexInput.value = json.sex
      })


    }
  })

  let dogForm = document.getElementById('dog-form')

  dogForm.addEventListener('submit', function(event){
    // We grabbed the input fields
    event.preventDefault()


      // We need to edit the table
      // We are gonna select that button
      // When using data-id or anything in dataset
      // we need to make sure our "interpolated" variable is
      // surrounded by quotes
      let dogId = event.target[3].dataset.id
      // And send a fetch that PATCHs

      let nameInput = event.target[0].value // first input field
      let breedInput = event.target[1].value // second input
      let sexInput = event.target[2].value // third input

      fetch(`http://localhost:3000/dogs/${dogId}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json', // I am sending a message that is JSON
          'Accepts': 'application/json'   // I am receiving a message that is JSON
        },
        body: JSON.stringify({
          name: nameInput,
          breed: breedInput,
          sex: sexInput,
        })
        }).then(response => response.json())
        .then(function(){
          init()
        })




  })



  // to the table body, to the whole thing
  // Make sure to check if it is the edit button
  // We need to grab the id for the dog

})

// - On page load, render a list of
// already registered dogs in the table.
/// You can fetch these dogs from
// http://localhost:3000/dogs.

// When the pages loads, we want it to render out
// all the dogs

// - The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`
// - Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
// - On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
// - Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.
