require 'rubygems'
require 'bundler'
Bundler.require

load 'jasmine/tasks/jasmine.rake'
load 'sauce/jasmine/jasmine-sauce.rake'

namespace :js do
  task :combine do
    secretary = Sprockets::Secretary.new(
      :source_files => ["vendor/inflection.js", "src/jsmodel.js", "src/jsmodel/**/*.js"]
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
