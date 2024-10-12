let data = null; //initialize first bc javascript is dumb

window.addEventListener('load', ()=>{

    fetchData();
    cityInput();
    // populateDom();

    async function fetchData() {
      try {
          const response = await fetch('/api/data'); // Fetches data from the API endpoint
  
          if (!response.ok) {
              throw new Error('Could not locate JSON');
          }
  
        data = await response.json();
          console.log('Fetched data:', data);
          console.log(data.placedata[0].place);
          //document.getElementById('output').innerText = JSON.stringify(data, null, 2);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
})

// fetchData();  // Call the function to fetch the data
  
      function cityInput() {
        inputBox = document.createElement('input');
        inputBox.setAttribute('type', 'text');
        inputBox.setAttribute('id', 'inputField');
        inputBox.setAttribute('placeholder', 'Search here for a city');
        document.body.appendChild(inputBox);
        console.log("Input element added to DOM: ", inputBox);
    
        // Add event listener to the input box
        inputBox.addEventListener('keydown', function (event) {
  
         // Check if the Enter key is pressed
            if (event.key === 'Enter') {
                const inputValue = inputBox.value;
                console.log(inputValue);
                populateDom(inputValue);
            }
        });
    }

async function populateDom(inputValue) {
  let user_obj;
  let success = document.getElementById('found');
  let city = document.getElementById('city-name');
  let population = document.getElementById('population');
  let country = document.getElementById('country');
  let requestedplace = inputValue;

  for(let i = 0; i<data.placedata.length;i++) { 
    if(requestedplace == data.placedata[i].place) {
      user_obj = data.placedata[i];
    }
  }
  
  if(user_obj){
        // response.json(user_obj);
        // response.json('Thank you. You requested the city of ' + request.params.place);
        // response.send('It maches with ');
        // response.send(user_obj);
        console.log("MATCH")
        //response.json(user_obj);
        success.innerHTML = "City Found!";
        city.innerHTML = user_obj.place;
        population.innerHTML = user_obj.population;
        country.innerHTML = user_obj.note;
      } 
    }
