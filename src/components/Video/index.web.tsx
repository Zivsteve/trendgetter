import React, { Component, createElement } from 'react';
import { VideoProperties } from 'react-native-video';

type SourceUri = {
  uri?: string | undefined;
};

/**
 *
 */
class Video extends Component<VideoProperties> {
  private _ref: HTMLVideoElement | null = null;

  componentDidUpdate() {
    if (!this._ref) {
      return;
    }
    if (!this.props.paused) {
      this._ref.play();
    } else {
      this._ref.pause();
    }
  }

  render() {
    const props = this.props;
    const sourceUri = props.source as SourceUri;

    return createElement('video', {
      ref: (ref: HTMLVideoElement) => (this._ref = ref),
      src: sourceUri?.uri || props.source,
      onLoadStart: (e) => call(props.onLoadStart),
      onLoadedData: (e) => call(props.onLoad, e.nativeEvent),
      onError: (e) => call(props.onError, e.nativeEvent),
      onProgress: (e) => call(props.onProgress, e.nativeEvent),
      onSeeking: (e) => call(props.onSeek, e.nativeEvent),
      onEnded: () => call(props.onEnd),
      onLoadedMetadata: () => call(props.onTimedMetadata),
      onCanPlay: () => call(props.onReadyForDisplay),
      onStalled: () => call(props.onPlaybackStalled),
      volume: props.volume,
      controls: props.controls,
      muted: props.muted,
      loop: props.repeat,
      playsInline: true,
      style: props.style,
      autoPlay: true,
      allowFullScreen: false,
    });
  }
}

/**
 *
 * @param func
 * @param e
 */
function call(func?: Function, e?: Event) {
  if (func) {
    func(e);
  }
}

export default Video;
