require "selenium-webdriver"
require "rspec"
require "spec_helper"
include RSpec::Expectations

describe "Defect13091224" do

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
  
  it "test_defect13091224" do
    # Open Mobile build
    @driver.get(@base_url + @dev_url)
    # Login as Lee
    @driver.find_element(:css, "input[name=\"username\"]").clear
    @driver.find_element(:css, "input[name=\"username\"]").send_keys "lee"
    @driver.find_element(:css, "button.button.actionButton").click
    !60.times{ break if (element_present?(:css, "div.list-item-content > h3") rescue false); sleep 1 }
    # Click Add Account/ Contact button
    @driver.find_element(:css, "div.list-item-content > h3").click
    # Validate title of 'Add Account / Contact'
    verify { element_present?(:xpath, ".//*[@id='pageTitle']").should be_true }
    # Wait for element present - Account Type
    !60.times{ break if (element_present?(:css, "#Mobile_SalesLogix_Fields_PicklistField_1 > input[type=\"text\"]") rescue false); sleep 1 }
    # Verify Account Type preset to Prospect
    !60.times{ break if (@driver.find_element(:css, "#Mobile_SalesLogix_Fields_PicklistField_1 > input[type=\"text\"]").attribute("value") == "Prospect" rescue false); sleep 1 }
    # Wait for element present - Account Status
    !60.times{ break if (element_present?(:css, "#Mobile_SalesLogix_Fields_PicklistField_3 > input[type=\"text\"]") rescue false); sleep 1 }
    # Verify Account Status preset to Active
    !60.times{ break if (@driver.find_element(:css, "#Mobile_SalesLogix_Fields_PicklistField_3 > input[type=\"text\"]").attribute("value") == "Active" rescue false); sleep 1 }
    # Warning: verifyTextPresent may require manual changes
    verify { @driver.find_element(:css, "BODY").text.should =~ /^[\s\S]*Log Out[\s\S]*$/ }
    # Log Out ...
    @driver.find_element(:xpath, "//div[@id='Mobile_SalesLogix_Views_FooterToolbar_0']/div/button[4]").click
    #close_alert_and_get_its_text().should =~ /^Are you sure you want to log out[\s\S]$/
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
