<template>
  <div class="text-center">
    <v-dialog v-model="dialog" overlay persistent width="300">
      <v-card color="primary" dark>
        <v-progress-linear indeterminate color="white"></v-progress-linear>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  props: {
    loadConfig: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    loadConfig() {
      this.dialog = this.$props.loadConfig;
    },
  },
};
</script>

<style></style>
