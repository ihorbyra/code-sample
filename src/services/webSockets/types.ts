import {
  DTOLiveStream, DTOVod, DTOPosts,
} from '@api/feed/types';

export enum EWebSocketTargets {
  HandleRightNowEvent = 'HandleRightNowEvent',
  HandleLatestVideosEvent = 'HandleLatestVideosEvent',
  HandleLatestPostsEvent = 'HandleLatestPostsEvent',
}

export enum EWebSocketEventTypes {
  // live streams
  liveStreamStarted = 'com.antourage.feed.right-now.live-stream-started-event',
  liveStreamUpdated = 'com.antourage.feed.right-now.live-stream-viewer-count-updated-event',
  liveStreamFinished = 'com.antourage.feed.right-now.live-stream-finished-event',

  // published videos (after live stream)
  vodCreated = 'com.antourage.feed.latest-videos.vod-created-event',
  vodHidden = 'com.antourage.feed.latest-videos.vod-hidden-event',
  vodUpdated = 'com.antourage.feed.latest-videos.vod-updated-event',

  // uploaded videos
  videoUpdated = 'com.antourage.feed.latest-videos.video-updated-event',
  videoHidden = 'com.antourage.feed.latest-videos.video-hidden-event',

  // posts
  postCreated = 'com.antourage.feed.latest-posts.post-created-event',
  postPublished = 'com.antourage.feed.latest-posts.post-published-event',
  postHidden = 'com.antourage.feed.latest-posts.post-hidden-event',
}

export interface DTOWebSocketsLiveStream {
  data: DTOLiveStream;
  type: EWebSocketEventTypes;
}

export interface DTOWebSocketsVOD {
  data: DTOVod;
  type: EWebSocketEventTypes;
}

export interface DTOWebSocketsPosts {
  data: DTOPosts;
  type: EWebSocketEventTypes;
}
