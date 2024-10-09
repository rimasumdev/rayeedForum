const loadAllPost = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/posts'
  );
  const data = await res.json();
  const allPost = data.posts;
  // console.log(allPost);
  displayPost(allPost);
};
const loadLatestPost = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
  );
  const data = await res.json();
  const allPost = data;
  // console.log(allPost);
  displayLatestPost(allPost);
};
const postSearchByQuery = async (category, check) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
  );
  const data = await res.json();
  const allPost = data.posts;
  // console.log(allPost, category, check);
  displayPost(allPost);
};
const searchPostsByCategory = () => {
  const searchInput = document.getElementById('search-input');

  if (searchInput.value.trim() === '') {
    console.log('Empty');
    searchInput.focus();
  } else {
    // console.log(searchInput.value);
    postSearchByQuery(searchInput.value, 'clicked');
  }
};

const enableDisableButton = () => {
  const btnSearch = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');
  // searchInput.addEventListener('input', () => {
  //   if (searchInput.value.trim() === '') {
  //     btnSearch.setAttribute('disabled', '');
  //   } else {
  //     btnSearch.removeAttribute('disabled');
  //   }
  // });
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      searchPostsByCategory();
      const searchInput = document.getElementById('search-input');
      searchInput.blur();
    }
  });
};

