fetch('https://wu3rabjpra.execute-api.us-west-2.amazonaws.com/Test/todolist')
    .then(results => {
      return results.json();
    }).then(data => {
      print(data)
    })
