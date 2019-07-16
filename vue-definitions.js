Vue.component('slider',{
  props: ['min', 'max', 'step', 'mouseIsPressed', 'value'],

  template: `
  <div>
    <input type="range" :min="min" :max="max" :step="step" :value="value" @mousedown.prevent @mouseleave="mouseLeft" @mouseenter="mouseEntered" @mousemove="sliderMoved" @click="sliderClicked"></input>
  </div>
  `,

  methods: {
    mouseEntered: function(event) {
      this.mouseOverElement = true;
    },

    mouseLeft: function(event) {
      this.mouseOverElement = false;
    },

    sliderMoved: function(event) {
      if (this.mouseIsPressed && this.mouseOverElement) {
        this.updateSlider(event);
      }
    },

    sliderClicked: function(event) {
      this.updateSlider(event);
    },

    updateSlider: function(event) {
      let slider = event.target;
      let bounds = event.target.getBoundingClientRect();
      let x = event.clientX - bounds.left;
      let width = bounds.right - bounds.left - 1;
      slider.value = slider.min + (slider.max - slider.min) * x / width;
      this.$emit('input', slider.value)
    }
  },

  data: function() {
    return {
      mouseOverElement: false,
      sliderVal: 0
    }
  }
});

let app = new Vue({

  el: '#root',

  methods: {
    mousePressed: function(event) {
      this.mouseIsPressed = true;
    },

    mouseReleased: function(event) {
      this.mouseIsPressed = false;
    }

  },

  // this is just for changing background color
  watch: {
    color: function() {
      let newColor = 'rgb('+ 255 * this.color[0] + ','
                           + 255 * this.color[1] + ','
                           + 255 * this.color[2] +')';
      this.$el.style["background-color"] = newColor;
    }
  },


  data: {
    mouseIsPressed: false,
    color: [0,0,0] // for background color
  }

});