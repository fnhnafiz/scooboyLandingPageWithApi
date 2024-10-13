document.getElementById("post-container").innerHTML = " ";

// Load All Post in api

const loadAllPost = async (catagory) => {
  //   console.log(
  //     `https://openapi.programming-hero.com/api/retro-forum/posts${
  //       catagory ? `category=${catagory}` : ""
  //     }`
  //   );
  //   if (catagory) {
  //     console.log(
  //       `https://openapi.programming-hero.com/api/retro-forum/posts?category=${catagory}`
  //     );
  //   } else {
  //     console.log(` https://openapi.programming-hero.com/api/retro-forum/posts`);
  //   }
  //   console.log(catagory);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      catagory ? `?category=${catagory}` : ""
    }`
  );
  const data = await res.json();
  displayAllPostinCard(data.posts);
};

const displayAllPostinCard = (cards) => {
  //   console.log(cards);
  cards.forEach((card) => {
    // console.log(card);
    const postContainer = document.getElementById("post-container");
    const postCard = document.createElement("div");
    postCard.innerHTML = `
    <div
        class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl"
    >
    <div class="indicator">
        <span class="indicator-item badge ${
          card.isActive ? "bg-green-600" : "bg-red-500"
        }"></span>
        <div class="avatar">
            <div class="w-24 rounded-xl">
            <img
                src=${card.image}
            />
            </div>
        </div>
        </div>
        <div class="space-y-4 w-full">
          <div class="flex gap-4 *:opacity-60">
            <p>#   ${card.category}</p>
            <p>Author: ${card.author.name}</p>
        </div>
        <h3 class="text-2xl font-bold opacity-70">
            ${card.title}
        </h3>
        <p class="opacity-40">
        ${card.description}
        </p>
        <hr class="border border-dashed border-gray-300" />
        <div
            class="flex justify-between *:font-bold [&>*:not(:last-child)]:opacity-45"
        >
            <div class="flex gap-4">
            <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-comment-dots"></i>
                <p>${card.comment_count}</p>
            </div>
            <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-eye"></i>
                <p>${card.view_count}</p>
            </div>
            <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-clock"></i>
                <p>${card.posted_time} Min</p>
            </div>
            </div>
            <div class="opacity-100">
            <button id="addToList" onclick="readMsg('${card.description} ','${
      card.view_count
    }')" class="addToList btn btn-circle bg-green-500 btn-sm">
                <i class="fa-solid fa-envelope-open text-white"></i>
            </button>
            </div>
        </div>
        </div>
    </div>
    
    `;
    postContainer.appendChild(postCard);
  });
};

document.getElementById("searchPostsBtn").addEventListener("keyup", (e) => {
  console.log(e.target.innerText);
});

loadAllPost();

// Search post with categoryName
// const searchPostName = async (category) => {
//   const res = await fetch(
//     `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
//   );
//   const data = await res.json();
//   console.log(data);
// };
// searchPostName();

const readMsg = (des, count) => {
  //   console.log(des, count);
  const markAsReadContainer = document.getElementById("markAsReadContainer");
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
                <div class="lg:w-4/5 w-11/12">
                    <p>
                    ${des}
                    </p>
                </div>
                <div class="lg:w-1/5 w-4/12 flex justify-end">
                    <p><i class="fa-regular
                    fa-eye"></i> ${count}</p>
                </div>
            </div>
  
  `;
  markAsReadContainer.appendChild(div);
  //   displayCount();
  const markCounter = document.getElementById("markAsReadCounter").innerText;
  const counterPlus = parseInt(markCounter);
  const sum = counterPlus + 1;
  document.getElementById("markAsReadCounter").innerText = sum;
};

// const displayCount = () => {

// };

const searchHandler = () => {
  const searchText = document.getElementById("searchPosts").value;
  //   console.log(searchText);

  loadAllPost(searchText);
};

const loadLatestPost = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  // console.log(data);
  displayLatestPost(data);
};

const displayLatestPost = (post) => {
  // console.log(post);
  const latestPostContainer = document.getElementById("latest-post-container");
  post.forEach((p) => {
    const {
      cover_image = "Not available",
      profile_image = "Not available",
      title = "Not available",
      description = "Not available",
      author: {
        name = "Not available",
        designation = "Not available",
        posted_date = "Not available",
      },
    } = p;
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card pb-5 bg-base-100 shadow-2xl">
            <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
                <img
                    src=${cover_image}
                    alt="Shoes"
                    class="rounded-xl"
                />
            </figure>
            <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
                <p class="opacity-50 text-start">
                    <i class="fa-solid fa-calendar-days me-2"></i>${posted_date}
                </p>
                <h2 class="card-title text-start">${title}</h2>
                <p class="text-start">
                    ${description}
                </p>
                <div class="card-actions flex gap-5 items-center">
                    <div class="avatar">
                        <div
                            class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                        >
                            <img
                            src=${profile_image}
                            />
                        </div>
                    </div>
                <div>
                <h3 class="text-start font-extrabold">${name}</h3>
                <p class="text-start opacity-60">${designation}</p>
            </div>
        </div>
    `;
    latestPostContainer.appendChild(div);
  });
};

loadLatestPost();
