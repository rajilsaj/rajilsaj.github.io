function createPostCard(post) {
const card = document.createElement("article");
card.className = "post-card";

card.innerHTML = `
<img class="post-image"
    src="https://picsum.photos/seed/${post.id}/600/400"
    alt="Post image">

<div class="post-content">
    <h3 class="post-title">${post.title}</h3>
    <div class="post-meta">Posted on ${post.date}</div>
    <p class="post-excerpt">${post.excerpt}</p>
    <a href="${post.url}" class="post-link">Read more →</a>
</div>
`;

return card;
}
