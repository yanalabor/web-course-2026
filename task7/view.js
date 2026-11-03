export class PostView {
    constructor() {
        this.postsContainer = document.getElementById("postsContainer");
        this.searchInput = document.getElementById("searchInput");
        this.loadingEl = document.getElementById("loading");
        this.errorEl = document.getElementById("error");
        this.endMessageEl = document.getElementById("endMessage");
    }

    renderPosts(posts) {
        this.postsContainer.innerHTML = posts.map(post => `
            <div class="post-card">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <small>Автор ID: ${post.userId}</small>
            </div>
        `).join("");
    }

    showLoading(show) {
        this.loadingEl.style.display = show ? "block" : "none";
    }

    showError(message) {
        this.errorEl.textContent = message;
        this.errorEl.style.display = message ? "block" : "none";
    }

    showEndMessage(show) {
        this.endMessageEl.style.display = show ? "block" : "none";
    }

    bindSearch(handler) {
        this.searchInput.addEventListener("input", (e) => handler(e.target.value));
    }

    bindScroll(handler) {
        window.addEventListener("scroll", () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
                handler();
            }
        });
    }
}