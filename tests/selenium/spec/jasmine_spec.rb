require "selenium-webdriver"
require "rspec"
require "spec_helper"
include RSpec::Expectations

describe "JasmineSpec" do

  before(:each) do
    @driver = Selenium::WebDriver.for :firefox
    @base_url = RSpec.configuration.base_url
    @accept_next_alert = true
    @driver.manage.timeouts.implicit_wait = 30
    @verification_errors = []
  end
  
  after(:each) do
    @driver.quit
    @verification_errors.should == []
  end
  
  it "test_jasmine_spec" do
    @driver.get(@base_url + RSpec.configuration.dev_argos_tests)
    !60.times{ break if (element_present?(:css, "span.duration") rescue false); sleep 1 }
    !60.times{ break if (element_present?(:css, "span.passingAlert.bar") rescue false); sleep 1 }
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
