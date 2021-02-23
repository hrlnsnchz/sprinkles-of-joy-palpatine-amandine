const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".about")

export const renderAbout = () => {
    contentContainer.innerHTML = `
  <div id="about__modal" class="modal--parent">
        <div class="modal--content">
        <h3>About Sprinkles of Joy</h3>
        <div>
            <p>Gummi bears toffee croissant ice cream chupa chups donut tootsie roll jelly beans chocolate cake. Icing toffee chupa chups pudding. Brownie muffin cake brownie sesame snaps croissant. Oat cake gingerbread chupa chups biscuit toffee danish apple pie oat cake cotton candy. Marshmallow biscuit chocolate cake halvah. Chocolate bar sesame snaps oat cake gummies lemon drops liquorice sweet. Tart jujubes pie sweet roll donut cotton candy tiramisu. Cake icing apple pie jelly-o. Croissant sweet caramels macaroon lemon drops tiramisu. Lemon drops jelly sweet roll powder. Marshmallow marshmallow oat cake gummi bears gummies. Candy cupcake tiramisu bear claw tootsie roll lemon drops candy cupcake tootsie roll. Lollipop pie cheesecake. Sweet marshmallow cupcake jelly cake.
</p>
            <p>Powder macaroon brownie halvah soufflé brownie gummi bears toffee cupcake. Marzipan donut brownie dragée gingerbread cotton candy toffee chocolate. Icing sugar plum carrot cake chocolate jelly-o lemon drops pie. Cotton candy lollipop pudding carrot cake jelly-o candy. Pie bear claw oat cake chocolate cake gummi bears dessert cheesecake. Brownie topping sugar plum soufflé gingerbread tart chocolate cotton candy oat cake. Gummies marshmallow chocolate bar liquorice tart bonbon dragée. Cheesecake halvah cotton candy chocolate cake. Powder gingerbread chupa chups jujubes. Topping liquorice carrot cake sesame snaps gummies toffee dessert. Lemon drops chocolate halvah tart jelly soufflé caramels jelly-o gummies. Pudding donut chupa chups chupa chups gingerbread halvah. Gummies marshmallow fruitcake dragée toffee jelly beans cotton candy pastry.</p>
        </div>
        <button id="modal--close">Close</button>
        </div>
    </div>`
}

eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("nav__")) {
      const [idPrefix, idSuffix] = event.target.id.split("__")
      let customEvent
      switch (idSuffix) {
        case "about":
          customEvent = new CustomEvent("showAbout")
          break;
        case "contact":
          customEvent = new CustomEvent("showContactForm")
          break;
      }
      eventHub.dispatchEvent(customEvent)
    }
  })

eventHub.addEventListener("showAbout", evt => {
    renderAbout()
})

const closeModal = () => {
    contentContainer.innerHTML = ""
  }
  
eventHub.addEventListener("click", event => {
    if (event.target.id === "modal--close") {
      closeModal()
    }
  })