const { Pool } = require("pg");

class SongService {
  constructor() {
    console.log("SongService 1");
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    console.log("ss 1");
    try {
      const query = {
        text: `
              SELECT 
                playlists.id,
                playlists.name,
                users.username
              FROM playlists 
              INNER JOIN users ON users.id = playlists.owner 
              WHERE playlists.id = $1
              LIMIT 1
            `,
        values: [playlistId],
      };
      console.log("ss 2");

      const result = await this._pool.query(query);

      return result.rows[0];
    } catch (error) {
      console.log("ss 4");
      console.error("Error fetching playlist songs:", error);
      throw new Error("Gagal mengambil playlist song dari database");
    }
  }

  async getSongByPlaylist(playlistId) {
    try {
      const query = {
        text: `
              SELECT 
                song.id,
                song.title,
                song.performer
              FROM playlist_songs 
              INNER JOIN song ON song.id = playlist_songs.song_id 
              WHERE playlist_songs.playlist_id = $1
            `,
        values: [playlistId],
      };

      const result = await this._pool.query(query);

      if (!result.rows.length) {
        return [];
      }

      return result.rows;
    } catch (error) {
      console.error("Error fetching playlist songs:", error);
      throw new Error("Gagal mengambil playlist song dari database");
    }
  }
}

module.exports = SongService;
