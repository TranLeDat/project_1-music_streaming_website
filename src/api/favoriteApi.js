import axiosClient from "./axiosClient";


const favoriteApi = {
    async getFavorite({_limit = 10, _page = 1} = {}){
        try {

            const index = (_page -1) * _limit;

            const favoriteRes = await axiosClient.get(`/chart/tracks`, {
                params:{
                    limit: _limit,
                    index,
                },

            });
            return favoriteRes;
        } catch (error) {
            console.log('Failed to fetch data', error);
        }
    },
    async getFavoriteList(){
        try {
            const res = await axiosClient.get(`/chart/tracks`);
            return res;
        } catch (error) {
            console.log('Failed to fetch data', error);
        }
    }
}

export default favoriteApi;
