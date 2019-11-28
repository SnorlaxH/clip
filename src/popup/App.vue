<template>
  <div>
    <clip-header></clip-header>
    <clip-list></clip-list>
  </div>
</template>

<script>
import ClipHeader from './components/Header'
import ClipList from './components/List'

export default {
  data() {
    return {};
  },
  components: {
    'clip-header': ClipHeader,
    'clip-list': ClipList,
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
