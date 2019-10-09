import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

class myMaps extends Component {
  state = {};
  render() {
    return (
      <MapView region={this.state.region} onRegionChange={this.onRegionChange}>
        {this.state.markers.map(marker => (
          <Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    );
  }
}

export default myMaps;
