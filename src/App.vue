<template>
  <table>
    <tr>
      <div :class="'submit'">
        <input v-model="input" placeholder="input your input" @input="(e:any)=>input= e.target.value" required />
        <button @click="save(input)">submit</button>
      </div>
    </tr>
    <tr>
      <div v-for="(item, index) in list">
        <div v-if="editPosition === index">
          <input v-model="editText" :placeholder="list[index].name" @input="(e:any)=>editText= e.target.value" />
          <button @click="edit(item.id, editText)">save</button>
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
import * as API from './API';

const input = ref('');
const editText = ref('');
const editPosition = ref<null | number>();
const list = ref<{ name: string; amount: number; id: string }[]>([]);
onMounted(async () => {
  list.value = await API.getList();
});

async function save(input: any) {
  startOfInput();
  API.addListItem(input);
  endOfInput();
}

async function edit(itemID: string, data: string) {
  startOfInput();
  del(itemID);
  save(data);
  editPosition.value = null;
  endOfInput();
}
function del(itemID: string) {
  API.deleteListItem(itemID);
  // endOfInput();
}

async function startOfInput() {
  list.value = await API.getList();
}
async function endOfInput() {
  try {
    list.value.push(API.getList());
  } catch {
    console.log('Failed to push Database List into Local List');
  }
}
</script>

<style scoped></style>
