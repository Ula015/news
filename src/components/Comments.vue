<template>
  <div class="comments">
    <div :class="comments_wrapper_classes">
      <single-comment
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id"
      ></single-comment>
    </div>
    <hr />
    <div class="reply">
      <div class="avatar">
        <img :src="current_user.avatar" alt="" />
      </div>
      <input
        type="text"
        v-model.trim="reply"
        class="reply--text"
        placeholder="Type comment..."
        maxlength="250"
        required
        @keyup.enter="submitComment"
      />
      <v-btn
        class="reply--button"
        color="primary"
        fab
        small
        dark
        @click.prevent="submitComment"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import singleComment from "./SingleComment";
export default {
  name: "comments",
  components: {
    singleComment,
  },
  data() {
    return {
      reply: "",
    };
  },
  methods: {
    submitComment() {
      if (this.reply != "") {
        this.$emit("submit-comment", this.reply);
        this.reply = "";
      }
    },
  },
  props: ["comments", "current_user", "comments_wrapper_classes"],
};
</script>

<style scoped>
.comments {
  margin-top: 20px;
  padding: 20px;
  padding-top: 0;
}

.comments-wrapper {
  max-height: 250px;
  overflow-y: auto;
  padding-right: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}

.reply {
  display: flex;
  position: relative;
  border-radius: 30px;
  padding: 5px 10px;
  overflow: hidden;
}

.reply .avatar {
  position: absolute;
}

.reply .avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.reply .reply--text {
  min-height: 40px;
  padding: 10px 10px 10px 55px;
  margin-right: 10px;
  border: 0;
  color: #333;
  width: 100%;
  outline: 0;
  background-color: transparent;
  box-shadow: none;
}

.reply input.reply--text:valid {
  margin-right: 71px;
}

.reply input.reply--text:valid + .reply--button {
  right: 10px;
}

.reply .reply--button {
  position: absolute;
  right: -100px;
  background-color: transparent;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  padding: 0.375rem 0.75rem;
  border-radius: 30px;
  transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out,
    border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out,
    right 0.25s ease-in-out;
  outline: 0;
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
