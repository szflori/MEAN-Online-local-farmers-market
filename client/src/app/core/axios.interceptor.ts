import axios from 'axios';
import { LoadingService } from '../shared/loading/loading.service';

let activeRequests = 0;

export function setupAxiosInterceptors(loadingService: LoadingService) {
  axios.interceptors.request.use(
    (config) => {
      activeRequests++;
      loadingService.show();
      return config;
    },
    (error) => {
      activeRequests = Math.max(0, activeRequests - 1);
      if (activeRequests === 0) loadingService.hide();
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      activeRequests = Math.max(0, activeRequests - 1);
      if (activeRequests === 0) loadingService.hide();
      return response;
    },
    (error) => {
      activeRequests = Math.max(0, activeRequests - 1);
      if (activeRequests === 0) loadingService.hide();
      return Promise.reject(error);
    }
  );
}
