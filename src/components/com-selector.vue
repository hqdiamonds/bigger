<template>
    <div class="com-selector">
        <div>组件区</div>
         <!-- <div>
        <draggable class="list-group" :list="list1" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
      </div>
      
      <div style="margin-top:200px">
            <draggable class="list-group" :list="list2" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list2"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
       </div> -->
    </div>   
</template>

<script>

import draggable from 'vuedraggable'

export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    }
  },
  methods: {
    add() {
      this.list.push({ name: "Juan" });
    },
    replace() {
      this.list = [{ name: "Edgard" }];
    },
    clone(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log(evt) {
      window.console.log(evt);
    }
  }
}
</script>
