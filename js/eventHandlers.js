var handlers = handlers || {};

handlers.onload = () => {
    toDoApp.init();
}

window.onload = handlers.onload();