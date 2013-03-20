require "selenium-webdriver"
require "rspec"
require "spec_helper"
include RSpec::Expectations

describe "CanLogin" do

  before(:each) do
    @driver = Selenium::WebDriver.for :firefox
    @base_url = RSpec.configuration.base_url
    @dev_url = RSpec.configuration.dev_url
    @accept_next_alert = true
    @driver.manage.timeouts.implicit_wait = 30
    @verification_errors = []
  end
  
  after(:each) do
    @driver.quit
    @verification_errors.should == []
  end
  
  it "test_can_login" do
    @driver.get(@base_url + @dev_url)
    @driver.find_element(:css, "input[name=\"username\"]").clear
    @driver.find_element(:css, "input[name=\"username\"]").send_keys "admin"
    @driver.find_element(:css, "button.button.actionButton").click
    verify { element_present?(:id, "pageTitle").should be_true }
  end
  
  def element_present?(how, what)
    @driver.find_element(how, what)
    true
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  end
  
  def verify(&blk)
    yield
  rescue ExpectationNotMetError => ex
    @verification_errors << ex
  end
  
  def close_alert_and_get_its_text(how, what)
    alert = @driver.switch_to().alert()
    if (@accept_next_alert) then
      alert.accept()
    else
      alert.dismiss()
    end
    alert.text
  ensure
    @accept_next_alert = true
  end
end
