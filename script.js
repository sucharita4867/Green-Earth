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
      console.log(url);
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
        // console.log(item);
        const card = document.createElement("div");
        card.innerHTML = `
    
    <div class="bg-white md:p-3 p-1 space-y-3 rounded-md">
                                    <img class="rounded-md" src="${cardItem.image}" alt="">
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
                                                <button class="">Add to Cart</button>
                                          </div>
                                    </div>
                              </div>
    `;
        cardBox.append(card);
      });
    };

    categoriesContainer.append(categoriesDiv);
  }
};

const cardUrl = "https://openapi.programming-hero.com/api/plants";
fetch(cardUrl)
  .then((res) => res.json())
  .then((data) => cards(data.plants));
const cards = (cardItems) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  for (let item of cardItems) {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
    
    <div class="bg-white md:p-3 p-1 space-y-3 rounded-md">
                                    <img class="rounded-md" src="${item.image}" alt="">
                                    <div class="space-y-2">
                                          <h1 class="font-semibold">${item.name}</h1>
                                          <p class="text-[#1f2937] text-sm">${item.description}</p>
                                          <div class="flex justify-between items-center">
                                                <p class="text-[#15803d] bg-[#dcfce7] md:px-2 md:py-1 rounded-full">${item.category}
                                                </p>
                                                <p class="font-semibold">${item.price}</p>
                                          </div>
                                          <div
                                                class="w-full text-center bg-[#15803D] text-white md:px-6 md:py-3 px-2 py-1 rounded-full hover:opacity-85">
                                                <button class="">Add to Cart</button>
                                          </div>
                                    </div>
                              </div>
    `;

    cardContainer.append(cardDiv);
  }
};
