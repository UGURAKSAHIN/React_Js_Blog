import axios from "axios";

// Ensure base URL is properly defined
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Centralized axios instance (allows interceptors, headers, etc.)
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s timeout for robustness
});

class BlogCategoryApiService {
  // ---------------------------------------------
  // CATEGORY SPEED
  // ---------------------------------------------
  async categoryApiSpeedData(data) {
    return apiClient.get(`/blog/category/api/v1/speed/${data}`);
  }

  // ---------------------------------------------
  // DELETE ALL
  // ---------------------------------------------
  async categoryApiAllDelete() {
    return apiClient.delete(`/blog/category/api/v1/delete/all`);
  }

  // ---------------------------------------------
  // CREATE CATEGORY
  // ---------------------------------------------
  async objectApiCreate(categoryDto) {
    return apiClient.post(`/blog/category/api/v1/create`, categoryDto);
  }

  // ---------------------------------------------
  // LIST ALL CATEGORIES
  // ---------------------------------------------
  async objectApiList() {
    return apiClient.get(`/blog/category/api/v1/list`);
  }

  // ---------------------------------------------
  // FIND CATEGORY BY ID
  // ---------------------------------------------
  async objectApiFindById(id) {
    return apiClient.get(`/blog/category/api/v1/find/${id}`);
  }

  // ---------------------------------------------
  // UPDATE CATEGORY
  // ---------------------------------------------
  async objectApiUpdate(id, categoryDto) {
    return apiClient.put(`/blog/category/api/v1/update/${id}`, categoryDto);
  }

  // ---------------------------------------------
  // DELETE CATEGORY
  // ---------------------------------------------
  async objectApiDelete(id) {
    return apiClient.delete(`/blog/category/api/v1/delete/${id}`);
  }
}

// Export a singleton instance
// eslint-disable-next-line import/no-anonymous-default-export
export default new BlogCategoryApiService();
