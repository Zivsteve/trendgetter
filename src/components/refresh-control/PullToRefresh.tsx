import React, { Component, ReactNode } from 'react';
import {
  Animated,
  ViewProps,
  PanResponderGestureState,
  PanResponder,
  GestureResponderEvent,
  findNodeHandle,
  RefreshControlProps,
} from 'react-native';
import { ActivityIndicator, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props extends RefreshControlProps {}

class RefreshControl extends Component<Props> {
  state = {
    progress: 0,
    pullPosReachedAnimated: new Animated.Value(0),
  };
  private _reset = true;
  private _pullDownSwipeMargin = new Animated.Value(0);
  private _pullPosReachedState: number = 0;
  private _ref: Component = this;
  private _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const el = findNodeHandle(this._ref) as any;
      return !this.props.refreshing && el.childNodes[1].scrollTop === 0;
    },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
    onPanResponderMove: (evt, gestureState) => {
      const adjustedDy = gestureState.dy <= 0 ? 0 : (gestureState.dy * 150) / (gestureState.dy + 120); // Diminishing returns function
      this._pullDownSwipeMargin.setValue(adjustedDy);
      const newValue = adjustedDy > 45 ? 1 : 0;
      if (newValue !== this._pullPosReachedState) {
        this._pullPosReachedState = newValue;
        Animated.timing(this.state.pullPosReachedAnimated, {
          toValue: newValue,
          duration: 150,
        }).start();
      }
      this.setState({ progress: Math.min(adjustedDy, 80) });
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => this._onPanResponderFinish(evt, gestureState),
    onPanResponderTerminate: (evt, gestureState) => this._onPanResponderFinish(evt, gestureState),
  });

  private _resetPullVariables() {
    Animated.timing(this._pullDownSwipeMargin, {
      toValue: 0,
      duration: 300,
    }).start();
  }

  private _onPanResponderFinish(evt: GestureResponderEvent, gestureState: PanResponderGestureState) {
    if (this._pullPosReachedState && this.props.onRefresh) {
      this.props.onRefresh();
    }
    this._resetPullVariables();
  }

  render() {
    const { colors, refreshing, style, children } = this.props;

    if (refreshing) {
      Animated.timing(this._pullDownSwipeMargin, {
        toValue: 60,
        duration: 350,
      }).start(() => (this._reset = true));
    }
    if (!refreshing && this._reset) {
      this._resetPullVariables();
      this._reset = false;
    }

    const refreshIndicatorColor = colors && colors.length ? colors[0] : 'blue';
    const indicatorTransformStyle = {
      marginTop: -45,
      transform: [{ translateY: this._pullDownSwipeMargin }],
    };
    const p = this.state.progress / 100;

    return (
      <Animated.View
        ref={(ref: Component) => (this._ref = ref)}
        style={[style, { overflowY: 'hidden', overflow: 'hidden' }]}
        {...this._panResponder.panHandlers}>
        <Animated.View style={[indicatorTransformStyle, { marginHorizontal: 'auto', zIndex: 10 }]}>
          <Surface
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              elevation: 3,
            }}>
            {refreshing ? (
              <ActivityIndicator
                style={{ margin: 'auto', transform: [{ scale: 1.4 }] }}
                color={refreshIndicatorColor}
                size={15}
              />
            ) : (
              <Icon
                color={refreshIndicatorColor}
                style={{
                  margin: 'auto',
                  opacity: p * 1.4,
                  transform: [{ rotate: `${this.state.progress * 2}deg` }],
                }}
                name='refresh'
                size={30}
              />
            )}
          </Surface>
        </Animated.View>
        {children}
      </Animated.View>
    );
  }
}

export default RefreshControl;
