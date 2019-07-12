Vue.component('slider',{
  props: ['min', 'max', 'step', 'mouseIsPressed'],

  template: `
  <div>
    <input type="range" :min="min" :max="max" :step="step" @mousedown.prevent @mouseleave="mouseLeft" @mouseenter="mouseEntered" @mousemove="sliderMoved" @click="sliderClicked"></input>
  </div>
  `,

  methods: {
    mouseEntered: function(event) {
      //console.log('mouse entered');
      this.mouseOverElement = true;
    },

    mouseLeft: function(event) {
      //console.log('mouse left');
      this.mouseOverElement = false;
    },

    sliderMoved: function(event) {
      //console.log(this.mouseIsPressed);
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
      //let value = slider.min + (slider.max - slider.min) * (event.pageX - 20)/128;
      //value = Math.round(value*100)/100;
      //slider.value = value;
      slider.value = slider.min + (slider.max - slider.min) * x / width;
      //console.log(x, width, slider.value);

      //console.log(slider.min, slider.max, event.pageX);
      //console.log(value, slider.value);
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
      //console.log('mouse pressed');
      this.mouseIsPressed = true;
    },

    mouseReleased: function(event) {
      //console.log('mouse released');
      this.mouseIsPressed = false;
    }

  },

  data: {
    mouseIsPressed: false
  }

});