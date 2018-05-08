const queryTVMazeAPI = (query, callback) => {
      // fill url in with a URL based on the example at:
      // https://www.tvmaze.com/api#show-search
      // replace a part of the example URL with the user input, which you can 
      // assume will be the parameter of this function, `query`
      const url = 'http://api.tvmaze.com/search/shows?q='

      fetch(url + query)
            .then((response) => {
                  if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                              response.status);
                        return;
                  }

                  // Examine the text in the response
                  response.json().then(function(data) {
                        callback(data); //make sure to return something

                  });
            })
            .catch((err) => {
                  console.log('Fetch Error :-S', err);
            });

}

const queryTVMazeAPIFull = (callback) => {
      // fill url in with a URL based on the example at:
      // https://www.tvmaze.com/api#show-search
      // replace a part of the example URL with the user input, which you can 
      // assume will be the parameter of this function, `query`
      const url = 'http://api.tvmaze.com/shows?page=1'

      fetch(url)
            .then((response) => {
                  if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                              response.status);
                        return;
                  }

                  // Examine the text in the response
                  response.json().then(function(data) {
                        callback(data); //make sure to return something

                  });
            })
            .catch((err) => {
                  console.log('Fetch Error :-S', err);
            });

}


module.exports = {
      queryTVMazeAPI: queryTVMazeAPI,
      queryTVMazeAPIFull: queryTVMazeAPIFull
      }