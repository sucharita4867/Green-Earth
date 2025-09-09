const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("main-container").classList.add("hidden");
  } else {
    document.getElementById("main-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const url = "https://openapi.programming-hero.com/api/categories";
fetch(url)
  .then((res) => res.json())
  .then((json) => categories(json.categories));

const categories = (cats) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  for (let categorie of cats) {
    const categoriesDiv = document.createElement("div");
    categoriesDiv.innerHTML = `
    <div id="categories-container-${categorie.id}" class="  hover:text-white col-span-2 text-[#1f2937] hover:bg-[#2daf59] rounded-sm space-y-4 py-2  text-center bg-[#cff0dc] font-semibold block cat-btn">
                               <p>${categorie.category_name}</p>
                         </div>
     `;
    const removeActive = () => {
      const categoryBtn = document.querySelectorAll(".cat-btn");
      categoryBtn.forEach((btn) => btn.classList.remove("active"));
    };
    categoriesDiv.addEventListener("click", () => {
      const url = `https://openapi.programming-hero.com/api/category/${categorie.id}`;
      // console.log(url);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          removeActive();
          const clickBtn = document.getElementById(
            `categories-container-${categorie.id}`
          );
          clickBtn.classList.add("active");
          categoryItem(data.plants);
        });
    });

    const categoryItem = (items) => {
      const cardBox = document.getElementById("card-container");
      cardBox.innerHTML = "";
      items.forEach((cardItem) => {
        const card = document.createElement("div");
        // categorys click cards
        card.innerHTML = `
    
    <div  class="bg-white md:p-3 p-1 shadow-xl space-y-3 rounded-md">
                                    <div class="">
                                    <img class="rounded-md h-64 w-full flex justify-center items-center" src="${cardItem.image}" alt="">
                                    </div>
                                    <div class="space-y-2">
                                          <h1 class="font-semibold">${cardItem.name}</h1>
                                          <p class="text-[#1f2937] text-sm">${cardItem.description}</p>
                                          <div class="flex justify-between items-center">
                                                <p class="text-[#15803d] bg-[#dcfce7] md:px-2 md:py-1 rounded-full">${cardItem.category}
                                                </p>
                                                <p class="font-semibold">৳<span class="text-[#15803D]">${cardItem.price}</span></p>
                                          </div>
                                          <div
                                                class="w-full text-center bg-[#15803D] text-white md:px-6 md:py-3 px-2 py-1 rounded-full hover:opacity-85">
                                                <button id="card-btn" onClick="hendleClick(${cardItem.id})" class="">Add to Cart</button>
                                          </div>
                                    </div>
                              </div>
    `;
        card.querySelector("h1").addEventListener("click", () => {
          const cardDetailsUrl = `https://openapi.programming-hero.com/api/plant/${cardItem.id}`;
          fetch(cardDetailsUrl)
            .then((res) => res.json())
            .then((json) => cardDetails(json.plants));
        });
        // categorys click cards details
        const cardDetails = (element) => {
          console.log(element);
          const detailsBox = document.getElementById("detailsContainer");
          // categorys modal cards
          detailsBox.innerHTML = `
          <div  class="bg-white  p-3  rounded-md">
                              <h1 class="font-bold text-lg">${element.name}</h1>
                              <img class="rounded-md my-2 h-60 w-full  " src="${element.image}" alt="">
                              <div class="space-y-1">
                                    <h2 class="text-gray-600"><span class="text-[#1f2937] font-semibold">category:
                                          </span> ${element.category}</h2>
                                    <p class="text-gray-600"><span class="text-[#1f2937] font-semibold">Price:
                                          </span>৳<span>${element.price}</span>
                                    </p>
                                    <p class="text-gray-600 "><span class="text-[#1f2937] font-semibold">Description:
                                          </span>${element.description}</p>

                              </div>
                        </div>
          `;
          document.getElementById("my_modal_5").showModal();
        };
        cardBox.append(card);
      });
    };
    categoriesContainer.append(categoriesDiv);
  }
};

