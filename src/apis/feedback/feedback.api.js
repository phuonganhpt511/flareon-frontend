import http from "../http";

export const getFeedbackByDish = (dishId) => {
  return http.get(`/feedback/dish/${dishId}`);
};

export const createFeedback = (data) => {
  return http.post(`/feedback`, data);
};
