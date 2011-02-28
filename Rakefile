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
  
  task :ci => %w(jasmine:firefox_3_0 jasmine:firefox_3_6 jasmine:googlechrome jasmine:safari_4 jasmine:ie_6 jasmine:ie_7 jasmine:ie_8)

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

namespace :js do
  task :combine do
    secretary = Sprockets::Secretary.new(
      :source_files => ["vendor/jquery.cookie.js", "vendor/inflection.js", "src/jsmodel.js", "src/jsmodel/*.js"]
    )
    
    # Generate a Sprockets::Concatenation object from the source files
    concatenation = secretary.concatenation
    
    # Write the concatenation to disk
    concatenation.save_to("build/jsmodel.js")
    puts "generated jsmodel.js in the build directory"
  end
  
  task :compress do
    executable = File.join(File.dirname(__FILE__), 'vendor', 'closure', 'compiler.jar')
    `java -jar #{executable} --js=build/jsmodel.js --js_output_file=build/jsmodel-min.js`
    puts "generated jsmodel-min.js in the build directory"
  end
  
  task :create_build_dir do
    FileUtils.mkdir('build') unless File.exists?('build')
  end
  
  desc "Combine and compress all javascript files into jsmodel.js and jsmodel-min.js"
  task :build => [:create_build_dir, :combine, :compress]
end
