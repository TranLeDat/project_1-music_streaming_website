import axiosClient from "./axiosClient";

const musicApi = {

    

    async getTopTracks({_limit = 10, _index = 0} = {}) {
        const res = await axiosClient.get('/chart/0/tracks', {
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
  };
  


export default musicApi;