<template>
  <div>
    <!-- <Home />
    <Category />
    <Buycart />
    <My />-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Tabble />
  </div>
</template>

<script>
import Tabble from "../components/Tabble";
export default {
  components: {
    Tabble
  }
};
</script>