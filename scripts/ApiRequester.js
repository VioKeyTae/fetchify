class ApiRequester {

    constructor(apiUrl, apiToken) {
        this.apiUrl = apiUrl;
        this.apiToken = apiToken;
    }

    getArtist(artist) {
        $.ajax({
            type: "GET",
            url: this.apiUrl + "/v1/search",
            data: {
                q: artist,
                type: "artist"
            },
            beforeSend: (request) => {
                request.setRequestHeader("Authorization", "Bearer " + this.apiToken);
            },
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

}