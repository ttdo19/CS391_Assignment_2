let darkModeOn = 1;

function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $('#searchResults').css('visibility', 'visible');

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

function getCurrentTime() {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    var time = 'The current time is ' + hour + ':' + min + '.';
    $('#time').css('visibility', 'visible');
    $('#time').html(time);
    $('#time').dialog({
        title: 'Current Time',
        width: 300,
        height: 100,
        position: { my: "right top", at: "right top", of: ".hero", collision: "none" }
    })
}

function changeBackground() {
    if (darkModeOn) {
        $('.hero').css('background-image', 'url(\"../Nature.jpg\")');
        $('#searchEngineName').css('color', 'black');
        darkModeOn = 0; 
    } else {
        $('.hero').css('background-image', 'url(\"../Night_Sky.jpg\")');
        $('#searchEngineName').css('color', 'white');
        darkModeOn = 1; 
    }
}

$('#searchButton').click(function () {
    apiSearch(); 
}); 

$('#timeButton').click(function () {
    getCurrentTime(); 
});

$('#searchEngineName').click(function () {
    changeBackground(); 
})

$('#luckyButton').click(function () {
    var params1 = {
        'q': $('#query').val(),
        'count': 1,
        'offset': 0,
        'mkt': 'en-us'
    };
    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params1),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '309290b7c24f43e4af89c2f0be560e6a'
        }
    })
        .done(function (data) {
            window.open(data.webPages.value[0].url, '_blank'); 
        })
        .fail(function () {
            alert('error');
        });
})

