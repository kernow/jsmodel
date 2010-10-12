require 'rubygems'
require 'bundler'
Bundler.require

namespace :jasmine do
  require 'jasmine'

  desc "Run continuous integration tests"
  require "spec"
  require 'spec/rake/spectask'
  Spec::Rake::SpecTask.new(:saucelabs) do |t|
    t.spec_opts  = ["--color", "--format", "progress"]
    t.verbose    = true
    t.spec_files = ['spec/javascripts/support/jasmine_runner.rb']
  end
  
  YAML.load_file( File.join(File.dirname(__FILE__), 'config', 'selenium.yml') ).each_key do |browser|
    desc browser
    task browser do
      ENV['JASMINE_BROWSER'] = browser
      Rake::Task["jasmine:saucelabs"].reenable
      Rake::Task["jasmine:saucelabs"].invoke
    end
  end
  
  # Saucelabs use Safari 4.0.4 which has a bug in it, we need 4.0.5 as of 28/06/10
  # task :ci => ["jasmine:firefox_3_0", "jasmine:firefox_3_5", "jasmine:firefox_3_6", "jasmine:googlechrome", "jasmine:safari_3", "jasmine:safari_4", "jasmine:ie_7", "jasmine:ie_8"]
  task :ci => ["jasmine:firefox_3_0", "jasmine:firefox_3_5", "jasmine:firefox_3_6", "jasmine:googlechrome", "jasmine:safari_3"]

  task :server do
    port = ENV['PORT'] || 8888
    require 'spec/javascripts/support/jasmine_config'
  
    puts "your tests are here:"
    puts "  http://localhost:#{port}/run.html"

    Jasmine::Config.new.start_server port
  end
end

desc "Run specs via server"
task :jasmine => ['jasmine:server']