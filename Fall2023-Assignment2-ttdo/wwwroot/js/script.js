function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '309290b7c24f43e4af89c2f0be560e6a'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog({
           
                width: 1000,
                height: 450,
                title: 'Search Results for \"' + $('#query').val() + '\"',
                position: { my: "center bottom", at: "center bottom", of: "#buttons-container", collision: "none" }
            });
        })
        .fail(function () {
            alert('error');
        });
}

$('#searchButton').click(function () {
    apiSearch(); 
}); 
