const COHORT = "2402-ftb-et-web-pt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

//object with an empty array of events
const state = {
  events: [],
};

//here you target the UL of events
const eventsList = document.querySelector("#events");

///here you target the list of add events form 
const addAEventsForm = document.querySelector("#addEvents");
//here you add an event listener event to the submit button to add your events
addAEventsForm.addEventListener("submit", addEvents);



/**
 * Sync state with the API and rerender
 */
async function render() {
  await getEvents();
 renderEvents();
}
render();

/**
 * Update state with events from API
 */
async function getEvents() {
  // TODO
  try{
    const response = await fetch(API_URL);
    const data = await response.json();
    state.events = data.data;
    console.log("STATE", state.events);
  }
  catch (error){
      console.log(error.message)
  }
}


  /*
   * Ask the API to delete event based on form data
   * @param {id} */
    
  const deleteEvent = async (id) => {
   
    console.log('delete');

    try {
      const response = await fetch(`${API_URL}/${id}/`, 
      {
        method: 'DELETE'
      });
      const data = await response.json();
      } catch (error) {
      console.error(error);
    }
  };
  

/*
 * Render artists from state
 * we can do a for each to loop throught the arrat*/
 
function renderEvents() {
    // TODO
    for (let i=0 ; i<state.events.length ; i++){
      const currentEvents= state.events[i];
      console.log(currentEvents)
      const myDiv = document.createElement("div");
      myDiv.innerHTML = `
      <p> ${currentEvents.name} </p>
      <p> ${currentEvents.description} </p>
      <p> ${currentEvents.date} </p> 
      <p> ${currentEvents.location} </p>
      <button class="delete-button" data-id="${currentEvents.id}">Delete Event</button>
   
      `;
      eventsList.appendChild(myDiv)

      const deletebutton = myDiv.querySelector('.delete-button');
      deletebutton.addEventListener('click', async (event) =>  {
        await deleteEvent(event.target.dataset.id);
       // await window.location.reload();
      });
   
  
 
    }

  }


  /*
   * Ask the API to enter a new event based on form data
   * @param {Event} event*/
  
  async function addEvents(event) {
    event.preventDefault();
    const nameInput = document.querySelector('input[name="name"]')
    const descriptionInput = document.querySelector('input[name="description"]')
    const dateInput = document.querySelector('input[name="date"]')
    const locationInput = document.querySelector('input[name="location"]')
    
    const name = nameInput.value;
    const description = descriptionInput.value;
    const datetoConvert = dateInput.value;
    const date=  new Date(datetoConvert).toISOString();
    const location = locationInput.value;
    
   
    console.log(name, description, date, datetoConvert, location)
  
    // TODO
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          date,
          location,
        }),
      }); 
  
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
  
      render();
    } catch (error) {
      console.error(error);
    }
  }
  



