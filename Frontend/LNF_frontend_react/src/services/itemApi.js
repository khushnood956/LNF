import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/item';
// const API_BASE_URL = 'https://0c85w1z0-8080.asse.devtunnels.ms/item';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle standard API response wrapper
apiClient.interceptors.response.use(
  (response) => {
    // Extract data from the standard wrapper
    return response.data;
  },
  (error) => {
    // Handle error responses
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Network error occurred',
      data: null,
    };
  }
);

// API service functions
export const itemApi = {
  /**
   * Get all items
   * @returns Promise<{success: boolean, message: string, data: Item[]}>
   */
  getAllItems: async () => {
    return await apiClient.get('/');
  },

  /**
   * Get item by ID
   * @param {number} id - Item ID
   * @returns Promise<{success: boolean, message: string, data: Item}>
   */
  getItemById: async (id) => {
    return await apiClient.get(`/show/${id}`);
  },

  /**
   * Create new item
   * @param {Object} itemData - Item data (itemName, description, ownerName, contactNo, found)
   * @returns Promise<{success: boolean, message: string, data: Item}>
   */
  createItem: async (itemData) => {
    return await apiClient.post('/add', itemData);
  },

  /**
   * Partial update (PATCH) - only send changed fields
   * @param {number} id - Item ID
   * @param {Object} updates - Only the fields to update
   * @returns Promise<{success: boolean, message: string, data: Item}>
   */
  updateItem: async (id, updates) => {
    return await apiClient.patch(`/update/${id}`, updates);
  },

  /**
   * Delete item
   * @param {number} id - Item ID
   * @returns Promise<{success: boolean, message: string, data: null}>
   */
  deleteItem: async (id) => {
    return await apiClient.delete(`/delete/${id}`);
  },

  /**
   * Update found status
   * @param {number} id - Item ID
   * @returns Promise<{success: boolean, message: string, data: null}>
   */
  updateFoundStatus: async (id) => {
    return await apiClient.patch(`/found/${id}`);
  },
};

export default itemApi;
