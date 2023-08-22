<template>
  <table>
    <tr>
      <div :class="'submit'">
        <input :value="input" placeholder="input your input" @input="(e:any)=>input= e.target.value" />
        <button @click="list.push(input)">submit</button>
      </div>
    </tr>
    <tr>
      <div v-for="(object, index) in list">
        <div v-if="editPosition === index">
          <input :value="editText" v-bind:placeholder="list[index]" @input="(e:any)=>editText= e.target.value" />
          <button @click="edit(index)">save</button>
        </div>
        <div v-else>
          <th>
            {{ object }}
            <button @click="del(index)">del.</button>
            <button @click="editPosition = index">edit</button>
          </th>
        </div>
      </div>
    </tr>
  </table>
</template>
<!-- --------------------------------------------------------- -->
<script setup lang="ts">
import { ref } from 'vue';

function edit(index: number) {
  if (editText.value !== '') {
    editPosition.value = null;
    list.value[index] = editText.value;
    editText.value = '';
  }
}
function del(index: number) {
  list.value.splice(index, 1);
  editPosition.value = null;
}

const input = ref('');

const editText = ref('');

const editPosition = ref<null | number>();

const list = ref<string[]>([]);
</script>

<!-- --------------------------------------------------------- -->
<style scoped>
.submit {
  color: white;
}
</style>
