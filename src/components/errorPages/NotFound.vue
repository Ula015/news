<template>
  <div class="NotFound">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="card" height="400" color="transparent" flat>
            <div class="display-3 mt-5">404</div>
            <div class="display-3 mt-5">Page not found</div>
            <div class="grey--text lighten-5">
              The page you are trying to get does not exist
            </div>
            <div class="paragraph-text mt-0">
              <br />Try going back to home page and repeating your action. Or,
              contact helpdesk for support.
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.paragraph-text {
  font-size: 18px;
}
.NotFound {
  margin: 0 auto;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