// ============================ display ====================
let totalPrice = 0;
const hendleClick = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => plant(data.plants));
  const plant = (item) => {
    // console.log(item);
    const clickOk = confirm(`${item.name} has been added to the card.`);

    const sidebarContainer = document.getElementById("side-card-container");
    const totalPriceEl = document.getElementById("totalPrice");

    // let clickOk = `${item}`;
    if (clickOk) {
      const sidebarContainer = document.getElementById("side-card-container");
      let newCard = document.createElement("div");
      // sidebar container
      newCard.innerHTML = `
      <div class="md:flex mt-2 p-3 m-2 rounded-lg   justify-between items-center bg-[#cff0dc98]">
                                          <div>
                                                <h1 class="font-bold">${item.name}</h1>
                                                <p class="text-[#1f2937]">৳<span id="card-price">${item.price}</span></p>
                                          </div>
                                          <div class="delete-btn" >
                                                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                      stroke-width="1.5" stroke="currentColor" class="size-6 font-bold text-red-700">
                                                      <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M6 18 18 6M6 6l12 12" />
                                                </svg>

                                          </div>
                                        
                                    </div>
      `;
      totalPrice += parseFloat(item.price);
      totalPriceEl.innerText = totalPrice;

      newCard.querySelector(".delete-btn").addEventListener("click", () => {
        newCard.remove();
        totalPrice -= parseFloat(item.price);
        totalPriceEl.innerText = totalPrice;
      });
      sidebarContainer.append(newCard);
    }
  };
};

const cardUrl = "https://openapi.programming-hero.com/api/plants";
manageSpinner(true);
fetch(cardUrl)
  .then((res) => res.json())
  .then((data) => cards(data.plants));
const cards = (cardItems) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  for (let item of cardItems) {
    const cardDiv = document.createElement("div");
    // displays cards
    cardDiv.innerHTML = `
    <div class="bg-white md:p-3 h-full shadow-2xl p-1 space-y-3 rounded-md">
                                   <div class="">
                                    <img class="rounded-md h-64 w-full flex justify-center items-center " src="${item.image}" alt="">
                                    </div>
                                    <div class="space-y-2">
                                          <h1 class="font-semibold">${item.name}</h1>
                                          <p class="text-[#1f2937] text-sm">${item.description}</p>
                                          <div class="mt-1 flex justify-between items-center">
                                                <p class="text-[#15803d] bg-[#dcfce7] md:px-2 md:py-1 rounded-full">${item.category}
                                                </p>
                                                <p class="font-semibold">৳<span class="text-[#15803D]">${item.price}</span></p>
                                          </div>
                                          <div
                                                class="mt-2 w-full text-center bg-[#15803D] text-white md:px-6 md:py-2 px-2 py-1 rounded-full hover:opacity-85">
                                                <button type="button" id="${item.id}" onClick="hendleClick(${item.id})" class="">Add to Cart</button>
                                          </div>
                                    </div>
                              </div>
    `;
    // display card details
    cardDiv.querySelector("h1").addEventListener("click", () => {
      const cardDetailsUrl = `https://openapi.programming-hero.com/api/plant/${item.id}`;
      fetch(cardDetailsUrl)
        .then((res) => res.json())
        .then((json) => cardDetails(json.plants));
    }); // display card details
    const cardDetails = (element) => {
      console.log(element);
      const detailsBox = document.getElementById("detailsContainer");
      // display modal cards
      detailsBox.innerHTML = `
          <div  class="bg-white   p-3  rounded-md">
                              <h1 class="font-bold text-lg">${element.name}</h1>
                              
                              <img class="rounded-md my-2 h-60 w-full  " src="${element.image}" alt="">
                              
                              <div class="space-y-1">
                                    <h2 class="text-gray-600"><span class="text-[#1f2937] font-semibold">category:
                                          </span> ${element.category}</h2>
                                    <p class="text-gray-600"><span class="text-[#1f2937] font-semibold">Price:
                                          </span>৳<span>${element.price}</span>
                                    </p>
                                    <p class="text-gray-600 "><span class="text-[#1f2937] font-semibold">Description:
                                          </span>${element.description}</p>

                              </div>
                        </div>
          `;
      document.getElementById("my_modal_5").showModal();
    };
    cardContainer.append(cardDiv);
  }
  manageSpinner(false);
};
// --------------------------------------------------------
