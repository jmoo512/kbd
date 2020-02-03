var chart = c3.generate({
        data: {
            url: 'http://127.0.0.1:5000/sales',
            mimeType: 'json'
        }
    });
