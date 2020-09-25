Rails.application.routes.draw do
  namespace :api do
    namespace :search do
      resources :clocks
    end
    resources :contacts do
      resources :visits
    end
    resources :clocks do
    end
    get '/search_range', to: 'clocks#search_range'
  end
end
