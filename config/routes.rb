Rails.application.routes.draw do
  namespace :api do
    resources :contacts do
      resources :visits
    end
    resources :clocks
  end
end
