describe("Calculator", function() {
  // inject the HTML fixture for the tests
  beforeEach(function() {
    var fixture =
      '<div class="container">' +
      "<section>" +
      '<div name="listTitle" class="hide">' +
      '  <div class="flexClass titleDiv">' +
      '    <label for="list-title"></label>' +
      "  </div>" +
      "</div>" +
      '<div class="flexClass creationDiv" name="creationDiv">' +
      '  <label for="labelHeader" name="labelHeader"></label>' +
      '  <input type="text" name="inputVal" />' +
      '  <input type="text" name="taskExpiry" placeholder="MM/DD/YYYY" class="hide" />' +
      '  <button name="create"></button>' +
      "</div>" +
      "</section>" +
      '<section class="taskSection">' +
      '  <div class="todo-list box hide">' +
      "    <h2>To-Do Tasks</h2>" +
      "    <ul></ul>" +
      "  </div>" +
      '  <div class="complete-list box hide">' +
      "    <h2>Completed Tasks</h2>" +
      "    <ul></ul>" +
      "  </div>" +
      "</section>" +
      "</div>";

    document.body.insertAdjacentHTML("afterbegin", fixture);
  });

  // remove the html fixture from the DOM
  afterEach(function() {});

  // call the init function of calculator to register DOM elements
  beforeEach(function() {
    window.toDoApp.init();
  });

  
  it("should render component in the object value", function() {
    expect(window.toDoApp.dragEl).toBeNull();
  });
});
