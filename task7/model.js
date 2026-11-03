export class PostModel {
    constructor() {
        this.allPosts = [];
        this.page = 1;
        this.limit = 10;
        this.loading = false;
        this.hasMore = true;
        this.searchQuery = "";
    }

    async fetchPosts() {
        if (this.loading || !this.hasMore) return;
        this.loading = true;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}`);
            if (!response.ok) throw new Error("Ошибка сети при загрузке данных");
            
            const data = await response.json();
            if (data.length < this.limit) this.hasMore = false;
            
            this.allPosts.push(...data);
            this.page++;
        } catch (error) {
            throw error;
        } finally {
            this.loading = false;
        }
    }

    setSearchQuery(query) {
        this.searchQuery = query.toLowerCase().trim();
    }

    getFilteredPosts() {
        if (!this.searchQuery) return this.allPosts;
        return this.allPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery));
    }
}