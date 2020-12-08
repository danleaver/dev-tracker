Rails.application.routes.draw do
  namespace :api do
    namespace :search do
      resources :cards
    end
    resources :contacts do
      resources :visits
    end
    resources :cards do
      resources :project_cards
    end
    resources :projects
    get '/search_range', to: 'cards#search_range'
  end
end
