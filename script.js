// function to create a post card using the new design
function createPostCard(post) {
    const card = document.createElement("a");
    card.href = post.url;
    card.className = "post-card";

    card.innerHTML = `
        <div class="post-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <div class="arrow-icon">↗</div>
            <div class="post-title-overlay">
                <h3>${post.title}</h3>
            </div>
        </div>
    `;

    return card;
}

const postsPerPage = 6;
let currentPage = 0;

function loadPosts() {
    const container = document.getElementById("posts-container");
    if (!container || !window.blogPosts) return;

    const start = currentPage * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = window.blogPosts.slice(start, end);

    paginatedPosts.forEach(post => {
        container.appendChild(createPostCard(post));
    });

    currentPage++;

    // Hide loader if no more posts
    if (currentPage * postsPerPage >= window.blogPosts.length) {
        const loader = document.getElementById("infinite-loader");
        if (loader) loader.style.display = "none";
    }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    loadPosts();

    // Simple infinite scroll listener
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            if (currentPage * postsPerPage < window.blogPosts.length) {
                loadPosts();
            }
        }
    });
});

