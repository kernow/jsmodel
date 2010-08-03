//You may load required files here, or create test-runner-wide environment settings.

afterEach(function(){
  
  // TODO replace with method from the Sotrage engine
  // $.each(window.localStorage, function(i){window.localStorage.removeItem(window.localStorage.key(i)); });
  
  $(Mock.mocked_objects).each(function(i, obj){
    expect(obj).verify_expectations();
  });
});