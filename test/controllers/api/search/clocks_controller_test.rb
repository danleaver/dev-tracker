require 'test_helper'

class Api::Search::ClocksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_search_clocks_index_url
    assert_response :success
  end

end
