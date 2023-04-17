<template>
  <!-- <baidu-map class="map" :center="{lng: 105.000, lat: 38.000}" :zoom="4">
    <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" ></bm-point-collection>
  </baidu-map> -->
  <!-- <div v-for="(point, index) in markerPoints" :key="index">
    <baidu-map
      class="map"
      :center="{ lng: point.lng, lat: point.lat }"
      :zoom="15"
    >
      <bm-marker
        :position="point"
        :dragging="true"
        @click="infoWindowOpen(index)"
      >
        <bm-info-window
          :show="showIndex === index"
          @close="infoWindowClose(index)"
          @open="infoWindowOpen(index)"
          >我爱北京天安门</bm-info-window
        >
      </bm-marker>
    </baidu-map>
  </div> -->
  <baidu-map
    @ready="handler"
    class="map"
    :center="{ lng: 116.404, lat: 39.915 }"
    :zoom="6"
    :scroll-wheel-zoom="true"
  >
    <bm-marker
      v-for="(item, index) in markerPoints"
      :key="index"
      :position="item"
      :dragging="false"
      :title="item.name"
      @click="infoWindowOpen(index)"
    >
      <!-- <bm-info-window
        :show="show"
        @close="infoWindowClose(index)"
        @open="infoWindowOpen(index)"
        >{{ item.name }}</bm-info-window
      > -->
    </bm-marker>
  </baidu-map>
</template>
<script src="./custom_map_config.js"></script>
<script>
export default {
  data() {
    return {
      show: false,
      markerPoints: [
        { name: "张三", lng: 116.404, lat: 39.915 },
        { name: "李四", lng: 117.397, lat: 39.908 },
        { name: "王五", lng: 118.418, lat: 39.909 },
      ],
      showIndex: null,
    };
  },
  mounted() {
  },
  methods: {
    //     map.setMapStyleV2({
    //   styleId: '32fc61eed12ab430f9d16b745bf54f5e'
    // });
    handler({ BMap, map }) {
      let mapStyle = { style: "midnight" };
      map.setMapStyle(mapStyle);
      console.log(BMap, map);
      // map.setMapStyleV2({
      //   styleId: "32fc61eed12ab430f9d16b745bf54f5e",
      // });
      // console.log(BMap, map);
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    },
  },
};
</script>

<style lang="less">
/*// 去除百度地图的图标 根据实际情况看是否要加样式穿透(::v-deep)*/
// .anchorBL{
//   display: none;
// }
.map {
  width: 100%;
  height: 400px;
}
</style>
