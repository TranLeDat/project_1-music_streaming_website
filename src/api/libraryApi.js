// /api/libraryApi.js
import axiosClient from './axiosClient';

const libraryApi = {
    async getLibrary() {
        try {
            const res = await axiosClient.get('/chart/0/playlists');
            return res.data;
        } catch (error) {
            console.log('Failed to fetch library', error);
        }
    },

    async getPlaylistById(id) {
        try {
            const res = await axiosClient.get(`/playlist/${id}`);
            return res;
        } catch (error) {
            console.log('Failed to fetch playlist', error);
        }
    }
};

export default libraryApi;
