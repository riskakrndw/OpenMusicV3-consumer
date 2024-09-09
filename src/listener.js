class Listener {
  constructor(songService, mailSender) {
    this._songService = songService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    console.log("Pesan diterima:", message.content.toString());

    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const playlist = await this._songService.getPlaylistById(playlistId);
      const songs = await this._songService.getSongByPlaylist(playlistId);

      let playlistName = "";
      if (playlist == undefined) {
        playlistName = undefined;
      } else {
        playlistName = playlist.name;
      }

      const data = {
        playlist: {
          id: playlistId,
          name: playlistName,
          songs: songs,
        },
      };

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(data)
      );
      console.log(result);
    } catch (error) {
      console.error("Error in listen:", error);
    }
  }
}

module.exports = Listener;
