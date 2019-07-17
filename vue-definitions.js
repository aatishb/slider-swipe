Vue.component('slider',{
  props: ['min', 'max', 'step', 'mouseIsPressed', 'value'],

  template: `
  <div>
    <input type="range" :min="min" :max="max" :step="step" :value="value" @mousedown.prevent @mouseleave="mouseLeft" @mouseenter="mouseEntered" @mousemove="sliderMoved" @click="sliderClicked" @change="sliderChanged"></input>
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

    sliderChanged: function(event) {
      let slider = event.target;
      this.$emit('input', slider.value)
    },

    updateSlider: function(event) {
      let slider = event.target;
      let offset = event.target.getBoundingClientRect().left;

      let x = event.clientX - offset;
      let pos = Math.round(x / slider.step) * slider.step / (slider.clientWidth - 1);

      let value = slider.min + (slider.max - slider.min) * pos;

      if (value < slider.min) {
        value = slider.min;
      } else if (value > slider.max) {
        value = slider.max;
      }

      slider.value = value;
      this.$emit('input', slider.value)
    }
  },

  data: function() {
    return {
      mouseOverElement: false
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