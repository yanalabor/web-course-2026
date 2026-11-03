import { PostModel } from "./model.js";
import { PostView } from "./view.js";

class PostController {
    constructor() {
        this.model = new PostModel();
        this.view = new PostView();
        this.debounceTimer = null;

        this.init();
    }

    async init() {
        this.view.bindSearch(this.handleSearch.bind(this));
        this.view.bindScroll(this.handleScroll.bind(this));
        await this.loadMorePosts();
    }

    async loadMorePosts() {
        if (this.model.loading || !this.model.hasMore) return;

        this.view.showLoading(true);
        this.view.showError("");

        try {
            await this.model.fetchPosts();
            this.view.renderPosts(this.model.getFilteredPosts());

            if (!this.model.hasMore) {
                this.view.showEndMessage(true);
            }
        } catch (error) {
            this.view.showError(error.message);
        } finally {
            this.view.showLoading(false);
        }
    }

    handleScroll() {
        this.loadMorePosts();
    }

    handleSearch(query) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.model.setSearchQuery(query);
            this.view.renderPosts(this.model.getFilteredPosts());
        }, 300);
    }
}

new PostController();