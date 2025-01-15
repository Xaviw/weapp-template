import { generateRandomCoordinates } from './data';

Page({
  data: {
    latitude: 30.539281,
    longitude: 104.062441,
    markers: [],
  },
  mapCtx: null,
  onReady() {
    const mapCtx = wx.createMapContext('map');
    mapCtx.initMarkerCluster({
      enableDefaultStyle: false,
      zoomOnClick: false,
      success() {
        console.log('initMarkerCluster success');
      },
      fail(err) {
        console.log('initMarkerCluster fail: ', err);
      },
    });
    const markers = generateRandomCoordinates();
    this.setData({ markers: [...markers] });
    mapCtx.on('markerClusterCreate', (e) => {
      console.log('markerClusterCreate: ', e);
      const clusterMarkers = e.clusters.map((item, i) => ({
        clusterId: item.clusterId,
        id: item.clusterId,
        ...item.center,
        width: 20,
        height: 30,
        label: {
          content: `clusterLabel-${i}-${item.markerIds.length}`,
          display: 'ALWAYS',
          bgColor: '#FFFFE0',
          padding: 8,
        },
        callout: {
          content: `clusterCallout-${i}-${item.markerIds.length}`,
          display: 'ALWAYS',
          bgColor: '#E6E6FA',
          padding: 8,
        },
        customCallout: {
          display: 'ALWAYS',
        },
      }));
      this.setData({ markers: [...this.data.markers, ...clusterMarkers] });
      // mapCtx.addMarkers({
      //   markers: clusterMarkers,
      // });
    });
    mapCtx.on('markerClusterClick', (e) => {
      console.log('markerClusterClick: ', e);
    });
    // mapCtx.addMarkers({
    //   markers,
    //   clear: true,
    //   success() {
    //     console.log('addMarkers success');
    //   },
    //   fail(err) {
    //     console.log('addMarkers fail: ', err);
    //   },
    // });

    this.mapCtx = mapCtx;
  },
  onMarkerTap(e) {
    console.log('onMarkerTap: ', e);
  },
  onCalloutTap(e) {
    console.log('onCalloutTap: ', e);
  },
  onLabelTap(e) {
    console.log('onLabelTap: ', e);
  },
});
