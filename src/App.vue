<template>
  <table>
    <tr>
      <div :class="'submit'">
        <input :value="input" placeholder="input your input" @input="(e:any)=>input= e.target.value" />
        <button @click="save(input)">submit</button>
      </div>
    </tr>
    <tr>
      <div v-for="(item, index) in list">
        <div v-if="editPosition === index">
          <input :value="editText" v-bind:placeholder="list[index].name" @input="(e:any)=>editText= e.target.value" />
          <button @click="edit(index)">save</button>
        </div>
        <div v-else>
          <th>
            {{ item.name }}
            <!-- {{ object.id }} -->
            <button @click="del(item.id)">del.</button>
            <button @click="editPosition = index">edit</button>
          </th>
        </div>
      </div>
    </tr>
  </table>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getList, deleteListItem, updateListItem, addListItem } from './API';

const input = ref('');
const editText = ref('');
const editPosition = ref<null | number>();
const list = ref<{ name: string; amount: number; id: string }[]>([]);
onMounted(async () => {
  list.value = await getList();
});

async function save(input: any) {
  addListItem(input);
  list.value = await getList();
}

function edit(index: number) {
  if (editText.value !== '') {
    editPosition.value = null;
    list.value[index].name = editText.value;
    editText.value = '';
  }
}
function del(ID: string) {
  list.value = list.value.filter(item => item.id !== ID);
  deleteListItem(ID);
}
</script>

<style scoped></style>