// Display allPost
const displayPost = (post) => {
  const discussContainer = document.getElementById('discuss-container');
  const noPostsContainer = document.getElementById('no-post');
  // console.log(post.length, noPostsContainer);
  if (post.length > 0) {
    // noPostsContainer.setAttribute("class", "hidden");
    // noPostsContainer.classList.add("hidden");
    discussContainer.innerHTML = '';
    post.forEach((post) => {
      let isActiveStatus = '';
      if (post.isActive) {
        isActiveStatus = 'bg-success';
      } else {
        isActiveStatus = 'bg-neutral-content';
      }
      const div = document.createElement('div');
      div.innerHTML = `<div
              class="flex flex-col md:flex md:flex-row gap-6 hover:bg-[#F2F2FF] py-10 px-4 md:px-8 rounded-lg border hover:border-[#4A00FF] border-opacity-30"
            >
              <div class="avatar indicator">
                <span
                  class="indicator-item badge badge-sm ${isActiveStatus}"
                ></span>
                <div class="h-20 w-20 rounded-lg">
                  <img
                    alt="Tailwind CSS examples"
                    src="${post.image}"
                  />
                </div>
              </div>
              <div
                class="post-content w-full space-y-4 flex flex-col justify-between"
              >
                <div
                  class="flex space-x-8 font-medium text-gray-500 justify-between md:justify-start"
                >
                  <p class="category">#${post.category}</p>
                  <p class="author">Author: ${post.author?.name}</p>
                </div>
                <div class="space-y-4">
                  <h3 class="text-lg md:text-xl font-bold text-justify">
                    ${post.title}
                  </h3>
                  <p class="text-justify">
                    ${post.description}
                  </p>
                  <hr class="border-t-1 border-dashed border-gray-300" />

                  <div class="info flex justify-between items-center">
                    <div class="flex item-center gap-2 md:gap-6">
                      <div class="flex gap-2 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          class="stroke-current"
                        >
                          <path
                            d="M9.33333 10.5H18.6667M9.33333 15.1666H16.3333M10.5 21H7C6.07174 21 5.1815 20.6312 4.52513 19.9748C3.86875 19.3185 3.5 18.4282 3.5 17.5V8.16663C3.5 7.23837 3.86875 6.34813 4.52513 5.69175C5.1815 5.03538 6.07174 4.66663 7 4.66663H21C21.9283 4.66663 22.8185 5.03538 23.4749 5.69175C24.1313 6.34813 24.5 7.23837 24.5 8.16663V17.5C24.5 18.4282 24.1313 19.3185 23.4749 19.9748C22.8185 20.6312 21.9283 21 21 21H17.5L14 24.5L10.5 21Z"
                            stroke="text-gray-500"
                            stroke-opacity="0.6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <p>${post.comment_count}</p>
                      </div>
                      <div class="flex gap-2 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          fill="none"
                          class="stroke-current"
                        >
                          <path
                            d="M11.6667 14C11.6667 14.6188 11.9125 15.2123 12.3501 15.6499C12.7877 16.0875 13.3812 16.3333 14 16.3333C14.6188 16.3333 15.2123 16.0875 15.6499 15.6499C16.0875 15.2123 16.3333 14.6188 16.3333 14C16.3333 13.3812 16.0875 12.7877 15.6499 12.3501C15.2123 11.9125 14.6188 11.6667 14 11.6667C13.3812 11.6667 12.7877 11.9125 12.3501 12.3501C11.9125 12.7877 11.6667 13.3812 11.6667 14Z"
                            stroke="text-gray-500"
                            stroke-opacity="0.6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M24.5 14C21.7 18.6667 18.2 21 14 21C9.8 21 6.3 18.6667 3.5 14C6.3 9.33333 9.8 7 14 7C18.2 7 21.7 9.33333 24.5 14Z"
                            stroke="text-gray-500"
                            stroke-opacity="0.6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <p>${post.view_count}</p>
                      </div>
                      <div class="flex gap-2 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          class="stroke-current"
                        >
                          <path
                            d="M9.91667 14H14V8.16667M3.5 14C3.5 15.3789 3.77159 16.7443 4.29926 18.0182C4.82694 19.2921 5.60036 20.4496 6.57538 21.4246C7.55039 22.3996 8.70791 23.1731 9.98182 23.7007C11.2557 24.2284 12.6211 24.5 14 24.5C15.3789 24.5 16.7443 24.2284 18.0182 23.7007C19.2921 23.1731 20.4496 22.3996 21.4246 21.4246C22.3996 20.4496 23.1731 19.2921 23.7007 18.0182C24.2284 16.7443 24.5 15.3789 24.5 14C24.5 12.6211 24.2284 11.2557 23.7007 9.98182C23.1731 8.70791 22.3996 7.55039 21.4246 6.57538C20.4496 5.60036 19.2921 4.82694 18.0182 4.29927C16.7443 3.77159 15.3789 3.5 14 3.5C12.6211 3.5 11.2557 3.77159 9.98182 4.29927C8.70791 4.82694 7.55039 5.60036 6.57538 6.57538C5.60036 7.55039 4.82694 8.70791 4.29926 9.98182C3.77159 11.2557 3.5 12.6211 3.5 14Z"
                            stroke="text-gray-500"
                            stroke-opacity="0.6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <p>${post.posted_time}</p>
                      </div>
                    </div>
                    <button onclick="handleMarkAsRead('${post.title.replace(
                      /'/g,
                      "\\'"
                    )}', '${post.view_count}', this)"

                      class="text-white bg-green-500 hover:bg-green-600 p-3 rounded-full flex justify-center items-center transition-colors duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"'
                        height="16"
                        fill="currentColor"
                        class="bi bi-envelope-open-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.314l6.709 3.932L8 8.928l1.291.718L16 5.714V5.4a2 2 0 0 0-1.059-1.765zM16 6.873l-5.693 3.337L16 13.372v-6.5Zm-.059 7.611L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516M0 13.373l5.693-3.163L0 6.873z"
                        />
                      </svg>
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
      discussContainer.appendChild(div);
    });
  } else {
    discussContainer.innerHTML = `
            <div
              class="flex flex-col md:flex md:flex-row justify-center items-center py-28 gap-6 bg-[#F2F2FF] px-4 md:px-8 rounded-lg border border-[#4A00FF] border-opacity-30"
            >
              <p>No Post Found!</p>
            </div>
    `;
    // console.log("No Data Found!");
  }
};

const handleMarkAsRead = (title, views, button) => {
  // console.log(event, title, views);
  button.classList.remove('bg-green-500', 'hover:bg-green-600');
  button.classList.add('bg-gray-400');
  button.disabled = true;
  console.log(button);
  const markAsReadContainer = document.getElementById('markasread-container');
  const statusTitle = document.getElementById('status-title');
  statusTitle.setAttribute('class', 'font-bold');
  const readCount = document.getElementById('read-count');
  const currentReadCount = parseInt(readCount.textContent);
  readCount.textContent = currentReadCount + 1;
  const showMarkAsRead = document.createElement('div');
  showMarkAsRead.innerHTML = `
  <div class="flex justify-between bg-white px-4 py-2 rounded-lg items-center">
    <h3 class="text-sm font-medium">
                ${title}
              </h3>
              <div class="flex gap-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  fill="none"
                  class="stroke-current"
                >
                  <path
                    d="M11.6667 14C11.6667 14.6188 11.9125 15.2123 12.3501 15.6499C12.7877 16.0875 13.3812 16.3333 14 16.3333C14.6188 16.3333 15.2123 16.0875 15.6499 15.6499C16.0875 15.2123 16.3333 14.6188 16.3333 14C16.3333 13.3812 16.0875 12.7877 15.6499 12.3501C15.2123 11.9125 14.6188 11.6667 14 11.6667C13.3812 11.6667 12.7877 11.9125 12.3501 12.3501C11.9125 12.7877 11.6667 13.3812 11.6667 14Z"
                    stroke="text-gray-500"
                    stroke-opacity="0.6"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M24.5 14C21.7 18.6667 18.2 21 14 21C9.8 21 6.3 18.6667 3.5 14C6.3 9.33333 9.8 7 14 7C18.2 7 21.7 9.33333 24.5 14Z"
                    stroke="text-gray-500"
                    stroke-opacity="0.6"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>${views}</p>
              </div>`;
  markAsReadContainer.appendChild(showMarkAsRead);
};

const displayLatestPost = (post) => {
  const latestPostContainer = document.getElementById('latest-post-container');
  post.forEach((post) => {
    const postContainer = document.createElement('div');
    postContainer.classList = 'p-4 md:w-1/3';
    postContainer.innerHTML = `
    <div
                  class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden pb-4"
                >
                  <div class="m-5 border rounded-lg overflow-hidden">
                    <img
                      class="lg:h-48 md:h-36 w-full object-cover object-center"
                      src="${post.cover_image}"
                      alt="blog"
                    />
                  </div>

                  <div class="px-5">
                    <div class="flex items-center gap-2 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_29_1881)">
                          <path
                            d="M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z"
                            stroke="#12132D"
                            stroke-opacity="0.6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16 3V7"
                            stroke="#12132D"
                            stroke-opacity="0.6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8 3V7"
                            stroke="#12132D"
                            stroke-opacity="0.6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4 11H20"
                            stroke="#12132D"
                            stroke-opacity="0.6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16Z"
                            stroke="#12132D"
                            stroke-opacity="0.6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_29_1881">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <h2
                        class="tracking-widest text-base title-font font-medium text-gray-400"
                      >
                        ${post.author?.posted_date || 'No publish date'} 
                      </h2>
                    </div>

                    <h1
                      class="title-font text-lg font-medium text-gray-900 mb-2"
                    >
                      ${post.title}
                    </h1>
                    <p class="leading-relaxed mb-3">
                      ${post.description}
                    </p>
                    <div class="flex items-center gap-x-3 mt-5">
                      <div class="avatar">
                        <div class="w-14 rounded-full">
                          <img
                            src="${post.profile_image}"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 class="font-bold">${post.author?.name}</h4>
                        <p>${post.author?.designation || 'Unknown'}</p>
                      </div>
                    </div>
                  </div>
                </div>
    `;
    latestPostContainer.appendChild(postContainer);
  });
};

enableDisableButton();
loadAllPost();
loadLatestPost();
