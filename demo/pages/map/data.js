export function generateRandomCoordinates() {
  const centerLat = 30.539281;
  const centerLon = 104.062441;
  const earthRadius = 6371.0; // 地球半径（千米）
  const numCoordinates = Math.floor(Math.random() * 51) + 50; // 生成50到100之间的随机数
  const coordinates = [];

  for (let i = 0; i < numCoordinates; i++) {
    const distance = Math.random() * 3; // 距离范围0到10公里
    const angle = Math.random() * 2 * Math.PI; // 角度范围0到2π

    const deltaLat = (distance / earthRadius) * (180 / Math.PI);
    const deltaLon = ((distance / earthRadius) * (180 / Math.PI)) / Math.cos((centerLat * Math.PI) / 180);

    const newLat = centerLat + deltaLat * Math.sin(angle);
    const newLon = centerLon + deltaLon * Math.cos(angle);

    coordinates.push({
      id: i,
      title: `title-${i}`,
      latitude: newLat,
      longitude: newLon,
      width: 20,
      height: 30,
      label: {
        content: `label-${i}`,
        display: 'ALWAYS',
        bgColor: '#ADD8E6',
        padding: 8,
      },
      callout: {
        content: `callout-${i}`,
        display: 'ALWAYS',
        bgColor: '#90EE90',
        padding: 8,
      },
      customCallout: {
        display: 'ALWAYS',
      },
      joinCluster: true,
    });
  }

  return coordinates;
}
