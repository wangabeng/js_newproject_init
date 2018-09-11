/*
    * 百分比统计图 完成任务图
    * 用法：
    *     1 html中引入js css
    *     <script src="./vue-componets/svg-total/svg-total.js"></script>
    *     <link href="./vue-componets/svg-total/svg-total.css" rel="stylesheet">
    *     2 html：
    *        <svg-total v-bind:area='areaParam' 
              v-bind:degree='angle'
              ></svg-total>  
    *     3 js：
              data: {
                  areaParam: {
                    width: '2rem',
                    height: '2rem'  
                  },
                  angle: 120
              },

 */

Vue.component('svg-total', {
  props: {
    'degree': {
      type: Number,
      default: function () {
        return 0;
      }
    },
    'area': {
      type: Object,
      default: function () {
        return {
          width: '1.5rem',
          height: '1.5rem'          
        };
      }
    }
  },
  data () {
    return {
    };
  },
  template: `
    <svg v-bind:width='area.width' v-bind:height='area.height' viewBox='0,0,600,600' preserveAspectRatio="xMinYMin meet"  xmlns="http://www.w3.org/2000/svg">
        <circle cx="300" cy="300" r="280" stroke="gray" stroke-width="40"
fill="transparent"/>
            <!-- A 40 40 0 0 1 340 300 -->
            <!--   rx ry 是否旋转x 角度大于180 1 小于180 0，顺时针1 逆时针0 ，结束坐标值 -->
          <path v-bind:d="pathString" stroke="red" fill='none' stroke-width="40" />
          
    </svg>
  `,
  methods: {

  },
  computed: {
    largeArc: function () {
        return this.degree > 180? 1: 0;
    },
    xSize: function () {
        return 300 + 280 * Math.sin(2*3.1415/360*this.degree);
    },
    ySize: function () {
        return 300 - 280 * Math.cos(2*3.1415/360*this.degree);
    },
    pathString: function () {
        return "M 300 20 A 280 280 0 " + this.largeArc + " 1 " + this.xSize + " " + this.ySize;
    },
    percent: function () {
        return (this.degree / 360).toFixed(2);
    }
  },

});