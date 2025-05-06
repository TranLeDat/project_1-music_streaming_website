import axiosClient from "./axiosClient";

const searchApi = {
    async getSearchByArtist({ query, _limit = 10, _page = 1 } = {}) {
        try {
            const artistRes = await axiosClient.get('/search/artist', {
                params: {
                q: query,
                limit: 5,
                },
            });
        
            const artistList = artistRes?.data || [];
        
            if (artistList.length === 0) {
                console.log('Không tìm thấy nghệ sĩ');
                return [];
            }
            const firstArtist = artistList[0]; 
        
            console.log('Artist tìm thấy:', firstArtist);
            const index = (_page - 1) * _limit;
        
            const trackRes = await axiosClient.get(`/artist/${firstArtist.id}/top`, {
                params: {
                    limit: _limit,
                    index,
                },
            });
        
            const trackList = trackRes?.data || [];
        
            return trackList;
        } catch (error) {
            console.error('Lỗi tìm kiếm nghệ sĩ:', error);
            return [];
        }
    },
    async getTrackByName({query, _limit = 5} = {}){
        try {
            const tracksRes = await axiosClient.get(`/search/`,{
                params:{
                    q: query,
                    limit: _limit,
                }
            });
            const trackList = tracksRes?.data || [];
            return trackList;
        } catch (error) {
            console.log('Failed to fetch data', error);
        }
    }
      
}

export default searchApi;
