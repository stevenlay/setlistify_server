module.exports = setlist => {
    return (
        `
        <html>
            <body>
                <div style="text-align: center">
                <h3>Artist: ${setlist.artist} </h3>
                ${setlist.songs.map(song => {
                    return `<li>${song}</li>`
                }).join('')}
            </body>
        </html>
        `
    );
};
