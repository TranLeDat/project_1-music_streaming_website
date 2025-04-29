import axiosClient from "./axiosClient";

const searchApi = {
    async getSearchByArtist({ query, _limit = 10 } = {}) {
        try {
            // Bước 1: Tìm nghệ sĩ
            const artistRes = await axiosClient.get('/search/artist', {
                params: {
                q: query,
                limit: 5, // (limit 5 để chắc chắn lấy danh sách)
                },
            });
        
            const artistList = artistRes?.data || [];
        
            if (artistList.length === 0) {
                console.log('Không tìm thấy nghệ sĩ');
                return [];
            }
        
            const firstArtist = artistList[0]; // ✅ Lấy nghệ sĩ đầu tiên
        
            console.log('Artist tìm thấy:', firstArtist);
        
            // Bước 2: Lấy bài hát top của nghệ sĩ đó
            const trackRes = await axiosClient.get(`/artist/${firstArtist.id}/top`, {
                params: {
                limit: _limit,
                },
            });
        
            const trackList = trackRes?.data || [];
        
            return trackList;
        } catch (error) {
            console.error('Lỗi tìm kiếm nghệ sĩ:', error);
            return [];
        }
    },
      
      
      

    async getSearchBySong({ query } = {}) {
        const res = await axiosClient.get("/search/track", {
        params: {
            q: query,
            limit: 1,
        },
        });
        return res.data; // Trả về mảng bài hát
    },
    
    };

export default searchApi;
