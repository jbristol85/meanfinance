/* global $ NEWSAPIKEY */

angular.module('cdfinance').controller("MainController", MainController);

function MainController() {
    var vm = this;
    // vm.title = "This is the title";

    $(document).ready(function() {
                $.ajax({
                    method: "GET",
                    url: "https://newsapi.org/v2/everything",
                    data: { 
                        q: "nasdaq", 
                        sortBy: "relevancy", 
                        language: 'en', 
                        sources: "business-insider, financial-times, the-new-york-times, associated-press, bloomberg, cnn, google-news, the-washington-post, the-wallstreet-journal, usa-today,abc-news, cbs-news, cnbc, fortune, nbc-news",
                        apiKey: "449576eacc104279a34b9ab1d5c3cc5e"
                    },
                    success: function(response) {

                        if (response.status === "ok") {
                            // console.log("newsapi", response);
                            vm.response = response;
                            vm.articles = response.articles;
                         
                        }
                    }

                });
            });
}
