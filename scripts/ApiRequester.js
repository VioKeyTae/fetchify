class ApiRequester {

    constructor(apiUrl, apiToken) {
        this.apiUrl = apiUrl;
        this.apiToken = apiToken;
    }

    getArtist(artist, cb) {
        this.sendRequest("/v1/search", {
            q: artist,
            type: "artist"
        }, cb);
    }

    getTopTracks(artistId, cb) {
        this.sendRequest("/v1/artists/" + artistId + "/top-tracks", {
            country: "AT"
        }, function (data) {
            cb(data.tracks); //cb(data.tracks[0]);
        });
    }

    getSongData(ids, cb) {
        this.sendRequest("/v1/audio-features/", {
            ids: ids
        }, function (data) {
            cb(data.audio_features);
        });
    }

    sendRequest(link, data, cb) {
        $.ajax({
            type: "GET",
            url: this.apiUrl + link,
            data: data,
            beforeSend: (request) => {
                request.setRequestHeader("Authorization", "Bearer " + this.apiToken);
            },
            success: function (data) {
                cb(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

}
