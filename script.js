// const cardContainer = document.getElementById('card-container')

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
      // console.log(categoryBtn);
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
    
    <div  class="bg-white md:p-3 p-1 space-y-3 rounded-md">
                                    <div class="border border-black">
                                    <img class="rounded-md h-64 w-full flex justify-center items-center border border-black" src="${cardItem.image}" alt="">
                                    </div>
                                    <div class="space-y-2">
                                          <h1 class="font-semibold">${cardItem.name}</h1>
                                          <p class="text-[#1f2937] text-sm">${cardItem.description}</p>
                                          <div class="flex justify-between items-center">
                                                <p class="text-[#15803d] bg-[#dcfce7] md:px-2 md:py-1 rounded-full">${cardItem.category}
                                                </p>
                                                <p class="font-semibold">${cardItem.price}</p>
                                          </div>
                                          <div
                                                class="w-full text-center bg-[#15803D] text-white md:px-6 md:py-3 px-2 py-1 rounded-full hover:opacity-85">
                                                <button id="card-btn" class="">Add to Cart</button>
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
        const cardDetails = (element) => {
          console.log(element);
          const detailsBox = document.getElementById("detailsContainer");
          // categorys modal cards
          detailsBox.innerHTML = `
          <div  class="bg-white  p-3  rounded-md">
                              <h1 class="font-bold text-lg">${element.name}</h1>
                              <div class="border border-black w-full">
                              <img class="rounded-md my-2 h-60  border border-black" src="${element.image}" alt="">
                              </div>
                              <div class="space-y-1">
                                    <h2 class="text-gray-600"><span class="text-[#1f2937] font-semibold">category:
                                          </span> ${element.category}</h2>
                                    <p class="text-gray-600"><span class="text-[#1f2937] font-semibold">Price:
                                          </span>${element.price}
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

const hendleClick = (id) => {
  // alert(`${id}`);
  fetch(` https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => plant(data.plants));
  const plant = (item) => {
    alert(`${item.name} has been added to the card.`);
    // console.log(item);
    let clickOk = `${item}`;
    if (clickOk) {
      const sidebarContainer = document.getElementById("side-card-container");
      const newCard = document.createElement("div");
      newCard.innerHTML = `
      <div class="flex mt-2 p-3 justify-between items-center bg-[#cff0dc98]">
                                          <div>
                                                <h1 class="font-bold">${item.name}</h1>
                                                <p class="text-[#1f2937]">${item.price}</p>
                                          </div>
                                          <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                      stroke-width="1.5" stroke="currentColor" class="size-6 font-bold text-red-700">
                                                      <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M6 18 18 6M6 6l12 12" />
                                                </svg>

                                          </div>
                                    </div>
      `;
      sidebarContainer.append(newCard);
    }
  };
};

const cardUrl = "https://openapi.programming-hero.com/api/plants";
fetch(cardUrl)
  .then((res) => res.json())
  .then((data) => cards(data.plants));
const cards = (cardItems) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  for (let item of cardItems) {
    // console.log(item);
    const cardDiv = document.createElement("div");
    // displays cards
    cardDiv.innerHTML = `
    
    <div id="card-container" class="bg-white md:p-3    p-1 space-y-3 rounded-md">
                                   <div class="border border-black">
                                    <img class="rounded-md h-64 w-full flex justify-center items-center border border-black" src="${item.image}" alt="">
                                    </div>
                                    <div class="space-y-2">
                                          <h1 class="font-semibold">${item.name}</h1>
                                          <p class="text-[#1f2937] text-sm">${item.description}</p>
                                          <div class="mt-1 flex justify-between items-center">
                                                <p class="text-[#15803d] bg-[#dcfce7] md:px-2 md:py-1 rounded-full">${item.category}
                                                </p>
                                                <p class="font-semibold">${item.price}</p>
                                          </div>
                                          <div
                                                class="mt-2 w-full text-center bg-[#15803D] text-white md:px-6 md:py-2 px-2 py-1 rounded-full hover:opacity-85">
                                                <button id="${item.id}" onClick="hendleClick(${item.id})" class="">Add to Cart</button>
                                          </div>
                                    </div>
                              </div>
    `;
    cardContainer.append(cardDiv);
  }
  // const cardBtn = document
  //   .querySelector(`#${item.id}`)
  //   .addEventListener("click", () => {
  //     console.log("btn click");
  //   });
};
// --------------------------------------------------------
