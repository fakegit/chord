'use strict';

import { ORIGIN } from 'chord/music/common/origin';

import { IShowRecommendViewAct } from 'chord/workbench/api/common/action/home/recommend';

import { musicApi } from 'chord/music/core/api';


export async function handleShowRecommendView(): Promise<IShowRecommendViewAct> {
    let lists = await Promise.all([
        musicApi.recommendSongs(ORIGIN.xiami),
        musicApi.recommendSongs(ORIGIN.netease),
        musicApi.recommendSongs(ORIGIN.qq),

        musicApi.recommendCollections(ORIGIN.xiami),
        musicApi.recommendCollections(ORIGIN.netease),
        musicApi.recommendCollections(ORIGIN.qq),
    ]);

    let songsList = lists.slice(0, 3);
    let collectionsList = lists.slice(3);

    let songs = [];
    let n = Math.max(...songsList.map(list => list.length));
    for (let i = 0; i < n; i++) {
        for (let j of [...Array(3).keys()]) {
            let list = songsList[j];
            let song = list[i];
            if (song) {
                songs.push(song);
            }
        }
    }

    let collections = [];
    n = Math.max(...collectionsList.map(list => list.length));
    for (let i = 0; i < n; i++) {
        for (let j of [...Array(3).keys()]) {
            let list = collectionsList[j];
            let collection = list[i];
            if (collection) {
                collections.push(collection);
            }
        }
    }

    return {
        'type': 'c:mainView:home:showRecommendView',
        'act': 'c:mainView:home:showRecommendView',
        songs,
        collections,
    };
}
