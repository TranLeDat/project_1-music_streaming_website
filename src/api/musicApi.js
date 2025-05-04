import axiosClient from "./axiosClient";

const musicApi = {

  async getTopTracks({_limit = 10, _index = 0, countryCode = '0'} = {}) {
    const res = await axiosClient.get(`/chart/${countryCode}/tracks`, {
      params:{
        limit: _limit,
        index: _index,
      },
    });
    return res.data;
  },
    
  
  async search(query) {
    const res = await axiosClient.get('/search', {
      params: { q: query },
    });
    return res.data;
  },
  
  getTrack(id) {
    return axiosClient.get(`/track/${id}`);
  },

  async getArtist(id){
    const res = await axiosClient.get(`/artist/${id}`);
    return res;
  },

  async getTopTracksByArtist(artistId) {
    const res = await axiosClient.get(`/artist/${artistId}/top`);
    return res?.data ;
  }
  
};
  


export default musicApi;