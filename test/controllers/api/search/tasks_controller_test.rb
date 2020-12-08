require 'test_helper'

class Api::Search::TasksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_search_tasks_index_url
    assert_response :success
  end

end
