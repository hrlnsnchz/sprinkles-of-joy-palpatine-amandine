const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".about")

export const renderContact = () => {
    contentContainer.innerHTML = `
  <div id="about__modal" class="modal--parent">
        <div class="modal--content">
        <h3>About Sprinkles of Joy</h3>
        <form class="contactForm">
            <label class="name" for="name">Name:</label>
            <input type="text" id="name" name="name">

            <label class="email" for="email">Email:</label>
            <input type="email" id="email" name="email">

            <label class="message" for="message">Message:</label>
            <input type="text" id="message" name="message">
        <button id="modal--close">Close</button>
        </form>
        </div>
    </div>`
}

eventHub.addEventListener("showContactForm", evt => {
    renderContact()
})

const closeModal = () => {
    contentContainer.innerHTML = ""
  }
  
eventHub.addEventListener("click", event => {
    if (event.target.id === "modal--close") {
      closeModal()
    }
  })